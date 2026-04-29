const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post('/', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 },
  { name: "glbFile", maxCount: 1 },    // Sirf ek model file
  // { name: "textures", maxCount: 20 }
]), async (req, res) => {
  try {
    // Parse JSON fields
    const van_listing = JSON.parse(req.body.van_listing || "{}");
    const detailed_features = JSON.parse(req.body.detailed_features || "[]");
    const media = JSON.parse(req.body.media || "[]");
    let delivery_date = req.body.delivery_date;

    try {
      if (delivery_date && (delivery_date.startsWith('"') || delivery_date.startsWith('{'))) {
        delivery_date = JSON.parse(delivery_date);
      }
    } catch (e) {
      console.log("Parsing failed, using raw string");
    }

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


    // 2. Upload Single GLB File
    let modelUrl = null;
    if (req.files["glbFile"]?.[0]) {
      const file = req.files["glbFile"][0];
      modelUrl = await uploadToS3(file.buffer, "van/models", file.originalname, file.mimetype);
    }

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
      glbFile: modelUrl,    // Single string URL
      // textures: textureUrls, // Array of string URLs
      gallery,
      detailed_features,
      delivery_date: delivery_date || null, // New field

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
      .sort({ order: 1 });

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
      .sort({ order: 1 })
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
      .sort({ order: 1 })
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

    // Explicitly check karein ke field select ho rahi hai
    const van = await Van.findOne({ slug });

    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    // Debugging ke liye yahan check karein
    // console.log("Full Van Object from DB:", van);
    // console.log("Delivery Date:", van.delivery_date);

    res.status(200).json({
      message: 'Van fetched successfully',
      van
    });
  } catch (error) {
    // ... error handling
  }
});

router.put("/reorder",protect, adminOnly, async (req, res) => {
  try {
    // console.log("Reorder request body:", req.body);
    const { newOrder } = req.body; // Array of objects: [{_id: "...", order: 1}, ...]

    const updatePromises = newOrder.map((item) =>
      Van.findByIdAndUpdate(item._id, { order: item.order })
    );

    await Promise.all(updatePromises);

    res.status(200).json({ success: true, message: "Order updated!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:slug', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 },
  { name: "glbFile", maxCount: 1 }
]), async (req, res) => {
  try {
    const { slug } = req.params;

    const van = await Van.findOne({ slug });
    if (!van) {
      return res.status(404).json({ message: 'Van not found' });
    }

    const parseJSONField = (field, fallback) => {
      try {
        return field ? JSON.parse(field) : fallback;
      } catch {
        return fallback;
      }
    };

    // Existing fields parsing
    const van_listing = parseJSONField(req.body.van_listing, van.van_listing);
    const detailed_features = parseJSONField(req.body.detailed_features, van.detailed_features);
    const delivery_date = req.body.delivery_date;
    const media = parseJSONField(req.body.media, van.media);
    const blocks = parseJSONField(req.body.blocks, van.blocks);
    const status = req.body.status !== undefined ? req.body.status : van.status;
    const galleryOrder = parseJSONField(req.body.galleryOrder, null);


    let newSlug = van.slug; // Default current slug
    if (van_listing.title && van_listing.title !== van.van_listing.title) {
      newSlug = await Van.generateSlug(van_listing.title);
    }

    // console.log(van.glbFile,"glb")
    // ✅ GLB File Handling with Deletion
    let modelUrl = van.glbFile;

    if (req.body.removeGlbFile === "true" && van.glbFile) {
      try {
        await deleteFromS3(van.glbFile);
        modelUrl = null;
      } catch (deleteError) {
        console.error('Error deleting GLB from S3:', deleteError);
      }
    }

    if (req.files["glbFile"]?.[0]) {
      const file = req.files["glbFile"][0];

      if (van.glbFile && req.body.removeGlbFile !== "true") {
        try {
          await deleteFromS3(van.glbFile);
        } catch (deleteError) {
          console.error('Error deleting old GLB:', deleteError);
        }
      }

      modelUrl = await uploadToS3(file.buffer, "van/models", file.originalname, file.mimetype);
    }

    // Handle gallery reordering and new uploads
    let updatedGallery = van.gallery || [];
    if (galleryOrder && Array.isArray(galleryOrder)) {
      const validUrls = galleryOrder.filter(url => updatedGallery.includes(url));
      updatedGallery = validUrls;
    }

    const newGallery = await Promise.all(
      (req.files["gallery"] || []).map(async file =>
        await uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );

    const insertAt = req.body.insertAt !== undefined ? parseInt(req.body.insertAt) : updatedGallery.length;
    updatedGallery.splice(insertAt, 0, ...newGallery);

    // ✅ AB VAN UPDATE KARO
    van.van_listing = {
      ...van.van_listing,
      ...van_listing,
      price: van_listing.price ? Number(van_listing.price) : van.van_listing.price,
      specifications: van_listing.specifications ? {
        ...van.van_listing.specifications,
        ...van_listing.specifications,
      } : van.van_listing.specifications
    };

    van.delivery_date = delivery_date;
    van.detailed_features = detailed_features;
    van.media = media;
    van.status = status;
    van.gallery = updatedGallery;
    van.blocks = blocks;
    van.glbFile = modelUrl;
    van.slug = newSlug; // ✅ SLUG ASSIGN KARO

    const updatedVan = await van.save();

    res.status(200).json({
      message: 'Van updated successfully',
      van: updatedVan
    });
  } catch (error) {
    console.error('Error updating van:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
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

    // 🔹 Step 2: Delete Gallery images from S3
    if (Array.isArray(van.gallery) && van.gallery.length > 0) {
      await Promise.all(van.gallery.map(url => deleteFromS3(url)));
      // console.log(`🧹 Deleted ${van.gallery.length} gallery images`);
    }

    // 🔹 Step 3: Delete GLB Model File from S3
    if (van.glbFile) {
      await deleteFromS3(van.glbFile);
      // console.log(`🧹 Deleted GLB model file`);
    }

    // 🔹 Step 4: Delete Texture images from S3
    // if (Array.isArray(van.textures) && van.textures.length > 0) {
    //   await Promise.all(van.textures.map(url => deleteFromS3(url)));
    //   console.log(`🧹 Deleted ${van.textures.length} textures`);
    // }

    // 🔹 Final Response
    res.status(200).json({
      message: '✅ Van, 3D Models, and all S3 assets deleted successfully',
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