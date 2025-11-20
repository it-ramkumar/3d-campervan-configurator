const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const slugify = require("slugify");

const ExteriorChoice = require("../models/ExteriorRoute");
const ExteriorCategory = require("../models/ExteriorCategory");
const ExteriorSubCategory = require("../models/ExteriorSubCategory");
const { uploadToS3,deleteFromS3 } = require("../services/s3");


// 🟢 Create a new InteriorChoice
router.post("/exterior", upload.array("images"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || "{}");
    const description = JSON.parse(req.body.description || "[]");

    // ✅ Title is required
    if (!data.title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    // ✅ Validate categoryId if provided
    if (data.categoryId) {
      const categoryExists = await ExteriorCategory.findById(data.categoryId);
      if (!categoryExists) {
        return res.status(400).json({ success: false, message: "Invalid categoryId" });
      }
    }

    // ✅ Validate subCategoryId if provided
    if (data.subCategoryId) {
      const subExists = await ExteriorSubCategory.findById(data.subCategoryId);
      if (!subExists) {
        return res.status(400).json({ success: false, message: "Invalid subCategoryId" });
      }
    }

    // ✅ Upload multiple images to S3
    let uploadedImages = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedUrl = await uploadToS3(file.buffer, "Interior-choices", file.originalname);
        uploadedImages.push(uploadedUrl);
      }
    }

    // ✅ Require at least one image
    if (uploadedImages.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // ✅ Create new InteriorChoice
    const newItem = new ExteriorChoice({
      title: data.title,
      categoryId: data.categoryId || null,
      subCategoryId: data.subCategoryId || null,
      description,
      link: data.link || "",
      images: uploadedImages
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      message: "InteriorChoice created successfully",
      data: newItem,
    });

  } catch (err) {
    console.error("Error creating InteriorChoice:", err);
    res.status(500).json({
      success: false,
      message: "Upload failed",
      error: err.message
    });
  }
});

router.get("/exterior", async (req, res) => {
  try {
    const interiors = await ExteriorChoice.find()
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

// 🟢 Update an InteriorChoice
router.put('/exterior/:id', upload.array("images"), async (req, res) => {
  try {
    const data = JSON.parse(req.body.data || "{}");
    const description = JSON.parse(req.body.description || "[]");

    const interior = await ExteriorChoice.findById(req.params.id);
    if (!interior) return res.status(404).json({ success: false, message: "InteriorChoice not found" });

    // Upload new images if any
    let uploadedImages = interior.images || [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploadedUrl = await uploadToS3(file.buffer, "Interior-choices", file.originalname);
        uploadedImages.push(uploadedUrl);
      }
    }

    interior.title = data.title || interior.title;
    interior.categoryId = data.categoryId || interior.categoryId;
    interior.subCategoryId = data.subCategoryId || interior.subCategoryId;
    interior.description = description.length > 0 ? description : interior.description;
    interior.images = uploadedImages;

    await interior.save();

    res.status(200).json({ success: true, message: "InteriorChoice updated successfully", data: interior });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Update failed", error: err.message });
  }
});

// 🟢 Delete an InteriorChoice
router.delete("/exterior/:id", async (req, res) => {
  try {
    const interior = await ExteriorChoice.findById(req.params.id);
    if (!interior) return res.status(404).json({ success: false, message: "InteriorChoice not found" });

    // Delete all images from S3
    if (interior.images && interior.images.length > 0) {
      for (const url of interior.images) {
        await deleteFromS3(url);
        console.log(`🧹 Deleted image from S3: ${url}`);
      }
    }

    await ExteriorChoice.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: "InteriorChoice deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Delete failed", error: err.message });
  }
});

module.exports = router;
