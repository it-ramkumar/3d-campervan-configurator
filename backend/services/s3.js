const AWS = require("aws-sdk");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { exec } = require("child_process");

AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

// --------------------- Native gltfpack path ---------------------
const gltfpackBinary = path.join(
  __dirname,
  "..",
  "bin",
  os.platform() === "win32" ? "gltfpack.exe" : "gltfpack"
);

// --------------------- GLB Compression ---------------------
async function compressGLB(originalBuffer, originalName) {
  const inputPath = path.join(__dirname, `temp_${Date.now()}_${originalName}`);
  const outputPath = path.join(__dirname, `compressed_${Date.now()}_${originalName}`);

  fs.writeFileSync(inputPath, originalBuffer);

  return new Promise((resolve) => {
    const cmd = `"${gltfpackBinary}" -i "${inputPath}" -o "${outputPath}" -cc -tc -si 0.8`;

    exec(cmd, (error) => {
      try {
        if (error) {
          // fallback: return original buffer if compression fails
          return resolve(originalBuffer);
        }
        const compressedBuffer = fs.readFileSync(outputPath);
        resolve(compressedBuffer);
      } finally {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }
    });
  });
}

// --------------------- S3 Upload ---------------------
async function uploadToS3(fileBuffer, folderName, fileName, mimetype) {
  let uploadBuffer = fileBuffer;

  try {
    if (mimetype?.startsWith("image/")) {
      uploadBuffer = await sharp(fileBuffer)
        .resize({ width: 1200 })
        .webp({ quality: 80 }) // ✅ Convert to WebP for best compression
        .toBuffer();
      console.log("🖼️ Image converted to WebP and compressed before upload.");

      // Change filename extension to .webp
      fileName = fileName.replace(/\.[^/.]+$/, ".webp");
      mimetype = "image/webp";
    } else if (mimetype === "model/gltf-binary" || fileName.endsWith(".glb")) {
      uploadBuffer = await compressGLB(fileBuffer, fileName);
      console.log("🪶 GLB uploaded successfully (mesh + textures compressed).");
    }
  } catch (err) {
    console.warn("⚠️ Compression skipped:", err.message);
  }

  const key = `${folderName}/${Date.now()}_${fileName}`;

  const params = {
    Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
    Key: key,
    Body: uploadBuffer,
    ACL: "public-read",
    ContentType: mimetype || "application/octet-stream",
  };

  const data = await s3.upload(params).promise();

  // ✅ Return CloudFront URL instead of S3
  const cdnUrl = `https://${process.env.CLOUDFRONT_URL}/${key}`;
  return cdnUrl;
}


// --------------------- S3 Delete ---------------------
const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    const key = fileUrl.split(".amazonaws.com/")[1];
    if (!key) return;

    await s3.deleteObject({
      Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise();
  } catch (err) {
    console.error("❌ Failed to delete from S3:", err);
  }
};

module.exports = { uploadToS3, deleteFromS3 };
