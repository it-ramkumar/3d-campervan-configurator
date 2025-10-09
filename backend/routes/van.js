const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel")
const multer = require("multer")
const { vans } = require("../services/s3")
const upload = multer({ storage: vans });

router.post('/',  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]), async (req, res) => {
  try {
    // console.log(req.files,"files")
    // Parse JSON fields
      // ✅ Parse blocksData from body (captions etc.)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge images with captions
      const blocks = blocksData.map((b, i) => ({
        caption: b.caption,
        image: req.files["blockImages"]?.[i]?.location || null,
      }));
    const van_listing = JSON.parse(req.body.van_listing || "{}");
    const feature_highlights = JSON.parse(req.body.feature_highlights || "[]");
    const detailed_features = JSON.parse(req.body.detailed_features || "[]");
    const media = JSON.parse(req.body.media || "[]");
    const sold = req.body.sold === "true"; // checkbox se string aata hai

    if (!van_listing || !van_listing.title) {
      return res.status(400).json({ message: 'Van listing with title is required' });
    }

    // Slug generate
    let slug = req.body.slug || await Van.generateSlug(van_listing.title);

    // Check slug exists
    const existingVan = await Van.findOne({ slug });
    if (existingVan) {
      return res.status(409).json({ message: 'Van with this slug exists' });
    }

 // Gallery files
const gallery = req.files["gallery"]?.map((f) => ({
  url: f.location,
  caption: ""
}));

    // Final object
    const vanData = {
      slug,
      van_listing: {
        ...van_listing,
        price: van_listing.price ? Number(van_listing.price) : null
      },
      sold,
      gallery,
       blocks,
      feature_highlights,
      detailed_features,
      media
    };

    const newVan = await Van.create(vanData);

    res.status(201).json({ message: 'Van created successfully', van: newVan });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/vans/available
router.get('/available', async (req, res) => {
  try {
    // sirf unsold vans fetch karo
    const vans = await Van.find({ sold: false }).sort({ createdAt: -1 }); // latest pehle

    res.status(200).json({
      count: vans.length,
      vans
    });
  } catch (err) {
    console.error("SERVER ERROR:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all vans// -------------------
router.get('/', async (req, res) => {
  try {
    const allVans = await Van.find();
    res.status(200).json({ message: 'Vans fetched', count: allVans.length, vans: allVans });
  } catch (error) {
    console.error('Error fetching vans:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// -------------------
// GET single van by slug
// -------------------
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const van = await Van.findOne({ slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });
    res.status(200).json({ message: 'Van fetched', van });
  } catch (error) {
    console.error('Error fetching van:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// -------------------
// Helper to safely parse JSON
const parseJSONField = (field, fallback) => {
  if (!field) return fallback;
  if (typeof field === "string") {
    try {
      return JSON.parse(field);
    } catch (err) {
      return fallback;
    }
  }
  return field; // already parsed
};

// -------------------
// UPDATE van by slug
router.put(
  "/:slug",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const { slug } = req.params;

      const van = await Van.findOne({ slug });
      if (!van)
        return res.status(404).json({ message: "Van not found" });

      // ✅ Parse JSON fields
      const van_listing = parseJSONField(req.body.van_listing, van.van_listing);
      const feature_highlights = parseJSONField(
        req.body.feature_highlights,
        van.feature_highlights
      );
      const detailed_features = parseJSONField(
        req.body.detailed_features,
        van.detailed_features
      );
      const media = parseJSONField(req.body.media, van.media);
      const sold =
        req.body.sold !== undefined
          ? req.body.sold === "true"
          : van.sold;

      // ✅ Gallery (replace only if new files uploaded)
      let gallery = van.gallery;
      if (req.files["gallery"] && req.files["gallery"].length > 0) {
        gallery = req.files["gallery"].map((f) => ({
          url: f.path,
          caption: "",
        }));
      }

      // ✅ Blocks (captions + images)
      let blocks = van.blocks || [];
      if (req.body.blocksData) {
        const blocksData = JSON.parse(req.body.blocksData || "[]");
        blocks = blocksData.map((b, i) => ({
          caption: b.caption,
          image: req.files["blockImages"]?.[i]?.path || b.image || null, // keep old if no new upload
        }));
      }

      // ✅ Assign updated values
      van.van_listing = van_listing;
      van.feature_highlights = feature_highlights;
      van.detailed_features = detailed_features;
      van.media = media;
      van.sold = sold;
      van.gallery = gallery;
      van.blocks = blocks;

      const updatedVan = await van.save();

      res
        .status(200)
        .json({ message: "Van updated successfully", van: updatedVan });
    } catch (error) {
      console.error("Error updating van:", error);
      res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  }
);


// -------------------
// DELETE van by slug
// -------------------
router.delete('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    const van = await Van.findOneAndDelete({ slug });
    if (!van) return res.status(404).json({ message: 'Van not found' });

    res.status(200).json({ message: 'Van deleted successfully', van });
  } catch (error) {
    console.error('Error deleting van:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
