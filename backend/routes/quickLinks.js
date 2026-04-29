const express = require('express');
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const QuickLink = require('../models/quickLinks'); // MongoDB schema

// Create a new quick link
router.post('/',protect, adminOnly, upload.fields([
  { name: "icon", maxCount: 1 } // single optional image per link
]), async (req, res) => {
  try {
    // Parse JSON fields (if any)
    const linkData = JSON.parse(req.body.link || "{}");
    const { title, url, category, order, is_active } = linkData;

    if (!title || !url) {
      return res.status(400).json({ message: 'Title and URL are required' });
    }

    // Upload icon to S3 if provided
    let iconUrl = '';
    if (req.files["icon"] && req.files["icon"][0]) {
      iconUrl = await uploadToS3(
        req.files["icon"][0].buffer,
        "quick-links/icons",
        req.files["icon"][0].originalname
      );
    }

    // Create QuickLink document
    const newLink = await QuickLink.create({
      title,
      url,
      category: category || '',
      order: order || 0,
      is_active: is_active !== undefined ? is_active : true,
      icon: iconUrl
    });

    res.status(201).json({
      message: 'Quick link created successfully',
      link: newLink
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});
// GET all active quick links
router.get('/', async (req, res) => {
  try {
    // Fetch only active links and sort by 'order' field
    const links = await QuickLink.find({ is_active: true }).sort({ order: 1 });

    res.status(200).json({
      message: 'Quick links fetched successfully',
      links
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});

router.put(
  "/reorder",
  protect,
  adminOnly,
  async (req, res) => {
    try {
      const { links } = req.body;
      // expected format:
      // links: [{ _id: "...", order: 1 }, { _id: "...", order: 2 }]

      if (!Array.isArray(links)) {
        return res.status(400).json({ message: "Invalid payload" });
      }

      const bulkOps = links.map((item) => ({
        updateOne: {
          filter: { _id: item._id },
          update: { order: item.order },
        },
      }));

      await QuickLink.bulkWrite(bulkOps);

      res.status(200).json({
        message: "Quick links reordered successfully",
      });
    } catch (err) {
      console.error("SERVER ERROR:", err);
      res.status(500).json({
        message: "Server error",
        error: err.message,
      });
    }
  }
);
// Edit a quick link
router.put('/:id', protect, adminOnly, upload.fields([
  { name: "icon", maxCount: 1 }
]), async (req, res) => {
  try {
    const linkId = req.params.id;
    const linkData = JSON.parse(req.body.link || "{}");
    const { title, url, category, order, is_active } = linkData;

    // Find existing link
    const existingLink = await QuickLink.findById(linkId);
    if (!existingLink) {
      return res.status(404).json({ message: "Quick link not found" });
    }

    // Replace icon if new file uploaded
    if (req.files["icon"] && req.files["icon"][0]) {
      // Delete old icon from S3 if exists
      if (existingLink.icon) {
        await deleteFromS3(existingLink.icon);
      }

      // Upload new icon
      existingLink.icon = await uploadToS3(
        req.files["icon"][0].buffer,
        "quick-links/icons",
        req.files["icon"][0].originalname
      );
    }

    // Update fields
    if (title) existingLink.title = title;
    if (url) existingLink.url = url;
    if (category !== undefined) existingLink.category = category;
    if (order !== undefined) existingLink.order = order;
    if (is_active !== undefined) existingLink.is_active = is_active;

    await existingLink.save();

    res.status(200).json({
      message: "Quick link updated successfully",
      link: existingLink
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});


// Delete a quick link
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const linkId = req.params.id;

    // Find link
    const link = await QuickLink.findById(linkId);
    if (!link) {
      return res.status(404).json({ message: "Quick link not found" });
    }

    // Delete icon from S3 if exists
    if (link.icon) {
      await deleteFromS3(link.icon);
    }

    // Delete link from MongoDB
    await QuickLink.findByIdAndDelete(linkId);

    res.status(200).json({
      message: "Quick link deleted successfully"
    });

  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});
// 🔥 REORDER QUICK LINKS


module.exports = router;
