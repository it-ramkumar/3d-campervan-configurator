const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3,deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      // Parse JSON fields
      const van_listing = JSON.parse(req.body.van_listing || "{}");
      console.log("Parsed van_listing:", van_listing);
      const detailed_features = JSON.parse(req.body.detailed_features || "[]");
      const media = JSON.parse(req.body.media || "[]"); // ✅ Simple string array for URLs
      const sold = req.body.sold === "true";

      if (!van_listing || !van_listing.title) {
        return res.status(400).json({
          success: false,
          message: "Van listing with title is required"
        });
      }

      // Generate slug
      let slug = req.body.slug || await PortfolioVan.generateSlug(van_listing.title);

      // Check if slug exists
      const existingVan = await PortfolioVan.findOne({ slug });
      if (existingVan) {
        return res.status(409).json({
          success: false,
          message: "Van with this slug already exists"
        });
      }

      // Upload gallery images
      const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "portfolio/gallery", file.originalname)
        )
      );

      // ✅ Multi-category support
      let category = req.body.category;
      if (typeof category === "string") {
        try {
          category = JSON.parse(category); // Convert JSON string to array
        } catch (e) {
          category = [category]; // Single string fallback
        }
      }

      // Validate category array
      if (!Array.isArray(category) || category.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one category is required"
        });
      }

      const newPortfolio = new PortfolioVan({
        slug,
        van_listing: {
          ...van_listing,
          price: van_listing.price ? String(van_listing.price) : null,
          specifications: van_listing.specifications ? {
            ...van_listing.specifications,
            capacity: van_listing.specifications.capacity || {}
          } : undefined,
        },
        sold,
        category,
        gallery,
        detailed_features,
        media,
      });

      await newPortfolio.save();

      res.status(201).json({
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


router.get("/", async (req, res) => {
  console.log("Fetching portfolio vans with pagination and filters");
  try {
    let { page = 1, limit = 50, category, sold, search } = req.query;
    page = Number(page);
    limit = Number(limit);

    const filter = {};

    if (category) filter.category = category;
    if (sold !== undefined) filter.sold = sold === "true";

    // ✅ Search by nested title
    if (search && search.trim() !== "") {
      const regex = new RegExp(search, "i");
      filter["van_listing.title"] = regex;
    }

    const total = await PortfolioVan.countDocuments(filter);

    const vans = await PortfolioVan.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });


    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      limit,
      data: vans,
    });
  } catch (err) {
    console.error("Error fetching vans with pagination:", err);
    res.status(500).json({ success: false, message: "Failed to fetch vans" });
  }
});

router.get("/category", async (req, res) => {
  try {
    let { category, page = 1, limit = 10 } = req.query;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category parameter is required"
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Make category an array (for multiple selections)
    const categoryArray = Array.isArray(category) ? category : [category];

    // Get total count
    const total = await PortfolioVan.countDocuments({
      category: { $in: categoryArray }
    });

    // Fetch paginated data
    const portfolios = await PortfolioVan.find({
      category: { $in: categoryArray }
    })
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: portfolios,
    });
  } catch (err) {
    console.error("Error fetching portfolios by category:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// GET by wheelbase filter
router.get("/wheelbase", async (req, res) => {
  try {
    const { wheelbase } = req.query;
    const filter = {};

    if (wheelbase) {
      filter["van_listing.specifications.wheelbase"] = wheelbase;
    }

    const vans = await PortfolioVan.find(filter);

    res.json({
      success: true,
      data: vans,
    });
  } catch (err) {
    console.error("Error fetching vans by wheelbase:", err);
    res.status(500).json({ success: false, message: "Failed to fetch vans" });
  }
});

// UPDATE portfolio van by slug
router.put(
  "/:slug",
  protect,
  adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { slug } = req.params;

      const portfolio = await PortfolioVan.findOne({ slug });
      if (!portfolio) {
        return res.status(404).json({
          success: false,
          message: "Portfolio not found"
        });
      }

      // Parse JSON fields
      const van_listing = JSON.parse(req.body.van_listing || JSON.stringify(portfolio.van_listing));
      const detailed_features = JSON.parse(req.body.detailed_features || JSON.stringify(portfolio.detailed_features));
      const media = JSON.parse(req.body.media || JSON.stringify(portfolio.media)); // ✅ Simple URLs
      const sold = req.body.sold !== undefined ? req.body.sold === "true" : portfolio.sold;

      // ✅ Multi-category support
      let category = req.body.category || portfolio.category;
      if (typeof category === "string") {
        try {
          category = JSON.parse(category); // Convert JSON string to array
        } catch (e) {
          category = [category]; // Single string fallback
        }
      }

      // Validate category array
      if (!Array.isArray(category) || category.length === 0) {
        return res.status(400).json({
          success: false,
          message: "At least one category is required"
        });
      }

      // Handle gallery images (append to existing)
      const existingGallery = portfolio.gallery || [];
      const newGallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, "portfolio/gallery", file.originalname)
        )
      );
      const updatedGallery = [...existingGallery, ...newGallery];

      // Update portfolio
      portfolio.van_listing = {
        ...portfolio.van_listing,
        ...van_listing,
        price: van_listing.price ? String(van_listing.price) : portfolio.van_listing.price,
        specifications: van_listing.specifications ? {
          ...portfolio.van_listing.specifications,
          ...van_listing.specifications,
          capacity: van_listing.specifications.capacity ? {
            ...portfolio.van_listing.specifications?.capacity,
            ...van_listing.specifications.capacity
          } : portfolio.van_listing.specifications?.capacity
        } : portfolio.van_listing.specifications
      };

      portfolio.category = category; // ✅ Updated for multi-category array
      portfolio.sold = sold;
      portfolio.gallery = updatedGallery;
      portfolio.detailed_features = detailed_features;
      portfolio.media = media; // ✅ Direct assignment of URL strings

      // If title changed, generate new slug
      if (van_listing.title && van_listing.title !== portfolio.van_listing.title) {
        portfolio.slug = await PortfolioVan.generateSlug(van_listing.title);
      }

      const updatedPortfolio = await portfolio.save();

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

// DELETE portfolio van by slug
router.delete("/:slug", protect, adminOnly, async (req, res) => {
  try {
    // 1️⃣ Find the portfolio first
    const portfolio = await PortfolioVan.findOne({ slug: req.params.slug });
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // 2️⃣ Delete gallery images from S3
    if (portfolio.gallery && portfolio.gallery.length > 0) {
      await Promise.all(portfolio.gallery.map((url) => deleteFromS3(url)));
      console.log(`🧹 Deleted ${portfolio.gallery.length} gallery images from S3`);
    }

    // 3️⃣ Delete portfolio document from MongoDB
    const deletedPortfolio = await PortfolioVan.findOneAndDelete({
      slug: req.params.slug,
    });

    res.json({
      success: true,
      message: "Portfolio van deleted successfully",
      data: deletedPortfolio,
    });
  } catch (err) {
    console.error("Error deleting portfolio:", err);
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// GET single portfolio van by slug
router.get("/:slug", async (req, res) => {
  try {
    const portfolio = await PortfolioVan.findOne({ slug: req.params.slug });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found"
      });
    }

    res.json({
      success: true,
      data: portfolio
    });
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

module.exports = router;