const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio')// Adjust path as needed
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3 } = require("../services/s3")
const { protect, adminOnly } = require("../middleware/authMiddleware")



router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      // ✅ Upload gallery images
      const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "portfolio/gallery", file.originalname)
        )
      );

      // ✅ Parse blocksData (captions, etc.)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge images with captions for blocks
      const blocks = await Promise.all(
        blocksData.map(async (block, index) => ({
          caption: block.caption,
          image: req.files["blockImages"]?.[index]
            ? await uploadToS3(
                req.files["blockImages"][index].buffer,
                "portfolio/blocks",
                req.files["blockImages"][index].originalname
              )
            : null,
        }))
      );

      // ✅ Create new PortfolioVan document
      const newPortfolio = new PortfolioVan({
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

        // ✅ Category added here
        category: req.body.category,

        gallery,
        blocks,
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
    let { page = 1, limit = 50 } = req.query;
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



// ✅ 1. Get portfolios by category with pagination
router.get("/category", async (req, res) => {
  try {
    const { categorySlug, page = 1, limit = 10 } = req.query;

    if (!categorySlug) {
      return res
        .status(400)
        .json({ success: false, message: "Category required" });
    }

    // Convert query params to numbers
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // ✅ Get total count first
    const total = await PortfolioVan.countDocuments({ category: categorySlug });

    // ✅ Fetch paginated data
    const portfolios = await PortfolioVan.find({ category: categorySlug })
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 }); // latest first

    if (!portfolios.length) {
      return res
        .status(404)
        .json({ success: false, message: "No portfolios found" });
    }

    // ✅ Response with meta info
    res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      portfolios,
    });
  } catch (err) {
    console.error("Error fetching portfolios:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



// ✅ 2. Filter by category (5 fixed endpoints)
router.get("/flagship-short-van-santa-monica", async (req, res) => {
  try {
    const data = await PortfolioVan.find({
      category: "Flagship Short Van — Santa Monica",
    }).sort({ createdAt: -1 });
    res.json({ success: true, portfolios: data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/flagship-long-van-montreal", async (req, res) => {
  try {
    const data = await PortfolioVan.find({
      category: "Flagship Long Van — Montreal",
    }).sort({ createdAt: -1 });
    res.json({ success: true, portfolios: data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/layouts-solo-couple", async (req, res) => {
  // console.log("hello")
  try {
    const data = await PortfolioVan.find({
      category: "Layouts for Solo & Couple Travelers",
    }).sort({ createdAt: -1 });
    res.json({ success: true, portfolios: data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/layouts-families", async (req, res) => {
  try {
    const data = await PortfolioVan.find({
      category: "Layouts for Families (3–9 People)",
    }).sort({ createdAt: -1 });
    res.json({ success: true, portfolios: data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/portfolio-custom-builds", async (req, res) => {
  try {
    const data = await PortfolioVan.find({
      category: "Portfolio of Custom Builds",
    }).sort({ createdAt: -1 });
    res.json({ success: true, portfolios: data });
  } catch (err) {
    console.error("Error fetching:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.put(
  "/:slug",protect, adminOnly,
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

router.delete("/:slug",protect, adminOnly, async (req, res) => {
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
module.exports = router;