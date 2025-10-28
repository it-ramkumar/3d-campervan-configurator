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
    Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME, // ✅ same env var
    Key: `${folderName}/${Date.now()}_${fileName}`,
    Body: uploadBuffer,
    ACL: "public-read",
    ContentType: mimetype || "application/octet-stream",
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    // ✅ Extract the key (path after .amazonaws.com/)
    const key = fileUrl.split(".amazonaws.com/")[1];

    if (!key) {
      console.error("❌ Could not extract S3 key from URL:", fileUrl);
      return;
    }

    const params = {
      Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
      Key: key,
    };

    // 🗑️ Delete the object
    await s3.deleteObject(params).promise();
    // console.log("✅ Successfully deleted from S3:", key);
  } catch (err) {
    console.error("❌ Failed to delete from S3:", err);
  }
};

module.exports = { uploadToS3, deleteFromS3 };
