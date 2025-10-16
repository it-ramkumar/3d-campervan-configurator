// routes/blog.js
const express = require("express");
const router = express.Router();
const AWS = require("aws-sdk");
const Blog = require("../models/blog");

const s3 = new AWS.S3({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

// DELETE image from gallery or block
router.delete("/:blogId/image", async (req, res) => {
  const { blogId } = req.params;
  const { type, index } = req.body; // type: 'gallery' | 'block'

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    let fileUrl;

    if (type === "gallery") {
      fileUrl = blog.gallery[index]; // gallery is string array
      if (!fileUrl) return res.status(404).json({ message: "Image not found" });
      blog.gallery.splice(index, 1);
    } else if (type === "block") {
      fileUrl = blog.blocks[index]?.image;
      if (!fileUrl) return res.status(404).json({ message: "Image not found" });
      blog.blocks[index].image = null;
    } else {
      return res.status(400).json({ message: "Invalid type" });
    }

    // Delete from S3
    const key = decodeURIComponent(fileUrl.split(".amazonaws.com/")[1]);
    await s3
      .deleteObject({
        Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
        Key: key,
      })
      .promise();

    await blog.save();
    res.json({ success: true, message: "Image deleted" });
  } catch (err) {
    console.error("Delete failed:", err);
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
});

module.exports = router;
