// updateBlogImageUrls.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Blog = require("./models/testBlog"); // ✅ adjust path if needed

dotenv.config();

const CLOUDFRONT_URL = `https://${process.env.CLOUDFRONT_URL}`; // your CloudFront domain
const OLD_PREFIX = `https://${process.env.VITE_REACT_APP_AWS_S3_BUCKET_NAME}.s3.amazonaws.com`; // old S3 domain

async function updateBlogImageUrls() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);

    const blogs = await Blog.find();
    console.log(`📦 Found ${blogs.length} blogs to update`);

    for (const blog of blogs) {
      let changed = false;

      // ✅ 1. Update gallery URLs
      if (Array.isArray(blog.gallery)) {
        const updatedGallery = blog.gallery.map((url) =>
          url.startsWith(OLD_PREFIX)
            ? url.replace(OLD_PREFIX, CLOUDFRONT_URL)
            : url
        );

        if (JSON.stringify(updatedGallery) !== JSON.stringify(blog.gallery)) {
          blog.gallery = updatedGallery;
          changed = true;
        }
      }

      // ✅ 2. Update block image URLs inside content
      if (Array.isArray(blog.content)) {
        const updatedContent = blog.content.map((block) => {
          if (block.type === "image" && block.image && typeof block.image === "string") {
            if (block.image.startsWith(OLD_PREFIX)) {
              const newUrl = block.image.replace(OLD_PREFIX, CLOUDFRONT_URL);
              return { ...block, image: newUrl };
            }
          }
          return block;
        });

        if (JSON.stringify(updatedContent) !== JSON.stringify(blog.content)) {
          blog.content = updatedContent;
          changed = true;
        }
      }

      if (changed) {
        await blog.save();
        console.log(`✅ Updated: ${blog.title}`);
      }
    }

    console.log("🎉 All blog image URLs updated to CloudFront!");
    process.exit();
  } catch (err) {
    console.error("❌ Error updating blog image URLs:", err);
    process.exit(1);
  }
}

updateBlogImageUrls();
