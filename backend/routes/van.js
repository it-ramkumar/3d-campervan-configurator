const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const parseJSONField = (field, fallback) => {
  try {
    return field ? JSON.parse(field) : fallback;
  } catch {
    return fallback;
  }
};

/* -------------------------------------------------------------------------- */
/* POST /  — Create Van                                                       */
/* -------------------------------------------------------------------------- */

router.post('/', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 },
  { name: "glbFile", maxCount: 1 },
]), async (req, res) => {
  try {
    const van_listing      = parseJSONField(req.body.van_listing, {});
    const detailed_features = parseJSONField(req.body.detailed_features, []);
    const media            = parseJSONField(req.body.media, []);
    const blocks           = parseJSONField(req.body.blocks, []);
    const textures         = parseJSONField(req.body.textures, []);

    let delivery_date = req.body.delivery_date;
    try {
      if (delivery_date && (delivery_date.startsWith('"') || delivery_date.startsWith('{'))) {
        delivery_date = JSON.parse(delivery_date);
      }
    } catch (e) {
      console.log("Parsing failed, using raw string");
    }

    const status       = req.body.status || "available";
    const is_published = req.body.is_published === "true" || req.body.is_published === true;

    if (!van_listing || !van_listing.title) {
      return res.status(400).json({ message: 'Van listing with title is required' });
    }

    const validStatuses = ['available', 'sale_pending', 'sold', 'coming_soon'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status. Must be one of: available, sale_pending, sold, coming_soon'
      });
    }

    let slug = req.body.slug || await Van.generateSlug(van_listing.title);

    const existingVan = await Van.findOne({ slug });
    if (existingVan) {
      return res.status(409).json({ message: 'Van with this slug already exists' });
    }

    // Gallery → [url_string]
    const gallery = await Promise.all(
      (req.files["gallery"] || []).map(async (file) =>
        uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );

    // GLB file
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
        specifications: van_listing.specifications
          ? { ...van_listing.specifications, capacity: van_listing.specifications.capacity || {} }
          : undefined
      },
      is_published,
      status,
      glbFile: modelUrl,
      gallery,
      detailed_features,
      delivery_date: delivery_date || null,
      blocks,
      media,
      textures
    };

    const newVan = await Van.create(vanData);

    res.status(201).json({ message: 'Van created successfully', van: newVan });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/* GET /available  — Lightweight list for configurator                        */
/* -------------------------------------------------------------------------- */

