const express = require("express");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const { uploadToS3 } = require("../services/s3"); // make sure path is correct

const upload = multer();
const router = express.Router();

router.post("/model", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const folderName = "export-models";
    const fileName = `${uuidv4()}-${Date.now()}.glb`;

    // FIX: force proper mimetype
    let mimetype = file.mimetype;
    if (file.originalname.endsWith(".glb")) {
      mimetype = "model/gltf-binary";
    }

    const fileUrl = await uploadToS3(file.buffer, folderName, fileName, mimetype);

    res.json({ id: fileName, url: fileUrl });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});


module.exports = router;
