const express = require("express");
const AWS = require("aws-sdk");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const upload = multer();
const router = express.Router();

// env vars
const BUCKET = process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME;
const REGION = process.env.VITE_REACT_APP_AWS_REGION;
const ACCESS_KEY = process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY;


AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION,
});

const s3 = new AWS.S3({ apiVersion: "2012-10-17" });

router.post("/model", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const fileKey = `${uuidv4()}-${Date.now()}.glb`;

    const params = {
      Bucket: BUCKET,
      Key: fileKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3.upload(params).promise();

    // ✅ AWS v2 signed URL
    const url = s3.getSignedUrl("getObject", {
      Bucket: BUCKET,
      Key: fileKey,
      Expires: 60 * 60 * 24 * 7, // 7 days
    });

    res.json({ id: fileKey, url });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