router.get('/available', async (req, res) => {
  try {
    const vans = await Van.find(
      { status: 'available', is_published: true },
      {
        _id: 1,
        slug: 1,
        'van_listing.title': 1,
        'van_listing.subtitle': 1,
        'van_listing.price': 1,
        gallery: { $slice: 1 },
        glbFile: 1,
      }
    ).sort({ order: 1 });

    const formatted = vans.map(v => ({
      id: v._id,
      slug: v.slug,
      title: v.van_listing?.title,
      subtitle: v.van_listing?.subtitle,
      price: v.van_listing?.price,
      image: v.gallery?.[0] || null,
      glb: v.glbFile || null
    }));

    res.status(200).json({ count: formatted.length, vans: formatted });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/* GET /van-by-status  — Paginated by status                                  */
/* -------------------------------------------------------------------------- */

router.get('/van-by-status', async (req, res) => {
  try {
    const { status, page = 1, limit = 9 } = req.query;

    if (!status) {
      return res.status(400).json({ success: false, message: 'status is required' });
    }

    const skip = (page - 1) * limit;
    const filter = { status, is_published: true };
    const [vans, total] = await Promise.all([
      Van.find(filter).sort({ order: 1 }).skip(Number(skip)).limit(Number(limit)),
      Van.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      hasMore: skip + vans.length < total,
      data: vans
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

/* -------------------------------------------------------------------------- */
/* GET /  — All vans (admin), search + pagination                             */
/* -------------------------------------------------------------------------- */

router.get("/", async (req, res) => {
  try {
    let { page = 1, limit = 8, search = "" } = req.query;
    page  = Number(page);
    limit = Number(limit);

    const query = {};
    if (search) {
      query["van_listing.title"] = { $regex: search, $options: "i" };
    }

    const total = await Van.countDocuments(query);
    const vans  = await Van.find(query).sort({ order: 1 }).skip((page - 1) * limit).limit(limit);

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
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* GET /preview/:slug  — Single van, draft or published (unlisted preview)    */
/* -------------------------------------------------------------------------- */

router.get('/preview/:slug', async (req, res) => {
  try {
    const van = await Van.findOne({ slug: req.params.slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });

    res.status(200).json({ message: 'Van fetched successfully', van });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* GET /:slug  — Single van                                                   */
/* -------------------------------------------------------------------------- */

router.get('/:slug', async (req, res) => {
  try {
    const van = await Van.findOne({ slug: req.params.slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });
    if (!van.is_published) return res.status(404).json({ message: 'Van not found' });

    res.status(200).json({ message: 'Van fetched successfully', van });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* PUT /reorder  — Drag-and-drop order                                        */
/* -------------------------------------------------------------------------- */

router.put("/reorder", protect, adminOnly, async (req, res) => {
  try {
    const { newOrder } = req.body;
    await Promise.all(newOrder.map(item => Van.findByIdAndUpdate(item._id, { order: item.order })));
    res.status(200).json({ success: true, message: "Order updated!" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* PUT /:slug  — Update Van                                                   */
/* -------------------------------------------------------------------------- */
/*
  galleryOrder  — JSON array of existing gallery objects in new order:
                  [{ url: "https://...", caption: "..." }, ...]
                  Items omitted from this array are removed from S3 + DB.

  galleryCaptions — JSON array of captions for newly uploaded gallery files:
                    ["caption for file[0]", "caption for file[1]", ...]

  insertAt      — integer index where new gallery files are spliced in
                  (defaults to end of gallery)
*/

router.put('/:slug', protect, adminOnly, upload.fields([
  { name: "gallery", maxCount: 10 },
  { name: "glbFile", maxCount: 1 }
]), async (req, res) => {
  try {
    const { slug } = req.params;

    const van = await Van.findOne({ slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });

    const van_listing       = parseJSONField(req.body.van_listing, van.van_listing);
    const detailed_features = parseJSONField(req.body.detailed_features, van.detailed_features);
    const delivery_date     = req.body.delivery_date;
    const media             = parseJSONField(req.body.media, van.media);
    const blocks            = parseJSONField(req.body.blocks, van.blocks);
    const textures          = parseJSONField(req.body.textures, van.textures);
    const status            = req.body.status !== undefined ? req.body.status : van.status;
    const is_published      = req.body.is_published !== undefined
      ? (req.body.is_published === "true" || req.body.is_published === true)
      : van.is_published;
    const galleryOrder      = parseJSONField(req.body.galleryOrder, null);

    // Slug regeneration on title change
    let newSlug = van.slug;
    if (van_listing.title && van_listing.title !== van.van_listing.title) {
      newSlug = await Van.generateSlug(van_listing.title);
    }

    // ── GLB file ──────────────────────────────────────────────────────────────
    let modelUrl = van.glbFile;

    if (req.body.removeGlbFile === "true" && van.glbFile) {
      try { await deleteFromS3(van.glbFile); } catch (e) { console.error('Error deleting GLB:', e); }
      modelUrl = null;
    }

    if (req.files["glbFile"]?.[0]) {
      const file = req.files["glbFile"][0];
      if (van.glbFile && req.body.removeGlbFile !== "true") {
        try { await deleteFromS3(van.glbFile); } catch (e) { console.error('Error deleting old GLB:', e); }
      }
      modelUrl = await uploadToS3(file.buffer, "van/models", file.originalname, file.mimetype);
    }

    // ── Gallery ───────────────────────────────────────────────────────────────
    let updatedGallery = van.gallery || [];   // [url_string]

    if (galleryOrder && Array.isArray(galleryOrder)) {
      // galleryOrder items may be strings or legacy { url } objects
      const normalise = (item) => (typeof item === "string" ? item : item.url || item);
      const keepUrls = new Set(galleryOrder.map(normalise));

      // Delete removed images from S3
      const removedUrls = updatedGallery.filter(url => !keepUrls.has(url));
      if (removedUrls.length > 0) {
        await Promise.allSettled(removedUrls.map(url => deleteFromS3(url)));
      }

      updatedGallery = galleryOrder
        .map(normalise)
        .filter(url => van.gallery.includes(url));
    }

    // Upload new gallery files and splice them in
    const newGallery = await Promise.all(
      (req.files["gallery"] || []).map(async (file) =>
        uploadToS3(file.buffer, "van/gallery", file.originalname)
      )
    );

    const insertAt = req.body.insertAt !== undefined
      ? parseInt(req.body.insertAt)
      : updatedGallery.length;

    updatedGallery.splice(insertAt, 0, ...newGallery);

    // ── Save ──────────────────────────────────────────────────────────────────
    van.van_listing = {
      ...van.van_listing,
      ...van_listing,
      price: van_listing.price ? Number(van_listing.price) : van.van_listing.price,
      specifications: van_listing.specifications
        ? { ...van.van_listing.specifications, ...van_listing.specifications }
        : van.van_listing.specifications
    };

    van.delivery_date     = delivery_date;
    van.detailed_features = detailed_features;
    van.media             = media;
    van.status            = status;
    van.is_published      = is_published;
    van.gallery           = updatedGallery;
    van.blocks            = blocks;
    van.glbFile           = modelUrl;
    van.slug              = newSlug;
    van.textures          = textures;

    const updatedVan = await van.save();

    res.status(200).json({ message: 'Van updated successfully', van: updatedVan });
  } catch (error) {
    console.error('Error updating van:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

/* -------------------------------------------------------------------------- */
/* DELETE /:slug  — Delete Van + all S3 assets                               */
/* -------------------------------------------------------------------------- */

router.delete('/:slug', protect, adminOnly, async (req, res) => {
  try {
    const van = await Van.findOneAndDelete({ slug: req.params.slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });

    const s3Deletes = [];

    // Gallery images — each item is a url string
    if (Array.isArray(van.gallery) && van.gallery.length > 0) {
      s3Deletes.push(...van.gallery.map(url => deleteFromS3(url)));
    }

    // GLB model
    if (van.glbFile) {
      s3Deletes.push(deleteFromS3(van.glbFile));
    }

    // Block media (images / videos / pdfs uploaded inside content blocks)
    if (Array.isArray(van.blocks) && van.blocks.length > 0) {
      const blockMediaUrls = van.blocks
        .flatMap(block => (block.block_media || []).map(m => m.url))
        .filter(Boolean);
      s3Deletes.push(...blockMediaUrls.map(url => deleteFromS3(url)));
    }

    if (s3Deletes.length > 0) {
      await Promise.allSettled(s3Deletes);
    }

    res.status(200).json({
      message: 'Van, 3D Models, and all S3 assets deleted successfully',
      van
    });
  } catch (error) {
    console.error('Error deleting van:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
