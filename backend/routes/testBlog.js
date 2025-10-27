const express = require("express");
const multer = require("multer");
const { uploadToS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Blog = require("../models/testBlog"); // your blog model
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// 🧠 Route: Create Blog
router.post(
  "/",
  upload.fields([{ name: "images", maxCount: 20 }]), // all block images
  async (req, res) => {
    try {
      const { title, content } = req.body;

      // Parse content blocks (sent as JSON string)
      const blocksData = JSON.parse(content || "[]");

      // ✅ Upload all images to S3
      const uploadedImages = await Promise.all(
        (req.files["images"] || []).map((file, index) =>
          uploadToS3(file.buffer, "blogs", file.originalname)
        )
      );

      // ✅ Map images back into their respective blocks
      const finalBlocks = blocksData.map((block, i) => {
        if (block.type === "image" && block.imageField) {
          const imageIndex = parseInt(block.imageField.split("_")[1]); // get 0,1,2...
          block.image = uploadedImages[imageIndex] || null;
        }
        return block;
      });

      // ✅ Save in MongoDB
      const newBlog = new Blog({
        title,
        content: finalBlocks,
      });

      await newBlog.save();

      res.json({
        success: true,
        message: "Blog uploaded successfully!",
        data: newBlog,
      });
    } catch (err) {
      console.error("Error creating blog:", err);
      res.status(500).json({ success: false, message: "Blog upload failed" });
    }
  }
);

/* ---------------------------------------
   🔵 GET ALL BLOGS
--------------------------------------- */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
});

/* ---------------------------------------
   🟣 GET SINGLE BLOG BY ID
--------------------------------------- */
router.get("/:id", async (req, res) => {
  // console.log(req.params.id)
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
});

/* ---------------------------------------
   🟠 UPDATE BLOG
--------------------------------------- */
router.put(
  "/:id",

  upload.fields([{ name: "images", maxCount: 20 }]),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

      const { title, content } = req.body;
      const blocksData = JSON.parse(content || "[]");

      // Upload new images if provided
      const uploadedImages = await Promise.all(
        (req.files["images"] || []).map(file =>
          uploadToS3(file.buffer, "blogs", file.originalname)
        )
      );

      // Merge new images into blocks
      const updatedBlocks = blocksData.map((block, i) => {
        if (block.type === "image" && block.imageField) {
          const index = parseInt(block.imageField.split("_")[1]);
          block.image = uploadedImages[index] || block.image; // keep existing if not replaced
        }
        return block;
      });

      blog.title = title;
      blog.content = updatedBlocks;

      await blog.save();

      res.json({ success: true, message: "Blog updated", data: blog });
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ success: false, message: "Failed to update blog" });
    }
  }
);

/* ---------------------------------------
   🔴 DELETE BLOG
--------------------------------------- */
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });

    // Delete blog images from S3 (optional but clean)
    await Promise.all(
      blog.content
        .filter(block => block.type === "image" && block.image)
        .map(block => deleteFromS3(block.image))
    );

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
});
module.exports = router;
