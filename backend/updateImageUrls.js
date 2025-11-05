// updateImageUrls.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PortfolioVan = require("./models/vanModel"); // ✅ Adjust path if needed

dotenv.config();

const CLOUDFRONT_URL = `https://${process.env.CLOUDFRONT_URL}`; // 🔁 your CloudFront domain
const OLD_PREFIX = `https://${process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME}.s3.amazonaws.com`; // 🔁 your old S3 domain

async function updateImageUrls() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);

    const vans = await PortfolioVan.find();
    console.log(`📦 Found ${vans.length} vans to update`);

    for (const van of vans) {
      let changed = false;

      if (Array.isArray(van.gallery)) {
        const updatedGallery = van.gallery.map((url) =>
          url.startsWith(OLD_PREFIX)
            ? url.replace(OLD_PREFIX, CLOUDFRONT_URL)
            : url
        );

        // ✅ Update only if URLs changed
        if (JSON.stringify(updatedGallery) !== JSON.stringify(van.gallery)) {
          van.gallery = updatedGallery;
          changed = true;
        }
      }

      if (changed) {
        await van.save();
        console.log(`✅ Updated: ${van.slug}`);
      }
    }

    console.log("🎉 All image URLs updated to CloudFront!");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating image URLs:", err);
    process.exit(1);
  }
}

updateImageUrls();
