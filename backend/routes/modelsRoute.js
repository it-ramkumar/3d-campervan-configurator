const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadToS3 } = require("../services/s3");
const { InteriorModel, ExteriorModel, SystemModel } = require("../models/modelsByCategory");
const { protect, adminOnly } = require("../middleware/authMiddleware")


const storage = multer.memoryStorage();
const upload = multer({ storage });

// --------------------- /add Route Example ---------------------
router.post(
  "/add",
  protect,
  adminOnly,
  upload.fields([{ name: "image" }, { name: "glbFile" }]),
  async (req, res) => {
    try {
      const { category, ...data } = req.body;
      const imageFile = req.files["image"]?.[0];
      const glbFile = req.files["glbFile"]?.[0];

      if (!imageFile)
        return res.status(400).json({ success: false, message: "Image file is required" });
      if (!glbFile)
        return res.status(400).json({ success: false, message: "GLB file is required" });

      // Compress and upload image
      const imageUrl = await uploadToS3(
        imageFile.buffer,
        "configurator/images",
        imageFile.originalname,
        imageFile.mimetype
      );

      // Compress and upload GLB (mesh + textures) with fallback
      const modelUrl = await uploadToS3(
        glbFile.buffer,
        "configurator/models",
        glbFile.originalname,
        glbFile.mimetype
      );

      const Model =
        category === "interior"
          ? InteriorModel
          : category === "exterior"
          ? ExteriorModel
          : category === "system"
          ? SystemModel
          : null;

      if (!Model)
        return res.status(400).json({ success: false, message: "Invalid category" });

      const saved = await Model.create({
        ...data,
        category,
        image: imageUrl,
        glbFile: modelUrl,
      });

      res.json({ success: true, data: saved });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  }
);


router.put("/edit/:id", protect, adminOnly, upload.fields([{ name: "image" }, { name: "glbFile" }]), async (req, res) => {
  try {
    const { category, ...data } = req.body;
    const { id } = req.params;

    const Model =
      category === "interior"
        ? InteriorModel
        : category === "exterior"
          ? ExteriorModel
          : category === "system"
            ? SystemModel
            : null;

    if (!Model) return res.status(400).json({ success: false, message: "Invalid category" });

    const updateData = { ...data };

    // Upload new files if provided
    const imageFile = req.files["image"]?.[0];
    const glbFile = req.files["glbFile"]?.[0];

    if (imageFile) {
      const imageUrl = await uploadToS3(imageFile.buffer, "configurator/images", imageFile.originalname, imageFile.mimetype);
      updateData.image = imageUrl;
    }

    if (glbFile) {
      const modelUrl = await uploadToS3(glbFile.buffer, "configurator/models", glbFile.originalname, glbFile.mimetype);
      updateData.glbFile = modelUrl;
    }

    const updated = await Model.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Model not found" });

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

router.delete("/delete/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.query; // ✅ category from query

    if (!category) {
      return res.status(400).json({ success: false, message: "Category is required" });
    }

    // Select model based on category
    const Model =
      category === "interior"
        ? InteriorModel
        : category === "exterior"
        ? ExteriorModel
        : category === "system"
        ? SystemModel
        : null;

    if (!Model) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // ✅ Find the document before deleting (to get image & glbFile URLs)
    const existing = await Model.findById(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: "Model not found" });
    }

    // ✅ Delete files from S3 first
    await deleteFromS3(existing.image);
    await deleteFromS3(existing.glbFile);

    // ✅ Then delete from DB
    await Model.findByIdAndDelete(id);

    res.json({ success: true, message: "Deleted successfully (S3 + DB)" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});


router.get("/interior", async (req, res) => {
  try {
    const data = await InteriorModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/exterior", async (req, res) => {
  try {
    const data = await ExteriorModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/system", async (req, res) => {
  try {
    const data = await SystemModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const [interior, exterior, system] = await Promise.all([
      InteriorModel.find(),
      ExteriorModel.find(),
      SystemModel.find()
    ]);
    res.json({ success: true, data: [...interior, ...exterior, ...system] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
