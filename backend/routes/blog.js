const express = require("express");
const multer = require("multer");
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const Blog = require("../models/testBlog"); // your blog model
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router.post(
  "/", protect, adminOnly,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "gallery", maxCount: 10 }
  ]),
  async (req, res) => {
    try {


      const { title, description, content } = req.body;
      const blocksData = JSON.parse(content || "[]");

      // 🔹 FIX: Create proper mapping from imageField to S3 URL
      const blockImages = req.files["images"] || [];
      const imageFieldToUrlMap = {};

      // Upload all block images and create mapping
      await Promise.all(
        blockImages.map(async (file, index) => {
          try {
            const imageFieldName = `image_${index}`;
            const s3Url = await uploadToS3(
              file.buffer,
              "blogs/blocks",
              `${Date.now()}_${file.originalname}`
            );
            imageFieldToUrlMap[imageFieldName] = s3Url;
            // console.log(`✅ Mapped ${imageFieldName} to ${s3Url}`);
          } catch (error) {
            console.error(`Error uploading image ${index}:`, error);
            imageFieldToUrlMap[`image_${index}`] = null;
          }
        })
      );

      // console.log("Image Mapping:", imageFieldToUrlMap);
      //
      // 🔹 Upload gallery images to S3
      const uploadedGalleryUrls = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(
            file.buffer,
            "blogs/gallery",
            `${Date.now()}_${file.originalname}`
          )
        )
      );

      // 🔹 FIX: Map S3 URLs to blocks using the mapping
      const finalBlocks = blocksData.map(block => {
        if (block.type === "image" && block.imageField) {
          const imageUrl = imageFieldToUrlMap[block.imageField];
          console.log(`Mapping ${block.imageField} to:`, imageUrl);

          if (imageUrl) {
            block.image = imageUrl;
          }
          // Remove temporary field
          delete block.imageField;
        }
        return block;
      });

      // console.log("Final Blocks:", finalBlocks);

      // 🔹 Save blog in MongoDB
      const newBlog = new Blog({
        title,
        description,
        gallery: uploadedGalleryUrls,
        content: finalBlocks
      });

      await newBlog.save();

      res.json({
        success: true,
        message: "✅ Blog uploaded successfully!",
        data: newBlog
      });
    } catch (err) {
      console.error("Error creating blog:", err);
      res.status(500).json({ success: false, message: "Blog upload failed" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    // Define the query
    // If searching, use $text. If not, use an empty object to fetch all.
    const query = search ? { $text: { $search: search } } : {};

    // Execute query
    const blogs = await Blog.find(query)
      // If searching, sort by text relevance score. Otherwise, sort by date.
      .sort(search ? { score: { $meta: "textScore" } } : { createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalBlogs = await Blog.countDocuments(query);

    res.json({
      success: true,
      data: blogs,
      pagination: {
        totalBlogs,
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
      },
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
});
router.get("/blog-links", async (req, res) => {
  try {
    console.log("Fetching blog links...");
    const latestBlogs = await Blog.find({}, "title slug -_id")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: latestBlogs
    });
  } catch (err) {
    console.error("Error fetching latest blogs:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blogs" });
  }
});
router.get("/blog-card", async (req, res) => {
  try {
    console.log("Fetching blog details...");
    const blogDetails = await Blog.find({}, "title description slug gallery -_id")
      .sort({ createdAt: -1 })
      .limit(4);

    res.json({
      success: true,
      data: blogDetails
    });
  } catch (err) {
    console.error("Error fetching blog details:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog details"
    });
  }
});
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params
    const blog = await Blog.findOne({ slug });
    // const blog = await Blog.findById(req.params.slug);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    res.json({ success: true, data: blog });
  } catch (err) {
    console.error("Error fetching blog:", err);
    res.status(500).json({ success: false, message: "Failed to fetch blog" });
  }
});

router.put(
  "/:id", protect, adminOnly,
  upload.fields([
    { name: "images", maxCount: 20 },
    { name: "gallery", maxCount: 10 }
  ]),
  async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog)
        return res.status(404).json({ success: false, message: "Blog not found" });
      // console.log("Blog found:", blog);

      const { title, content, description, deleteGallery = [] } = req.body;
      const blocksData = JSON.parse(content || "[]");

      // console.log("Received blocks data:", blocksData); // Debug log

      const blockImages = req.files["images"] || [];
      const imageFieldToUrlMap = {};

      // Upload new block images
      await Promise.all(
        blockImages.map(async (file, index) => {
          const imageFieldName = `image_${index}`;
          try {
            const s3Url = await uploadToS3(
              file.buffer,
              "blogs/blocks",
              `${Date.now()}_${file.originalname}`
            );
            imageFieldToUrlMap[imageFieldName] = s3Url;
            // console.log(`Uploaded ${imageFieldName}:`, s3Url);
          } catch (err) {
            console.error(`Error uploading block image ${index}:`, err);
            imageFieldToUrlMap[imageFieldName] = null;
          }
        })
      );

      // console.log("Image field mapping:", imageFieldToUrlMap);

      // Upload new gallery images
      const uploadedGalleryUrls = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "blogs/gallery", `${Date.now()}_${file.originalname}`)
        )
      );

      // 🔹 Merge gallery: remove explicitly deleted ones
      let mergedGallery = blog.gallery || [];
      const deleteGalleryArray = Array.isArray(deleteGallery) ? deleteGallery : JSON.parse(deleteGallery || "[]");

      if (deleteGalleryArray.length > 0) {
        mergedGallery = mergedGallery.filter(url => !deleteGalleryArray.includes(url));
      }
      // Append newly uploaded gallery images
      mergedGallery = [...mergedGallery, ...uploadedGalleryUrls];

      // ✅ FIXED: Map S3 URLs to blocks while preserving existing images
      const updatedBlocks = blocksData.map(block => {
        if (block.type === "image") {
          // Case 1: New image uploaded (has imageField)
          if (block.imageField && imageFieldToUrlMap[block.imageField]) {
            console.log(`Setting new image for ${block.imageField}:`, imageFieldToUrlMap[block.imageField]);
            return {
              ...block,
              image: imageFieldToUrlMap[block.imageField]
            };
          }
          // Case 2: Existing image (has image URL)
          else if (block.image) {
            console.log(`Preserving existing image:`, block.image);
            return block; // Keep as is
          }
          // Case 3: Image removed or no image
          else {
            console.log(`No image for block`);
            return {
              ...block,
              image: null
            };
          }
        }
        return block;
      });

      // console.log("Final blocks:", updatedBlocks); // Debug log

      // 🔹 Update blog fields
      blog.title = title;
      blog.description = description;
      blog.content = updatedBlocks;
      blog.gallery = mergedGallery;

      await blog.save();

      res.json({
        success: true,
        message: "✅ Blog updated successfully!",
        data: blog,
      });
    } catch (err) {
      console.error("Error updating blog:", err);
      res.status(500).json({ success: false, message: "Failed to update blog" });
    }
  }
);

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog)
      return res.status(404).json({ success: false, message: "Blog not found" });

    // ✅ Optional: delete all S3 images
    await Promise.all([
      ...blog.content
        .filter(b => b.type === "image" && b.image)
        .map(b => deleteFromS3(b.image)),
      ...(blog.gallery || []).map(g => deleteFromS3(g)),
    ]);

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "✅ Blog deleted successfully!" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ success: false, message: "Failed to delete blog" });
  }
});

module.exports = router;
