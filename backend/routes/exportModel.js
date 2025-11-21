const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadToS3 } = require("../services/s3"); // make sure path is correct

const upload = multer();
const router = express.Router();

// POST /model
// POST /model
router.post("/model", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Auto-correct GLB mimetype
    let mimetype = file.mimetype;
    let fileName = file.originalname;

    if (file.originalname.toLowerCase().endsWith(".glb")) {
      mimetype = "model/gltf-binary";
    }

    const folderName = "export-models";

    const uploadName = `${uuidv4()}-${Date.now()}${path.extname(fileName)}`;

    // Upload to S3 (auto GLB compression included)
    const fileUrl = await uploadToS3(
      file.buffer,
      folderName,
      uploadName,
      mimetype
    );

    res.json({
      success: true,
      id: uploadName,
      url: fileUrl,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
