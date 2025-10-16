const AWS = require("aws-sdk");
const sharp = require("sharp");

// AWS config
AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

// Generic upload function with compression
async function uploadToS3(fileBuffer, folderName, fileName) {
  const compressedBuffer = await sharp(fileBuffer)
    .resize({ width: 1200 })    // Max width
    .jpeg({ quality: 80 })      // Compression
    .toBuffer();

  const params = {
    Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
    Key: `${folderName}/${Date.now()}_${fileName}`,
    Body: compressedBuffer,
    ACL: "public-read",
    ContentType: "image/jpeg",
  };

  const data = await s3.upload(params).promise();
  return data.Location; // Returns S3 URL
}

module.exports = { uploadToS3 };
