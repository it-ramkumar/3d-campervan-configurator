const express = require("express");
const router = express.Router();
const multer = require("multer");
const Blog = require("../models/blog");
const { protect, adminOnly } = require("../middleware/authMiddleware")


const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3 } = require("../services/s3")

router.post(
  "/with-blocks", protect, adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      // Compress + upload gallery images
      const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "blogs/gallery", file.originalname)
        )
      );
      // ✅ Blocks data (heading, paragraph)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // Compress + upload block images
      const blocks = await Promise.all(
        blocksData.map(async (block, index) => ({
          heading: block.heading,
          paragraph: block.paragraph,
          image: req.files["blockImages"]?.[index]
            ? await uploadToS3(
              req.files["blockImages"][index].buffer,
              "blogs/blocks",
              req.files["blockImages"][index].originalname
            )
            : null,
        }))
      );
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
  "/with-blocks/:id", protect, adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ New gallery images (if uploaded)
      const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "blogs/gallery", file.originalname)
        )
      );
      // ✅ Parse updated blocks
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // Compress + upload block images
      const blocks = await Promise.all(
        blocksData.map(async (block, index) => ({
          heading: block.heading,
          paragraph: block.paragraph,
          image: req.files["blockImages"]?.[index]
            ? await uploadToS3(
              req.files["blockImages"][index].buffer,
              "blogs/blocks",
              req.files["blockImages"][index].originalname
            )
            : null,
        }))
      );

      // ✅ Update blog document
      const updatedBlog = await Blog.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          des: req.body.des,
          ...(gallery.length ? { gallery: gallery } : {}), // only update gallery if new files uploaded
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
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });

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
router.delete("/:id",protect, adminOnly, async (req, res) => {
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
