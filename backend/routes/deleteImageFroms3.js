const express = require("express");
const { deleteFromS3 } = require("../services/s3");
const Portfolio = require("../models/portfolio");
const Blog = require("../models/testBlog");
const Van = require("../models/vanModel");

const router = express.Router();

// 🧾 Route: Delete image from S3 + remove from all galleries
router.post("/delete-image", async (req, res) => {
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
    const results = await Promise.all([
      Portfolio.updateMany({}, { $pull: { gallery: imageUrl } }),
      Blog.updateMany({}, { $pull: { gallery: imageUrl } }),
      Van.updateMany({}, { $pull: { gallery: imageUrl } }),
    ]);

    res.json({
      success: true,
      message: "✅ Image deleted from S3 and removed from all galleries",
      results,
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
