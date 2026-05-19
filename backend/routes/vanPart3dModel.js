const Parts = require("../models/vanParts3dModels");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  '/van-parts',
  protect,
  adminOnly,
  upload.fields([
    { name: "model", maxCount: 1 },     // GLB file
    { name: "thumbnail", maxCount: 1 }
  ]),
  async (req, res) => {
    try {
      // Parse fields
      const name = req.body.name;
      const category = req.body.category;
      const slug = req.body.slug;

      const position = JSON.parse(req.body.position || "[0,0,0]");
      const rotation = JSON.parse(req.body.rotation || "[0,0,0]");
      const scale = JSON.parse(req.body.scale || "[1,1,1]");

      if (!name || !category) {
        return res.status(400).json({
          message: "Name and category are required"
        });
      }

      // Check duplicate slug
      const finalSlug = slug || name.toLowerCase().replace(/\s+/g, "-");

      const existing = await Parts.findOne({ slug: finalSlug });
      if (existing) {
        return res.status(409).json({
          message: "Part with this slug already exists"
        });
      }

      // Upload model (GLB)
      let modelUrl = null;

      if (req.files["model"]?.[0]) {
        const file = req.files["model"][0];

        modelUrl = await uploadToS3(
          file.buffer,
          "parts/models",
          file.originalname,
          file.mimetype
        );
      }

      // Upload thumbnail
      let thumbnailUrl = null;

      if (req.files["thumbnail"]?.[0]) {
        const file = req.files["thumbnail"][0];

        thumbnailUrl = await uploadToS3(
          file.buffer,
          "parts/thumbnails",
          file.originalname,
          file.mimetype
        );
      }

      // Create DB entry
      const partData = {
        slug: finalSlug,
        name,
        category,
        model: modelUrl,
        thumbnail: thumbnailUrl,
        position,
        rotation,
        scale
      };

      const newPart = await Parts.create(partData);

      return res.status(201).json({
        message: "Part created successfully",
        part: newPart
      });

    } catch (err) {
      console.error("PART CREATE ERROR:", err);

      return res.status(500).json({
        message: "Server error",
        error: err.message
      });
    }
  }
);

router.get('/van-parts', async (req, res) => {
  try {
    const parts = await Parts.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: parts.length,
      parts
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch parts",
      error: err.message
    });
  }
});
router.get('/van-parts/by-category', async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};

    const parts = await Parts.find(filter);

    res.status(200).json({
      success: true,
      parts
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch parts",
      error: err.message
    });
  }
});
router.get('/van-parts/:slug', async (req, res) => {
  try {
    const part = await Parts.findOne({ slug: req.params.slug });

    if (!part) {
      return res.status(404).json({ message: "Part not found" });
    }

    res.status(200).json({
      success: true,
      part
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching part",
      error: err.message
    });
  }
});
// DELETE PART API
router.delete('/van-parts/:id', protect, adminOnly, async (req, res) => {
  try {
    const part = await Parts.findById(req.params.id);

    if (!part) {
      return res.status(404).json({
        message: "Part not found"
      });
    }

    // 🔥 Delete GLB model from S3
    if (part.model) {
      await deleteFromS3(part.model);
    }

    // 🔥 Delete thumbnail from S3
    if (part.thumbnail) {
      await deleteFromS3(part.thumbnail);
    }

    // 🔥 Delete DB document
    await part.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Part deleted successfully"
    });

  } catch (err) {
    console.error("DELETE PART ERROR:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete part",
      error: err.message
    });
  }
});

// UPDATE / EDIT PART API
router.put(
  '/van-parts/:id',
  protect,
  adminOnly,
  upload.fields([
    { name: "model", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
  ]),
  async (req, res) => {
    try {

      const part = await Parts.findById(req.params.id);

      if (!part) {
        return res.status(404).json({
          message: "Part not found"
        });
      }

      // Parse fields
      const name = req.body.name || part.name;
      const category = req.body.category || part.category;

      const position = req.body.position
        ? JSON.parse(req.body.position)
        : part.position;

      const rotation = req.body.rotation
        ? JSON.parse(req.body.rotation)
        : part.rotation;

      const scale = req.body.scale
        ? JSON.parse(req.body.scale)
        : part.scale;

      // -----------------------------
      // 🔥 Replace GLB model
      // -----------------------------
      let modelUrl = part.model;

      if (req.files["model"]?.[0]) {

        // delete old model
        if (part.model) {
          await deleteFromS3(part.model);
        }

        const file = req.files["model"][0];

        modelUrl = await uploadToS3(
          file.buffer,
          "parts/models",
          file.originalname,
          file.mimetype
        );
      }

      // -----------------------------
      // 🔥 Replace thumbnail
      // -----------------------------
      let thumbnailUrl = part.thumbnail;

      if (req.files["thumbnail"]?.[0]) {

        // delete old thumbnail
        if (part.thumbnail) {
          await deleteFromS3(part.thumbnail);
        }

        const file = req.files["thumbnail"][0];

        thumbnailUrl = await uploadToS3(
          file.buffer,
          "parts/thumbnails",
          file.originalname,
          file.mimetype
        );
      }

      // -----------------------------
      // Update DB
      // -----------------------------
      part.name = name;
      part.category = category;
      part.model = modelUrl;
      part.thumbnail = thumbnailUrl;
      part.position = position;
      part.rotation = rotation;
      part.scale = scale;

      await part.save();

      return res.status(200).json({
        success: true,
        message: "Part updated successfully",
        part
      });

    } catch (err) {
      console.error("UPDATE PART ERROR:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update part",
        error: err.message
      });
    }
  }
);
module.exports = router;