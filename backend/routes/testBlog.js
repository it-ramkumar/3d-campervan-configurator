const express = require("express");
const multer = require("multer");
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Blog = require("../models/testBlog"); // your blog model
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "gallery", maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      // console.log("FILES RECEIVED:", req.files);
      // console.log("BODY RECEIVED:", req.body);

      const { title, description, content } = req.body;
      const blocksData = JSON.parse(content || "[]");

      // 🔹 FIX: Create proper mapping from imageField to S3 URL
      const blockImages = req.files["images"] || [];
      const imageFieldToUrlMap = {};

      // Upload all block images and create mapping
      await Promise.all(
        blockImages.map(async (file, index) => {
          try {
            const imageFieldName = `image_${index}`;
            const s3Url = await uploadToS3(
              file.buffer,
              "blogs/blocks",
              `${Date.now()}_${file.originalname}`
            );
            imageFieldToUrlMap[imageFieldName] = s3Url;
            console.log(`✅ Mapped ${imageFieldName} to ${s3Url}`);
          } catch (error) {
            console.error(`Error uploading image ${index}:`, error);
            imageFieldToUrlMap[`image_${index}`] = null;
          }
        })
      );

      console.log("Image Mapping:", imageFieldToUrlMap);

      // 🔹 Upload gallery images to S3
      const uploadedGalleryUrls = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(
            file.buffer,
            "blogs/gallery",
            `${Date.now()}_${file.originalname}`
          )
        )
      );

      // 🔹 FIX: Map S3 URLs to blocks using the mapping
      const finalBlocks = blocksData.map(block => {
        if (block.type === "image" && block.imageField) {
          const imageUrl = imageFieldToUrlMap[block.imageField];
          console.log(`Mapping ${block.imageField} to:`, imageUrl);

          if (imageUrl) {
            block.image = imageUrl;
          }
          // Remove temporary field
          delete block.imageField;
        }
        return block;
      });

      console.log("Final Blocks:", finalBlocks);

      // 🔹 Save blog in MongoDB
      const newBlog = new Blog({
        title,
        description,
        gallery: uploadedGalleryUrls,
        content: finalBlocks
      });

      await newBlog.save();

      res.json({
        success: true,
        message: "✅ Blog uploaded successfully!",
        data: newBlog
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
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

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
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "gallery", maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog)
        return res.status(404).json({ success: false, message: "Blog not found" });

      const { title, content, description } = req.body;
      const blocksData = JSON.parse(content || "[]");

      // 🔹 Map imageField to S3 URL for updated/new block images
      const blockImages = req.files["images"] || [];
      const imageFieldToUrlMap = {};

      await Promise.all(
        blockImages.map(async (file, index) => {
          const imageFieldName = `image_${index}`;
          try {
            const s3Url = await uploadToS3(
              file.buffer,
              "blogs/blocks",
              `${Date.now()}_${file.originalname}`
            );
            imageFieldToUrlMap[imageFieldName] = s3Url;
          } catch (err) {
            console.error(`Error uploading block image ${index}:`, err);
            imageFieldToUrlMap[imageFieldName] = null;
          }
        })
      );

      // 🔹 Upload new gallery images to S3
      const uploadedGalleryUrls = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "blogs/gallery", `${Date.now()}_${file.originalname}`)
        )
      );

      // 🔹 Map S3 URLs to blocks
      const updatedBlocks = blocksData.map(block => {
        if (block.type === "image" && block.imageField) {
          block.image = imageFieldToUrlMap[block.imageField] || block.image || null;
          delete block.imageField;
        }
        return block;
      });

      // 🔹 Update blog fields
      blog.title = title;
      blog.description = description;
      blog.content = updatedBlocks;

      // 🔹 Merge galleries (append new to existing)
      if (uploadedGalleryUrls.length > 0) {
        blog.gallery = [...(blog.gallery || []), ...uploadedGalleryUrls];
      }

      await blog.save();

      res.json({
        success: true,
        message: "✅ Blog updated successfully!",
        data: blog,
      });
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
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    // ✅ Optional: delete all S3 images
    await Promise.all([
      ...blog.content
        .filter(b => b.type === "image" && b.image)
        .map(b => deleteFromS3(b.image)),
      ...(blog.gallery || []).map(g => deleteFromS3(g)),
    ]);

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "✅ Blog deleted successfully!" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
});

module.exports = router;
