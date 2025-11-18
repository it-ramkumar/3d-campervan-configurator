// routes/Interiors.js
const express = require('express');
const router = express.Router();
const Interior = require('../models/InteriorChoices');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const slugify = require('slugify');
const { uploadToS3,deleteFromS3 } = require("../services/s3");

// 🟢 Create a new Interior
router.post(
  "/",
  upload.single("images"),
  async (req, res) => {
    try {
      const data = JSON.parse(req.body.data || "{}");
      const description = JSON.parse(req.body.description || "[]");

      if (!data.title || !data.categoryId) {
        return res.status(400).json({
          success: false,
          message: "Title & Category ID are required"
        });
      }

      let slug = req.body.slug || slugify(data.title, { lower: true, strict: true });
      const existing = await Interior.findOne({ slug });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "Item with this slug already exists"
        });
      }

      let uploadedImage = null;

      if (req.file) {
        uploadedImage = await uploadToS3(
          req.file.buffer,
          "Interior-choices",
          req.file.originalname
        );
      }

      const newItem = new Interior({
        title: data.title,
        slug,
        categoryId: data.categoryId,
        description,
        image: uploadedImage,   // single image
        gallery: uploadedImage ? [uploadedImage] : [], // optional
      });

      await newItem.save();

      return res.status(201).json({
        success: true,
        message: "Interior item created successfully",
        data: newItem,
      });

    } catch (err) {
      console.error("Error creating item:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);


// 🟢 Get all Interiors
router.get('/', async (req, res) => {
  try {
    const Interiors = await Interior.find().populate("categoryId");;
    res.json(Interiors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Get a single Interior by slug (for an item)
router.get('/:slug', async (req, res) => {
  try {
    const slug = req.params.slug;
    const Interior = await Interior.findOne({ 'items.slug': slug }, { 'items.$': 1, InteriorTitle: 1 });
    if (!Interior) return res.status(404).json({ message: 'Item not found' });
    res.json(Interior);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟢 Update a Interior (or add items)
router.put('/:id', async (req, res) => {
  try {
    const Interior = await Interior.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!Interior) return res.status(404).json({ message: 'Interior not found' });
    res.json(Interior);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🟢 Delete a Interior
router.delete("/:id", async (req, res) => {
  try {
    // 1️⃣ Find the interior item first
    const interior = await Interior.findById(req.params.id);
    if (!interior) {
      return res.status(404).json({ success: false, message: "Interior not found" });
    }

    // 2️⃣ Delete the single image from S3
    if (interior.image) {
      await deleteFromS3(interior.image);
      console.log(`🧹 Deleted image from S3: ${interior.image}`);
    }

    // 3️⃣ Delete the interior document from MongoDB
    const deletedInterior = await Interior.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Interior deleted successfully",
      data: deletedInterior,
    });
  } catch (err) {
    console.error("Error deleting interior:", err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});
module.exports = router;
