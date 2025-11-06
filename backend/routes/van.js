const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");


router.post('/', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 }
  // ✅ Media file upload removed - sirf gallery ke liye
]), async (req, res) => {
  try {
    // Parse JSON fields
    const van_listing = JSON.parse(req.body.van_listing || "{}");
    const detailed_features = JSON.parse(req.body.detailed_features || "[]");
    const media = JSON.parse(req.body.media || "[]"); // ✅ Simple string array
    const sold = req.body.sold === "true";

    if (!van_listing || !van_listing.title) {
      return res.status(400).json({ message: 'Van listing with title is required' });
    }

    // Generate slug
    let slug = req.body.slug || await Van.generateSlug(van_listing.title);

    // Check if slug exists
    const existingVan = await Van.findOne({ slug });
    if (existingVan) {
      return res.status(409).json({ message: 'Van with this slug already exists' });
    }

    // Upload gallery images
    const gallery = await Promise.all(
      (req.files["gallery"] || []).map(async file =>
        await uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );

    // ✅ Media is simple string array - no file upload
    // Media contains only URLs like: ["https://youtube.com/watch?v=abc123"]

    // Final van data object
    const vanData = {
      slug,
      van_listing: {
        ...van_listing,
        price: van_listing.price ? Number(van_listing.price) : null,
        specifications: van_listing.specifications ? {
          ...van_listing.specifications,
          capacity: van_listing.specifications.capacity || {}
        } : undefined
      },
      sold,
      gallery,
      detailed_features,
      media // ✅ Direct assignment of URL strings
    };

    const newVan = await Van.create(vanData);

    res.status(201).json({
      message: 'Van created successfully',
      van: newVan
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});


router.get('/available', async (req, res) => {
  try {
    const vans = await Van.find({ sold: false })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: vans.length,
      vans
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});


router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 8 } = req.query; // frontend se aayega
    page = Number(page);
    limit = Number(limit);

    // total vans count
    const total = await Van.countDocuments();

    // vans with skip + limit
    const vans = await Van.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: "Vans fetched successfully",
      total,
      page,
      pages: Math.ceil(total / limit),
      vans,
    });
  } catch (error) {
    console.error("Error fetching vans:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const van = await Van.findOne({ slug });

    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    res.status(200).json({
      message: 'Van fetched successfully',
      van
    });
  } catch (error) {
    console.error('Error fetching van:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});


router.put('/:slug', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 }
  // ✅ Media file upload removed
]), async (req, res) => {
  try {
    const { slug } = req.params;

    const van = await Van.findOne({ slug });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    // Helper to parse JSON or fallback to existing
    const parseJSONField = (field, fallback) => {
      try {
        return field ? JSON.parse(field) : fallback;
      } catch {
        return fallback;
      }
    };

    // Parse JSON fields
    const van_listing = parseJSONField(req.body.van_listing, van.van_listing);
    const detailed_features = parseJSONField(
      req.body.detailed_features,
      van.detailed_features
    );
    const media = parseJSONField(req.body.media, van.media); // ✅ Simple URLs
    const sold = req.body.sold !== undefined ? req.body.sold === "true" : van.sold;

    // Handle gallery images (append to existing)
    const existingGallery = van.gallery || [];
    const newGallery = await Promise.all(
      (req.files["gallery"] || []).map(async file =>
        await uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );
    const updatedGallery = [...existingGallery, ...newGallery];

    // ✅ Media is simple string array - no file processing
    // Just use the URLs from req.body.media

    // Update van fields
    van.van_listing = {
      ...van.van_listing,
      ...van_listing,
      price: van_listing.price ? Number(van_listing.price) : van.van_listing.price,
      specifications: van_listing.specifications ? {
        ...van.van_listing.specifications,
        ...van_listing.specifications,
        capacity: van_listing.specifications.capacity ? {
          ...van.van_listing.specifications?.capacity,
          ...van_listing.specifications.capacity
        } : van.van_listing.specifications?.capacity
      } : van.van_listing.specifications
    };

    van.detailed_features = detailed_features;
    van.media = media; // ✅ Direct assignment of URL strings
    van.sold = sold;
    van.gallery = updatedGallery;

    // If title changed, generate new slug
    if (van_listing.title && van_listing.title !== van.van_listing.title) {
      van.slug = await Van.generateSlug(van_listing.title);
    }

    const updatedVan = await van.save();

    res.status(200).json({
      message: 'Van updated successfully',
      van: updatedVan
    });
  } catch (error) {
    console.error('Error updating van:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});


router.delete('/:slug', protect, adminOnly, async (req, res) => {
  try {
    const { slug } = req.params;

    const van = await Van.findOneAndDelete({ slug });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    res.status(200).json({
      message: 'Van deleted successfully',
      van
    });
  } catch (error) {
    console.error('Error deleting van:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;