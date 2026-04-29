const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const slugify = require("slugify");
const mongoose = require("mongoose");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const InteriorChoice = require("../models/InteriorChoices");
const InteriorCategory = require("../models/InteriorCategory");
const InteriorSubCategory = require("../models/InteriorSubCategory");
const { uploadToS3,deleteFromS3 } = require("../services/s3");


// --- POST ROUTE ---
router.post("/interior", protect, adminOnly, upload.array("images"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || "{}");
    const description = JSON.parse(req.body.description || "[]");
    // Blocks ko parse karein
    const blocks = JSON.parse(req.body.blocks || "[]");

    if (!data.title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    // Category/SubCategory Validation
    if (data.categoryId) {
      const categoryExists = await InteriorCategory.findById(data.categoryId);
      if (!categoryExists) return res.status(400).json({ success: false, message: "Invalid categoryId" });
    }
    if (data.subCategoryId) {
      const subExists = await InteriorSubCategory.findById(data.subCategoryId);
      if (!subExists) return res.status(400).json({ success: false, message: "Invalid subCategoryId" });
    }

    // S3 Image Upload
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedUrl = await uploadToS3(file.buffer, "Interior-choices", file.originalname);
        uploadedImages.push(uploadedUrl);
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    const newItem = new InteriorChoice({
      title: data.title,
      categoryId: data.categoryId || null,
      subCategoryId: data.subCategoryId || null,
      description,
      blocks, // ✅ Blocks yaha save honge
      link: data.link || "",
      images: uploadedImages
    });

    await newItem.save();
    res.status(201).json({ success: true, message: "InteriorChoice created successfully", data: newItem });

  } catch (err) {
    console.error("Error creating InteriorChoice:", err);
    res.status(500).json({ success: false, message: "Upload failed", error: err.message });
  }
});

router.get("/interior", async (req, res) => {
  try {
    const interiors = await InteriorChoice.find()
      .populate("categoryId", "title description")      // use field names from schema
      .populate("subCategoryId", "title description categoryId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "InteriorChoices fetched successfully",
      data: interiors
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

router.put('/interior/:id', protect, adminOnly, upload.array("images"), async (req, res) => {
  try {

    const data = JSON.parse(req.body.data || "{}");
    const description = JSON.parse(req.body.description || "[]");
    const blocks = JSON.parse(req.body.blocks || "[]");

    const interior = await InteriorChoice.findById(req.params.id);
    if (!interior) return res.status(404).json({ success: false, message: "InteriorChoice not found" });

    let uploadedImages = [];

    if (req.files && req.files.length > 0) {
      // ✅ S3 se purani images delete karo
      if (interior.images && interior.images.length > 0) {
        console.log("Deleting old images from S3...");
        for (const oldImageUrl of interior.images) {
          await deleteFromS3(oldImageUrl);
        }
      }

      // ✅ New images upload karo
      console.log("Uploading new images to S3...");
      for (const file of req.files) {
        const uploadedUrl = await uploadToS3(file.buffer, "Interior-choices", file.originalname);
        uploadedImages.push(uploadedUrl);
      }

      // New images set karo
      interior.images = uploadedImages;
    }
    // Agar new images nahi aaye toh purani images untouched rahegi

    // Update other fields
    interior.title = data.title || interior.title;
    interior.categoryId = data.categoryId || interior.categoryId;
    interior.subCategoryId = data.subCategoryId || interior.subCategoryId;
    interior.description = description.length > 0 ? description : interior.description;
    interior.blocks = blocks.length > 0 ? blocks : interior.blocks;
    interior.link = data.link || interior.link;

    await interior.save();
    res.status(200).json({ success: true, message: "InteriorChoice updated successfully", data: interior });

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
});

router.delete("/interior/:id", protect, adminOnly, async (req, res) => {
  try {
    const interior = await InteriorChoice.findById(req.params.id);
    if (!interior) return res.status(404).json({ success: false, message: "InteriorChoice not found" });

    // Delete all images from S3
    if (interior.images && interior.images.length > 0) {
      for (const url of interior.images) {
        await deleteFromS3(url);
        console.log(`🧹 Deleted image from S3: ${url}`);
      }
    }

    await InteriorChoice.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "InteriorChoice deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
});

module.exports = router;
