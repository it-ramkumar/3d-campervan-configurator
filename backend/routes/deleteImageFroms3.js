const express = require("express");
const { deleteFromS3 } = require("../services/s3");
const Portfolio = require("../models/portfolio");
const Blog = require("../models/testBlog");
const Van = require("../models/vanModel");
const { protect, adminOnly } = require("../middleware/authMiddleware")


const router = express.Router();

// 🧾 Route: Delete image from S3 + remove from all galleries
router.post("/delete-image",protect, adminOnly, async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({
      success: false,
      message: "imageUrl is required",
    });
  }

  try {
    // Step 1️⃣ Delete from S3
    await deleteFromS3(imageUrl);

    // Step 2️⃣ Remove from all gallery arrays
    const galleryResults = await Promise.all([
      Portfolio.updateMany({}, { $pull: { gallery: imageUrl } }),
      Blog.updateMany({}, { $pull: { gallery: imageUrl } }),
      Van.updateMany({}, { $pull: { gallery: imageUrl } }),
    ]);

    // Step 3️⃣ Remove from blog blocks
    const blogs = await Blog.find({ "content.image": imageUrl });
    const blockUpdates = await Promise.all(
      blogs.map(async (blog) => {
        let contentUpdated = false;
        const newContent = (blog.content || []).map((block) => {
          if (block.type === "image" && block.image === imageUrl) {
            contentUpdated = true;
            return { ...block, image: null }; // ya remove block if you want
          }
          return block;
        });

        if (contentUpdated) {
          blog.content = newContent;
          await blog.save();
        }
        return blog._id;
      })
    );

    res.json({
      success: true,
      message: "✅ Image deleted from S3, removed from all galleries and blog blocks",
      galleryResults,
      blockUpdates,
    });
  } catch (error) {
    console.error("❌ Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
      error: error.message,
    });
  }
});

module.exports = router;
