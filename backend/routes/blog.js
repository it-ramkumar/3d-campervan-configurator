const express = require("express");
const router = express.Router();
const multer = require("multer");
const Blog = require("../models/blog");
const { blogs } = require("../services/s3");

const upload = multer({ storage: blogs });

// 🟢 CREATE BLOG (with gallery + blocks)
router.post(
  "/with-blocks",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      // ✅ Gallery images from S3
      const gallery = req.files["gallery"]?.map((f) => f.location) || [];

      // ✅ Blocks data (heading, paragraph)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge each block with its uploaded image
      const blocks = blocksData.map((block, index) => ({
        heading: block.heading,
        paragraph: block.paragraph,
        image: req.files["blockImages"]?.[index]?.location || null,
      }));

      // ✅ Create new blog document
      const newBlog = new Blog({
        title: req.body.title,
        des: req.body.des,
        gallery,
        blocks,
      });

      await newBlog.save();

      res.json({
        success: true,
        message: "Blog created successfully",
        data: newBlog,
      });
    } catch (err) {
      console.error("❌ Error creating blog:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);

// 🟡 UPDATE BLOG
router.put(
  "/with-blocks/:id",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ New gallery images (if uploaded)
      const newGallery = req.files["gallery"]?.map((f) => f.location) || [];

      // ✅ Parse updated blocks
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      const blocks = blocksData.map((block, index) => ({
        heading: block.heading,
        paragraph: block.paragraph,
        image: req.files["blockImages"]?.[index]?.location || block.image || null,
      }));

      // ✅ Update blog document
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          des: req.body.des,
          ...(newGallery.length ? { gallery: newGallery } : {}), // only update gallery if new files uploaded
          blocks,
        },
        { new: true }
      );

      if (!updatedBlog) {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }

      res.json({
        success: true,
        message: "Blog updated successfully",
        data: updatedBlog,
      });
    } catch (err) {
      console.error("❌ Error updating blog:", err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);

// 🟣 GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: blogs.length,
      data: blogs,
    });
  } catch (err) {
    console.error("❌ Error fetching blogs:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching blogs",
    });
  }
});

// 🔵 GET BLOG BY SLUG
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found with this slug",
      });
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (err) {
    console.error("❌ Error fetching blog by slug:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching blog",
    });
  }
});

// 🔴 DELETE BLOG
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.json({
      success: true,
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (err) {
    console.error("❌ Error deleting blog:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting blog",
    });
  }
});

module.exports = router;
