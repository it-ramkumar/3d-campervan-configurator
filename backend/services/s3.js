const AWS = require("aws-sdk");
const sharp = require("sharp");
const { WebIO } = require("@gltf-transform/core");
const {
  draco,
  prune,
  quantize,
  weld,
  textureCompress
} = require("@gltf-transform/functions");
const { ALL_EXTENSIONS } = require("@gltf-transform/extensions");
const draco3d = require("draco3dgltf");

AWS.config.update({
  accessKeyId: process.env.VITE_REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.VITE_REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.VITE_REACT_APP_AWS_REGION,
});

const s3 = new AWS.S3();

// ✅ Maximum Compression (No Meshoptimizer)
async function compressGLB(fileBuffer) {
  try {
    console.log("🛠️ Starting Advanced GLB Compression...");

    const decoder = await draco3d.createDecoderModule();
    const encoder = await draco3d.createEncoderModule();

    const io = new WebIO()
      .registerExtensions(ALL_EXTENSIONS)
      .registerDependencies({
        "draco3d.encoder": encoder,
        "draco3d.decoder": decoder,
      });

    const document = await io.readBinary(new Uint8Array(fileBuffer));

    const originalSize = (fileBuffer.length / (1024 * 1024)).toFixed(2);
    console.log("📦 Original size:", originalSize, "MB");

    await document.transform(

      // Safe vertex weld (not aggressive)
      weld({ tolerance: 0.0005 }),

      prune(),

      // 🔥 Texture Optimization (BIG SIZE REDUCTION)
      textureCompress({
        encoder: sharp,
        targetFormat: "webp",
        quality: 75,
        resize: [2048, 2048], // Resize only if larger
      }),

      // Safe quantization (not 8-bit extreme)
      quantize({
        quantizePosition: 14,
        quantizeNormal: 10,
        quantizeTexcoord: 12,
        quantizeColor: 8,
      }),

      // Maximum Draco compression
      draco({
        method: "edgebreaker",
        encodeSpeed: 0,
        decodeSpeed: 10,
      }),

      prune()
    );

    const outBuffer = await io.writeBinary(document);
    const compressed = Buffer.from(outBuffer);

    const newSize = (compressed.length / (1024 * 1024)).toFixed(2);
    const savedMB = ((fileBuffer.length - compressed.length) / (1024 * 1024)).toFixed(2);
    const savings = ((1 - compressed.length / fileBuffer.length) * 100).toFixed(1);

    console.log(`✅ COMPRESSED: ${originalSize}MB → ${newSize}MB (${savings}%)`);
    console.log(`💾 SAVED: ${savedMB} MB`);

    return compressed;

  } catch (err) {
    console.error("❌ Compression Error:", err.message);
    console.log("⚠️ Uploading original file");
    return fileBuffer;
  }
}
// ✅ S3 Upload
async function uploadToS3(fileBuffer, folderName, fileName, mimetype) {
  let uploadBuffer = fileBuffer;

  const isImage = mimetype?.startsWith("image/");
  const isGLB =
    mimetype === "model/gltf-binary" ||
    mimetype === "application/octet-stream" ||
    fileName.toLowerCase().endsWith(".glb");

  try {
    if (isImage) {
      console.log("🖼️ Compressing image:", fileName);
      uploadBuffer = await sharp(fileBuffer)
        .resize({ width: 1200, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toBuffer();

      fileName = fileName.replace(/\.[^/.]+$/, ".webp");
      mimetype = "image/webp";
      console.log("✅ Image converted to WebP");

    } else if (isGLB) {
      console.log(`🚀 Compressing GLB: ${fileName}`);
      const oldSize = fileBuffer.length;

      uploadBuffer = await compressGLB(fileBuffer);

      const newSize = uploadBuffer.length;
      const savedMB = ((oldSize - newSize) / (1024 * 1024)).toFixed(2);
      const percentage = ((1 - newSize / oldSize) * 100).toFixed(1);

      console.log(`✅ GLB compressed. Saved: ${savedMB} MB (${percentage}%)`);

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

// ✅ S3 Delete
const deleteFromS3 = async (fileUrl) => {
  if (!fileUrl) return;

  try {
    let key;

    if (fileUrl.includes(".amazonaws.com/")) {
      key = fileUrl.split(".amazonaws.com/")[1];
    } else if (fileUrl.includes(process.env.CLOUDFRONT_URL)) {
      key = fileUrl.split(`${process.env.CLOUDFRONT_URL}/`)[1];
    }

    if (key && key.includes("?")) {
      key = key.split("?")[0];
    }

    if (!key) {
      console.warn("⚠️ Could not extract S3 key:", fileUrl);
      return;
    }

    await s3.deleteObject({
      Bucket: process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME,
      Key: key,
    }).promise();

    console.log("✅ Deleted from S3:", key);
  } catch (err) {
    console.error("❌ Delete failed:", err);
  }
};

module.exports = { uploadToS3, deleteFromS3 };