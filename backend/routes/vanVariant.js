const express = require("express");
const router = express.Router();

// MODELS
const Variant = require("../models/vanVariant");
const Part = require("../models/vanParts3dModels");
const Van = require("../models/vanModel");

// MIDDLEWARE
const { protect, adminOnly } = require("../middleware/authMiddleware");


// =====================================================
// CREATE VARIANT
// =====================================================
router.post("/variants", protect, adminOnly, async (req, res) => {
  try {
    const {
      name,
      description,
      vanId,
      parts,
      slug,
      isDefault
    } = req.body;

    if (!name || !vanId) {
      return res.status(400).json({
        message: "Name and vanId are required"
      });
    }

    const finalSlug =
      slug ||
      name.toLowerCase().replace(/\s+/g, "-");

    const existing = await Variant.findOne({
      slug: finalSlug
    });

    if (existing) {
      return res.status(409).json({
        message: "Variant already exists"
      });
    }

    const variant = await Variant.create({
      name,
      description,
      slug: finalSlug,
      vanId,
      parts: parts || [],
      isDefault: isDefault || false
    });

    return res.status(201).json({
      success: true,
      variant
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to create variant",
      error: err.message
    });
  }
});


// =====================================================
// GET ALL VARIANTS
// =====================================================
router.get("/variants", async (req, res) => {
  try {
    const { vanSlug } = req.query;

    let filter = {};

    if (vanSlug) {
      const van = await Van.findOne({ slug: vanSlug }).select("_id");

      if (!van) {
        return res.status(404).json({ message: "Van not found" });
      }

      filter.vanId = van._id;
    }

    const variants = await Variant.find(filter)
      .populate("parts")
      .populate("vanId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: variants.length,
      variants
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch variants",
      error: err.message
    });
  }
});

// =====================================================
// GET SINGLE VARIANT
// =====================================================
router.get("/variants/:id", async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id)
      .populate("parts")
      .populate("vanId");

    if (!variant) {
      return res.status(404).json({
        message: "Variant not found"
      });
    }

    return res.status(200).json({
      success: true,
      variant
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch variant",
      error: err.message
    });
  }
});


// =====================================================
// UPDATE VARIANT
// =====================================================
router.put("/variants/:id", protect, adminOnly, async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);

    if (!variant) {
      return res.status(404).json({
        message: "Variant not found"
      });
    }

    const {
      name,
      description,
      parts,
      isDefault,
      vanId
    } = req.body;

    // UPDATE FIELDS
    if (name) {
      variant.name = name;
    }

    if (description !== undefined) {
      variant.description = description;
    }

    if (parts) {
      variant.parts = parts;
    }

    if (vanId) {
      variant.vanId = vanId;
    }

    if (isDefault !== undefined) {
      variant.isDefault = isDefault;
    }

    await variant.save();

    return res.status(200).json({
      success: true,
      variant
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to update variant",
      error: err.message
    });
  }
});


// =====================================================
// DELETE VARIANT
// =====================================================
router.delete("/variants/:id", protect, adminOnly, async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);

    if (!variant) {
      return res.status(404).json({
        message: "Variant not found"
      });
    }

    await variant.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Variant deleted successfully"
    });

  } catch (err) {
    return res.status(500).json({
      message: "Failed to delete variant",
      error: err.message
    });
  }
});


module.exports = router;