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
      // console.log("Parsed van_listing:", van_listing);
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
    let { category, page = 1, limit = 10, search, model, sit, sleep } = req.query;
console.log(req.query)
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category parameter is required"
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const categoryArray = Array.isArray(category) ? category : [category];

    const filter = {
      category: { $in: categoryArray }
    };

 // SIT filter (string)
if (sit) {
  const sitArray = Array.isArray(sit) ? sit : [sit.trim()];
  filter["van_listing.specifications.capacity.sits"] = { $in: sitArray };
}

// SLEEP filter (string)
if (sleep) {
  const sleepArray = Array.isArray(sleep) ? sleep : [sleep.trim()];
  filter["van_listing.specifications.capacity.sleeps"] = { $in: sleepArray };
}

// MODEL filter (string)
if (model) {
  const modelArray = Array.isArray(model) ? model : [model.trim()];
  filter["van_listing.specifications.make_model"] = { $in: modelArray };
}

if (search) {
  const regex = new RegExp(search.split(" ").join(".*"), "i");

  filter.$or = [
    { "van_listing.title": { $regex: regex } },
    { "van_listing.description": { $regex: regex } }
  ];
}



    // ---- STEP 1: Get filtered vans (pagination) ----
    const total = await PortfolioVan.countDocuments(filter);

    const portfolios = await PortfolioVan.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    // ---- STEP 2: Get ALL vans of this category (without sit/sleep filters) ----
    // Because filters list should show all available options inside this category
    const baseFilter = { category: { $in: categoryArray } };

    const allCategoryVans = await PortfolioVan.find(baseFilter);

    // ---- STEP 3: Extract available sits / sleeps / models ----
    const availableSits = [
      ...new Set(
        allCategoryVans.map((v) => v?.van_listing?.specifications?.capacity?.sits)
      ),
    ].filter(Boolean).sort((a, b) => a - b);

    const availableSleeps = [
      ...new Set(
        allCategoryVans.map((v) => v?.van_listing?.specifications?.capacity?.sleeps)
      ),
    ].filter(Boolean).sort((a, b) => a - b);

    const availableModels = [
      ...new Set(
        allCategoryVans.map((v) => v?.van_listing?.specifications?.make_model)
      ),
    ].filter(Boolean).sort();

    // ---- FINAL RESPONSE ----
    res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: portfolios,

      // Filters available for this category
      filters: {
        sits: availableSits,
        sleeps: availableSleeps,
        models: availableModels,
      }
    });

  } catch (err) {
    console.error("Error fetching portfolios by category:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/wheel-base", async (req, res) => {
  try {
    let { wheelBase, search, size, sit, sleep, model, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const filter = {};

    // -----------------------------------------
    // Wheelbase Filter
    // -----------------------------------------
    if (wheelBase) {
      const wheelArray = Array.isArray(wheelBase)
        ? wheelBase.map((i) => i.trim())
        : [wheelBase.trim()];

      filter["van_listing.specifications.wheelbase"] = { $in: wheelArray };
    }

    // -----------------------------------------
    // Size Filter
    // -----------------------------------------
    if (size) {
      const sizeArray = Array.isArray(size)
        ? size.map((i) => i.trim())
        : [size.trim()];

      filter["van_listing.specifications.size"] = { $in: sizeArray };
    }

    // -----------------------------------------
    // Sit Filter (STRING version)
    // -----------------------------------------
    if (sit) {
      const sitArray = Array.isArray(sit)
        ? sit.map((i) => i.trim())
        : [sit.trim()];

      filter["van_listing.specifications.capacity.sits"] = { $in: sitArray };
    }

    // -----------------------------------------
    // Sleep Filter (STRING version)
    // -----------------------------------------
    if (sleep) {
      const sleepArray = Array.isArray(sleep)
        ? sleep.map((i) => i.trim())
        : [sleep.trim()];

      filter["van_listing.specifications.capacity.sleeps"] = { $in: sleepArray };
    }

    // -----------------------------------------
    // Model Filter (STRING version)
    // -----------------------------------------
    if (model) {
      const modelArray = Array.isArray(model)
        ? model.map((i) => i.trim())
        : [model.trim()];

      filter["van_listing.specifications.make_model"] = { $in: modelArray };
    }

    // -----------------------------------------
    // Search Filter (title + description)
    // -----------------------------------------
    if (search) {
      const regex = new RegExp(search.split(" ").join(".*"), "i");

      filter.$or = [
        { "van_listing.title": { $regex: regex } },
        { "van_listing.description": { $regex: regex } }
      ];
    }

    // -----------------------------------------
    // Fetch Vans
    // -----------------------------------------
    const total = await PortfolioVan.countDocuments(filter);

    const vans = await PortfolioVan.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    // -----------------------------------------
    // Prepare Dropdown Filters
    // -----------------------------------------
    const allVans = await PortfolioVan.find({});

    const sits = [...new Set(allVans.map(v => v?.van_listing?.specifications?.capacity?.sits).filter(Boolean))];
    const sleeps = [...new Set(allVans.map(v => v?.van_listing?.specifications?.capacity?.sleeps).filter(Boolean))];
    const models = [...new Set(allVans.map(v => v?.van_listing?.specifications?.make_model).filter(Boolean))];

    res.json({
      success: true,
      data: vans,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      filters: {
        sits,
        sleeps,
        models
      }
    });

  } catch (err) {
    console.error("Error fetching vans by wheelbase:", err);
    res.status(500).json({ success: false, message: "Failed to fetch vans" });
  }
});

router.get("/navCat", async (req, res) => {
  try {
    const categories = await PortfolioVan.distinct("category");

    res.json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.get("/navWheel-bases", async (req, res) => {
  try {
    // Extract unique wheelbase values from nested field
    const wheelBases = await PortfolioVan.distinct(
      "van_listing.specifications.wheelbase"
    );

    res.json({
      success: true,
      count: wheelBases.length,
      data: wheelBases
    });
  } catch (err) {
    console.error("Error fetching wheel bases:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
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