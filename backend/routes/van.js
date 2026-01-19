const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post('/', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 }
]), async (req, res) => {
  try {
    // Parse JSON fields
    const van_listing = JSON.parse(req.body.van_listing || "{}");
    const detailed_features = JSON.parse(req.body.detailed_features || "[]");
    const media = JSON.parse(req.body.media || "[]");

    // --- Naya Block Section Parse karne ke liye ---
    const blocks = JSON.parse(req.body.blocks || "[]");

    const status = req.body.status || "sold";

    if (!van_listing || !van_listing.title) {
      return res.status(400).json({ message: 'Van listing with title is required' });
    }

    // Validate status enum
    const validStatuses = ['available', 'sale_pending', 'sold', 'coming_soon'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be one of: available, sale_pending, sold, coming_soon'
      });
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
      status,
      gallery,
      detailed_features,

      // --- Blocks ko yahan add kiya gaya hai ---
      blocks,

      media
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
    const vans = await Van.find({ status: 'available' })
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: vans.length,
      vans
    });
  } catch (err) {
    res.status(500).json({
      message: 'Server error',
      error: err.message
    });
  }
});

router.get('/van-by-status', async (req, res) => {
  try {
    const {
      status,
      page = 1,
      limit = 9
    } = req.query;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'status is required'
      });
    }

    const skip = (page - 1) * limit;

    const vans = await Van.find({ status })
      .sort({ createdAt: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Van.countDocuments({ status });

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      hasMore: skip + vans.length < total,
      data: vans
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
});


router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 8, search = "" } = req.query; // ✅ search add kiya
    page = Number(page);
    limit = Number(limit);

    // ✅ Build filter condition
    const query = {};
    if (search) {
      query["van_listing.title"] = { $regex: search, $options: "i" }; // case-insensitive search
    }

    // ✅ Total vans count (filtered)
    const total = await Van.countDocuments(query);

    // ✅ Vans with pagination + search
    const vans = await Van.find(query)
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
    const media = parseJSONField(req.body.media, van.media);

    // --- Naya: Dynamic Blocks parse karne ke liye ---
    const blocks = parseJSONField(req.body.blocks, van.blocks);

    const status = req.body.status !== undefined ? req.body.status : van.status;

    // ✅ NEW: Parse gallery order (array of existing URLs in desired order)
    const galleryOrder = parseJSONField(req.body.galleryOrder, null);

    // Validate status if provided
    if (req.body.status) {
      const validStatuses = ['available', 'sale_pending', 'sold', 'coming_soon'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          message: 'Invalid status. Must be one of: available, sale_pending, sold, coming_soon'
        });
      }
    }

    // ✅ Handle gallery reordering and new uploads
    let updatedGallery = van.gallery || [];

    // If galleryOrder is provided, reorder existing images
    if (galleryOrder && Array.isArray(galleryOrder)) {
      const validUrls = galleryOrder.filter(url => updatedGallery.includes(url));
      updatedGallery = validUrls;
    }

    // Upload new gallery images
    const newGallery = await Promise.all(
      (req.files["gallery"] || []).map(async file =>
        await uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );

    // ✅ Parse insertAt index (where to insert new images)
    const insertAt = req.body.insertAt !== undefined
      ? parseInt(req.body.insertAt)
      : updatedGallery.length;

    // Insert new images at specified index
    updatedGallery.splice(insertAt, 0, ...newGallery);

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
    van.media = media;
    van.status = status;
    van.gallery = updatedGallery;

    // --- Naya: Blocks update logic ---
    van.blocks = blocks;

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

    // 🔹 Step 1: Find and delete van
    const van = await Van.findOneAndDelete({ slug });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    // 🔹 Step 2: Delete all gallery images from S3
    if (Array.isArray(van.gallery) && van.gallery.length > 0) {
      await Promise.all(van.gallery.map(url => deleteFromS3(url)));
      console.log(`🧹 Deleted ${van.gallery.length} gallery images from S3`);
    }

    // 🔹 Step 3: Response
    res.status(200).json({
      message: '✅ Van deleted successfully and all S3 images removed',
      van
    });

  } catch (error) {
    console.error('❌ Error deleting van:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});



module.exports = router;