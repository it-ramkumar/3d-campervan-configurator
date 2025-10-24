const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3 } = require("../services/s3")
const { protect, adminOnly } = require("../middleware/authMiddleware")



router.post('/',  protect, adminOnly, upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]), async (req, res) => {
  try {
    // console.log(req.files,"files")
    // Parse JSON fields
      // ✅ Parse blocksData from body (captions etc.)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

const blocks = await Promise.all(
  blocksData.map(async (block, index) => ({
    caption: block.caption,
    image: req.files["blockImages"]?.[index]
      ? await uploadToS3(
          req.files["blockImages"][index].buffer,
          "van/blocks",
          req.files["blockImages"][index].originalname
        )
      : null,
  }))
);

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
const gallery = await Promise.all(
  (req.files["gallery"] || []).map(async file => ({
    url: await uploadToS3(file.buffer, "van/gallery", file.originalname),
    caption: "", // optional, ya req.body se le lo
  }))
);


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
// UPDATE van by slug
router.put(
  "/:slug", protect, adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      const { slug } = req.params;

      const van = await Van.findOne({ slug });
      if (!van) return res.status(404).json({ message: "Van not found" });

      // ✅ Helper to parse JSON or fallback to existing
      const parseJSONField = (field, fallback) => {
        try {
          return field ? JSON.parse(field) : fallback;
        } catch {
          return fallback;
        }
      };

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
        req.body.sold !== undefined ? req.body.sold === "true" : van.sold;

      // ✅ Existing gallery & blocks
      let existingGallery = van.gallery || [];
      let existingBlocks = van.blocks || [];

      // ✅ Upload new gallery images (append to existing)
      const newGallery = await Promise.all(
        (req.files["gallery"] || []).map(async (file) => ({
          url: await uploadToS3(file.buffer, "van/gallery", file.originalname),
          caption: "", // optional, ya req.body se le lo
        }))
      );
      const updatedGallery = [...existingGallery, ...newGallery];

      // ✅ Parse blocks data from body (captions)
      const blocksData = parseJSONField(req.body.blocksData, []);

      // ✅ Merge existing blocks with uploaded block images or new blocks
      const updatedBlocks = await Promise.all(
        blocksData.map(async (block, index) => {
          const oldBlock = existingBlocks[index] || {};
          const newImage = req.files["blockImages"]?.[index]
            ? await uploadToS3(
                req.files["blockImages"][index].buffer,
                "van/blocks",
                req.files["blockImages"][index].originalname
              )
            : oldBlock.image || null;

          return {
            caption: block.caption || oldBlock.caption || "",
            image: newImage,
          };
        })
      );

      // ✅ Assign updated values
      van.van_listing = van_listing;
      van.feature_highlights = feature_highlights;
      van.detailed_features = detailed_features;
      van.media = media;
      van.sold = sold;
      van.gallery = updatedGallery;
      van.blocks = updatedBlocks;

      const updatedVan = await van.save();

      res.status(200).json({ message: "Van updated successfully", van: updatedVan });
    } catch (error) {
      console.error("Error updating van:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);



// -------------------
// DELETE van by slug
// -------------------
router.delete('/:slug', protect, adminOnly, async (req, res) => {
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
