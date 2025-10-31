const AWS = require("aws-sdk");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");


AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();


async function compressGLB(originalBuffer, originalName) {
  const inputPath = path.join(__dirname, `temp_${Date.now()}_${originalName}`);
  const outputPath = path.join(__dirname, `compressed_${Date.now()}_${originalName}`);

  fs.writeFileSync(inputPath, originalBuffer);

  return new Promise((resolve, reject) => {
    const cmd = `npx gltfpack -i "${inputPath}" -o "${outputPath}" -cc -tc -si 0.8`;
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ GLB compression failed:", stderr);
        fs.unlinkSync(inputPath);
        return reject(error);
      }

      const compressedBuffer = fs.readFileSync(outputPath);
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);

      resolve(compressedBuffer);
    });
  });
}


async function uploadToS3(fileBuffer, folderName, fileName, mimetype) {
  let uploadBuffer = fileBuffer;

  try {
    if (mimetype?.startsWith("image/")) {
      // ✅ Compress image
      uploadBuffer = await sharp(fileBuffer)
        .resize({ width: 1200 })
        .jpeg({ quality: 80 })
        .toBuffer();
      console.log("🖼️ Image compressed before upload.");
    } else if (mimetype === "model/gltf-binary" || fileName.endsWith(".glb")) {
      // ✅ Compress GLB
      uploadBuffer = await compressGLB(fileBuffer, fileName);
      console.log("🪶 GLB model compressed before upload.");
    }
  } catch (err) {
    console.warn("⚠️ Compression skipped:", err.message);
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
