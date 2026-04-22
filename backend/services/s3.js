const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const AWS = require("aws-sdk");

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
  process.platform === "win32" ? "gltfpack.exe" : "gltfpack"
);

// --------------------- Check if GLB has Draco ---------------------
function isDracoCompressed(fileBuffer) {
  const str = fileBuffer.toString("utf8", 0, 5000);
  return str.includes("KHR_draco_mesh_compression");
}

// --------------------- GLB Compression using gltfpack ---------------------
async function compressGLBWithGltfpack(originalBuffer, originalName) {
  // Check if already Draco compressed
  if (isDracoCompressed(originalBuffer)) {
    const sizeMB = (originalBuffer.length / (1024 * 1024)).toFixed(2);
    console.log(`⚡ Already Draco compressed (${sizeMB} MB): ${originalName}`);
    console.log(`ℹ️ Skipping re-compression (already optimized)`);
    return originalBuffer;
  }

  const inputPath = path.join(__dirname, `temp_${Date.now()}_${originalName}`);
  const outputPath = path.join(__dirname, `compressed_${Date.now()}_${originalName}`);

  fs.writeFileSync(inputPath, originalBuffer);

  return new Promise((resolve) => {
    // Full compression for non-Draco models
    // -cc: Draco mesh compression
    // -tc: Texture compression (KTX2/Basis)
    // -tp: Texture power-of-2 resize
    // -tq 7: Texture quality (1-10)
    // -si 0.7: Simplification (keep 70% vertices)
    const cmd = `"${gltfpackBinary}" -i "${inputPath}" -o "${outputPath}" -cc -tc -tp -tq 7 -si 0.7`;

    console.log(`🔧 Compressing non-Draco model: ${originalName}`);

    exec(cmd, (error, stdout, stderr) => {
      try {
        if (error) {
          console.error(`❌ gltfpack failed: ${stderr || error.message}`);
          console.log(`⚠️ Using original file for: ${originalName}`);
          return resolve(originalBuffer);
        }

        if (!fs.existsSync(outputPath)) {
          console.error(`❌ Output file not created`);
          return resolve(originalBuffer);
        }

        const compressedBuffer = fs.readFileSync(outputPath);
        const oldSize = originalBuffer.length;
        const newSize = compressedBuffer.length;

        if (newSize < oldSize) {
          const oldMB = (oldSize / (1024 * 1024)).toFixed(2);
          const newMB = (newSize / (1024 * 1024)).toFixed(2);
          const savedMB = ((oldSize - newSize) / (1024 * 1024)).toFixed(2);
          const percentage = ((1 - newSize / oldSize) * 100).toFixed(1);
          console.log(`✅ ${originalName}: ${oldMB} MB → ${newMB} MB (Saved ${savedMB} MB / ${percentage}%)`);
          resolve(compressedBuffer);
        } else {
          console.log(`⚠️ ${originalName}: Compression didn't reduce size, using original`);
          resolve(originalBuffer);
        }
      } catch (err) {
        console.error(`❌ Error processing ${originalName}:`, err.message);
        resolve(originalBuffer);
      } finally {
        if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
        if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
      }
    });
  });
}

// --------------------- Upload to S3 ---------------------
async function uploadToS3(fileBuffer, folderName, fileName, mimetype) {
  let uploadBuffer = fileBuffer;
  const isGLB =
    mimetype === "model/gltf-binary" ||
    mimetype === "application/octet-stream" ||
    fileName.toLowerCase().endsWith(".glb");

  try {
    if (isGLB) {
      console.log(`🚀 Processing GLB: ${fileName}`);
      const oldSize = fileBuffer.length;
      uploadBuffer = await compressGLBWithGltfpack(fileBuffer, fileName);
      const newSize = uploadBuffer.length;

      if (oldSize !== newSize) {
        const savedMB = ((oldSize - newSize) / (1024 * 1024)).toFixed(2);
        const percentage = ((1 - newSize / oldSize) * 100).toFixed(1);
        console.log(`📦 Total savings: ${savedMB} MB (${percentage}%)`);
      } else {
        console.log(`📦 No compression applied (already optimized)`);
      }

      mimetype = "model/gltf-binary";
    }
  } catch (err) {
    console.error("❌ Compression failed:", err.message);
    uploadBuffer = fileBuffer;
  }

  const key = `${folderName}/${Date.now()}_${fileName}`;
  const params = {
    Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
    Key: key,
    Body: uploadBuffer,
    ACL: "public-read",
    ContentType: mimetype || "application/octet-stream",
  };

  await s3.upload(params).promise();
  const cdnUrl = `https://${process.env.CLOUDFRONT_URL}/${key}`;
  console.log("✅ Uploaded to S3:", cdnUrl);
  return cdnUrl;
}

// --------------------- Delete from S3 ---------------------
async function deleteFromS3(fileUrl) {
  if (!fileUrl || typeof fileUrl !== 'string') return;

  try {
    // URL parsing taake domain name se farq na paray
    const urlObj = new URL(fileUrl);
    // pathname se shuru ka "/" hatane ke liye
    const key = urlObj.pathname.startsWith('/') ? urlObj.pathname.substring(1) : urlObj.pathname;

    await s3.deleteObject({
      Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise();

    console.log("✅ S3 Cleanup Done:", key);
  } catch (err) {
    console.error("❌ S3 Delete Error:", err.message);
  }
}

module.exports = { uploadToS3, deleteFromS3 };