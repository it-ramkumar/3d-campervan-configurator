// const express = require("express");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");
// const { uploadToS3 } = require("../services/s3"); // make sure path is correct
// const path = require("path");

// const upload = multer();
// const router = express.Router();

// // POST /model
// router.post("/model", upload.single("file"), async (req, res) => {
//   try {
//     console.log("➡️ /model route hit");

//     const file = req.file;

//     if (!file) {
//       console.log("❌ No file uploaded");
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     console.log("📄 File received:", file.originalname, file.mimetype, file.size);

//     // Auto-correct GLB mimetype
//     let mimetype = file.mimetype;
//     let fileName = file.originalname;

//     if (file.originalname.toLowerCase().endsWith(".glb")) {
//       mimetype = "model/gltf-binary";
//       console.log("🪶 GLB file detected, mimetype set to model/gltf-binary");
//     }

//     const folderName = "export-models";
//     const uploadName = `${uuidv4()}-${Date.now()}${path.extname(fileName)}`;
//     // console.log("🔑 Uploading as:", uploadName);

//     // Upload to S3 (auto GLB compression included)
//     const fileUrl = await uploadToS3(file.buffer, folderName, uploadName, mimetype);

//     // console.log("✅ Upload successful:", fileUrl);

//     res.json({
//       success: true,
//       id: uploadName,
//       url: fileUrl,
//     });
//   } catch (err) {
//     console.error("❌ Upload Error:", err);
//     res.status(500).json({ error: "Upload failed" });
//   }
// });

// module.exports = router;
