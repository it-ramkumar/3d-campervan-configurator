const AWS = require("aws-sdk");
const sharp = require("sharp");

AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

async function uploadToS3(fileBuffer, folderName, fileName, mimetype) {
  let uploadBuffer = fileBuffer;

  // ✅ Compress only if it’s an image
  if (mimetype && mimetype.startsWith("image/")) {
    try {
      uploadBuffer = await sharp(fileBuffer)
        .resize({ width: 1200 })
        .jpeg({ quality: 80 })
        .toBuffer();
    } catch (err) {
      console.warn("⚠️ Image compression skipped:", err.message);
    }
  }

  const params = {
    Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
    Key: `${folderName}/${Date.now()}_${fileName}`,
    Body: uploadBuffer,
    ACL: "public-read",
    ContentType: mimetype || "application/octet-stream",
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

module.exports = { uploadToS3 };
