const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio')// Adjust path as needed
const multer = require("multer")
// const { portfolios } = require("../services/s3")
// const upload = multer({ storage: portfolios });
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3 } = require("../services/s3")


router.post(
  "/",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      // ✅ Extract gallery
const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "portfolio/gallery", file.originalname)
        )
      );
      // ✅ Parse blocksData from body (captions etc.)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge images with captions
const blocks = await Promise.all(
  blocksData.map(async (block, index) => ({
    caption: block.caption, // <-- use 'block', not 'b'
    image: req.files["blockImages"]?.[index]
      ? await uploadToS3(
          req.files["blockImages"][index].buffer,
          "portfolio/blocks",
          req.files["blockImages"][index].originalname
        )
      : null,
  }))
);

      // ✅ Create new portfolioVan doc
      const newPortfolio = new PortfolioVan({
        // slug: req.body.slug, // optional // ya title se auto generate hoga
        van_listing: {
          title: req.body.title,
          description: req.body.description,
          subtitle: req.body.subtitle,
          price: req.body.price,
          specifications: req.body.specifications
            ? JSON.parse(req.body.specifications)
            : undefined,
        },
        sold: req.body.sold || false,
        gallery,
        blocks, // ✅ ab schema ke hisaab se save hoga
        detailed_features: req.body.detailed_features
          ? JSON.parse(req.body.detailed_features)
          : [],
        media: req.body.media ? JSON.parse(req.body.media) : {},
      });

      await newPortfolio.save();

      res.json({
        success: true,
        message: "Portfolio van created successfully",
        data: newPortfolio,
      });
    } catch (err) {
      console.error("Error creating portfolio:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);

// GET /api/portfolioVans?wheelbase=144
router.get("/wheelbase", async (req, res) => {
  try {
    const { wheelbase } = req.query; // frontend se aayega, e.g., 144 ya 170
    const filter = {};
    if (wheelbase) {
      filter["van_listing.specifications.wheelbase"] = Number(wheelbase);
    }

    const vans = await PortfolioVan.find(filter);

    res.json({
      success: true,
      data: vans,
    });
  } catch (err) {
    console.error("Error fetching vans:", err);
    res.status(500).json({ success: false, message: "Failed to fetch vans" });
  }
});


// GET /api/portfolio?page=1&limit=10
router.get("/", async (req, res) => {
  try {
    // query params (default values)
    let { page = 1, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);

    // total documents
    const total = await PortfolioVan.countDocuments();

    // fetch data with skip + limit
    const vans = await PortfolioVan.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest vans first (optional)

    res.json({
      success: true,
      total,                // total records
      page,                 // current page
      pages: Math.ceil(total / limit), // total pages
      limit,                // per page limit
      data: vans,           // actual data
    });
  } catch (err) {
    console.error("Error fetching vans with pagination:", err);
    res.status(500).json({ success: false, message: "Failed to fetch vans" });
  }
});

/**
 * READ (GET one by slug)
 */
router.get("/:slug", async (req, res) => {
  try {
    const portfolio = await PortfolioVan.findOne({ slug: req.params.slug });
    if (!portfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }
    res.json({ success: true, data: portfolio });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

/**
 * UPDATE (PUT by slug)
 */
router.put(
  "/:slug",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "portfolio/gallery", file.originalname)
        )
      );
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      const blocks = await Promise.all(
  blocksData.map(async (block, index) => ({
    caption: block.caption, // <-- use 'block', not 'b'
    image: req.files["blockImages"]?.[index]
      ? await uploadToS3(
          req.files["blockImages"][index].buffer,
          "portfolio/blocks",
          req.files["blockImages"][index].originalname
        )
      : null,
  }))
);

     const updatedPortfolio = await PortfolioVan.findOneAndUpdate(
  { slug: req.body.slug || req.params.slug }, // filter
  {
    $set: {
      van_listing: {
        title: req.body.title,
        description: req.body.description,
        subtitle: req.body.subtitle,
        price: req.body.price,
        specifications: req.body.specifications
          ? JSON.parse(req.body.specifications)
          : undefined,
      },
      sold: req.body.sold || false,
      blocks,
      detailed_features: req.body.detailed_features
        ? JSON.parse(req.body.detailed_features)
        : [],
      media: req.body.media ? JSON.parse(req.body.media) : {},
    },
    ...(gallery.length && { $push: { gallery: { $each: gallery } } }), // ✅ gallery ko push karna
  },
  { new: true, runValidators: true }
);


      if (!updatedPortfolio) {
        return res
          .status(404)
          .json({ success: false, message: "Portfolio not found" });
      }

      res.json({
        success: true,
        message: "Portfolio van updated successfully",
        data: updatedPortfolio,
      });
    } catch (err) {
      console.error("Error updating portfolio:", err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);

/**
 * DELETE (by slug)
 */
router.delete("/:slug", async (req, res) => {
  try {
    const deletedPortfolio = await PortfolioVan.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedPortfolio) {
      return res
        .status(404)
        .json({ success: false, message: "Portfolio not found" });
    }
    res.json({
      success: true,
      message: "Portfolio van deleted successfully",
      data: deletedPortfolio,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});


module.exports = router;