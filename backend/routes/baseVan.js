const express = require("express");
const router = express.Router();
const BaseVan = require("../models/baseVan"); // Aapka BaseVan schema path
const { uploadToS3,deleteFromS3 } = require("../services/s3"); // Aapka S3 helper function
const { protect, adminOnly } = require("../middleware/authMiddleware");
const multer = require("multer");

// Multer storage setup (Memory storage as per your buffer requirement)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/add-base-van",
  protect,
  adminOnly,
  upload.fields([{ name: "image", maxCount: 1 }, { name: "glbFile", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { layout, modelYear, price, shortDescription, wheelBase, drivetrain, sitSleep, colors } = req.body;

      const imageFile = req.files["image"]?.[0];
      const glbFile = req.files["glbFile"]?.[0];

      // Validation
      if (!imageFile)
        return res.status(400).json({ success: false, message: "Base van image is required" });
      if (!glbFile)
        return res.status(400).json({ success: false, message: "Base van GLB file is required" });

      // 1. Upload Image (Folder: base-vans/images)
      const imageUrl = await uploadToS3(
        imageFile.buffer,
        "base-vans/images", // Specifically for base vans
        imageFile.originalname,
        imageFile.mimetype
      );

      // 2. Upload GLB (Folder: base-vans/models)
      const modelUrl = await uploadToS3(
        glbFile.buffer,
        "base-vans/models", // Specifically for base vans
        glbFile.originalname,
        glbFile.mimetype
      );

      // 3. Save to BaseVan Model
      const newBaseVan = await BaseVan.create({
        layout,
        modelYear,
        price,
        shortDescription,
        imgUrl: imageUrl,    // Schema ke mutabiq name adjust kiya
        glbFileUrl: modelUrl, // Schema ke mutabiq name adjust kiya
        spec: {
          wheelBase,
          drivetrain,
          sitSleep
        },
        colors: colors || "Standard"
      });

      res.status(201).json({
        success: true,
        message: "Base Van added successfully!",
        data: newBaseVan
      });

    } catch (err) {
      console.error("Base Van Upload error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);

router.get("/add-base-van", async (req, res) => {
  try {
    const { search, layout } = req.query;
    let query = {};

    // Agar user search kar raha hai (Layout name se)
    if (search) {
      query.layout = { $regex: search, $options: "i" }; // "i" ka matlab case-insensitive
    }

    // Agar specifically layout filter chahiye
    if (layout) {
      query.layout = layout;
    }

    const baseVans = await BaseVan.find(query).sort({ createdAt: -1 }); // Latest vans upar ayengi

    res.status(200).json({
      success: true,
      count: baseVans.length,
      data: baseVans,
    });
  } catch (err) {
    console.error("Fetch BaseVans error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/add-base-van/:id", protect, adminOnly, async (req, res) => {
  try {
    const baseVan = await BaseVan.findById(req.params.id);

    if (!baseVan) {
      return res.status(404).json({ success: false, message: "Base Van not found" });
    }

    res.status(200).json({
      success: true,
      data: baseVan,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


router.delete("/add-base-van/:id", protect, adminOnly, async (req, res) => {
  try {
    // 1. Pehle check karein ke van exist karti hai
    const van = await BaseVan.findById(req.params.id);

    if (!van) {
      return res.status(404).json({
        success: false,
        message: "Base Van not found"
      });
    }

    console.log(`🗑️ Deleting Van: ${van.layout}`);

    // 2. S3 se Image aur GLB delete karein
    // Hamara deleteFromS3 function URL se khud hi key nikal leta hai
    if (van.imgUrl) {
      await deleteFromS3(van.imgUrl);
    }

    if (van.glbFileUrl) {
      await deleteFromS3(van.glbFileUrl);
    }

    // 3. Database se record delete karein
    await BaseVan.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Base Van and associated files deleted successfully!"
    });

  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
});

module.exports = router;