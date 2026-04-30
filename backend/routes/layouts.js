const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const { uploadToS3, deleteFromS3 } = require("../services/s3");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  "/",
  protect,
  adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "rendering", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const van_listing = JSON.parse(req.body.van_listing || "{}");
      const detailed_features = JSON.parse(req.body.detailed_features || "[]");
      const media = JSON.parse(req.body.media || "[]");
      const sold = req.body.sold === "true";

      if (!van_listing || !van_listing.title) {
        return res.status(400).json({
          success: false,
          message: "Van listing with title is required"
        });
      }

      // 1. Generate slug pehle hi karlein taake folder name mil jaye
      let slug = req.body.slug || await PortfolioVan.generateSlug(van_listing.title);

      const existingVan = await PortfolioVan.findOne({ slug });
      if (existingVan) {
        return res.status(409).json({
          success: false,
          message: "Van with this slug already exists"
        });
      }

      // 2. Folder Path Define Karein
      // Ab path hoga: portfolio/slug-name/gallery/...
      const galleryPath = `layouts/${slug}/gallery`;
      const renderingPath = `layouts/${slug}/renderings`;

      // 3. Upload gallery images to specific folder
      const gallery = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, galleryPath, file.originalname)
        )
      );

      // 4. Upload rendering images to specific folder
      const rendering = await Promise.all(
        (req.files["rendering"] || []).map(file =>
          uploadToS3(file.buffer, renderingPath, file.originalname)
        )
      );

      // Category logic
      let category = req.body.category;
      if (typeof category === "string") {
        try {
          category = JSON.parse(category);
        } catch (e) {
          category = [category];
        }
      }

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
        rendering,
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
    let {
      page = 1,
      limit = 12,
      category,
      wheelbase,
      sold,
      search,
      model,
      sit,
      sleep,
      bedType,
      bathroomType
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;


    const filter = {};
   if (category) {
  const categories = category.split(",").map((c) => c.trim());

  filter["category"] = { $in: categories };
}
    if (sold !== undefined) filter.sold = sold === "true";
    if (wheelbase) {
      filter["van_listing.specifications.wheelbase"] = wheelbase;
    }
    if (sit) filter["van_listing.specifications.capacity.sits"] = { $in: [sit] };
    if (sleep) filter["van_listing.specifications.capacity.sleeps"] = { $in: [sleep] };
    if (model) filter["van_listing.specifications.make_model"] = { $in: [model] };
    if (bedType) filter["van_listing.bedType"] = { $in: [bedType] };
    if (bathroomType) filter["van_listing.bathroomType"] = { $in: [bathroomType] };

    if (search && search.trim() !== "") {
      const regex = new RegExp(search.split(" ").join(".*"), "i");
      filter.$or = [
        { "van_listing.title": { $regex: regex } },
        { "van_listing.description": { $regex: regex } }
      ];
    }

    // 🔥 SINGLE AGGREGATION (data + filters)
    const result = await PortfolioVan.aggregate([
      { $match: filter },

      {
        $facet: {
          data: [
            {
              $addFields: {
                hasRendering: {
                  $gt: [{ $size: { $ifNull: ["$rendering", []] } }, 0],
                },
              },
            },
            {
              $sort: { hasRendering: -1, createdAt: -1 },
            },
            { $skip: skip },
            { $limit: limitNum },
          ],

          totalCount: [
            { $count: "total" }
          ],

         filters: [
  { $unwind: { path: "$category", preserveNullAndEmptyArrays: true } },
  {
    $group: {
      _id: null,
      category: { $addToSet: "$category" },
      wheelbase: { $addToSet: "$van_listing.specifications.wheelbase" },
      sits: { $addToSet: "$van_listing.specifications.capacity.sits" },
      sleeps: { $addToSet: "$van_listing.specifications.capacity.sleeps" },
      models: { $addToSet: "$van_listing.specifications.make_model" },
      bedType: { $addToSet: "$van_listing.bedType" },
      bathroomType: { $addToSet: "$van_listing.bathroomType" },
    }
  }
]
        }
      }
    ]);

    const data = result[0].data;
    const total = result[0].totalCount[0]?.total || 0;
    const filtersRaw = result[0].filters[0] || {};

    const filters = {
      category: (filtersRaw.category || []).filter(Boolean).sort(),
      wheelbase: (filtersRaw.wheelbase || []).filter(Boolean).sort(),
      sits: (filtersRaw.sits || []).filter(Boolean).sort(),
      sleeps: (filtersRaw.sleeps || []).filter(Boolean).sort(),
      models: (filtersRaw.models || []).filter(Boolean).sort(),
      bedType: (filtersRaw.bedType || []).filter(Boolean).sort(),
      bathroomType: (filtersRaw.bathroomType || []).filter(Boolean).sort(),
    };

    res.json({
      success: true,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      limit: limitNum,
      data,
      filters
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});
router.get("/titles-only", async (req, res) => {
  try {
    let { page = 1, limit = 12, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 12;

    const filter = {};
    if (search && search.trim() !== "") {
      filter["van_listing.title"] = { $regex: search, $options: "i" };
    }

    // 1. Pehle Total count nikalein (Pagination ke liye zaroori hai)
    const total = await PortfolioVan.countDocuments(filter);

    // 2. Aggregation Pipeline
    const vans = await PortfolioVan.aggregate([
      { $match: filter },
      {
        $addFields: {
          hasRendering: {
            $gt: [{ $size: { $ifNull: ["$rendering", []] } }, 0],
          },
        },
      },
      {
        $sort: {
          hasRendering: -1, // Rendering wale pehle
          createdAt: -1,    // Phir latest wale
        },
      },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          slug: 1,
          rendering: 1,
          category: 1,
          "van_listing.title": 1,
          "van_listing.description": 1,
          "van_listing.specifications.wheelbase": 1,
        },
      },
    ]);

    // Response structure jo frontend expect kar raha hai
    res.json({
      success: true,
      total,                  // Total items in DB
      page,                   // Current page
      pages: Math.ceil(total / limit), // Total pages available
      data: vans,             // Current page ka data
    });
  } catch (err) {
    console.error("Backend Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message
    });
  }
});
// router.get("/category", async (req, res) => {
//   try {
//     let { category, page = 1, limit = 10, search, model, sit, sleep, bedType, bathroomType } = req.query;

//     if (!category) {
//       return res.status(400).json({ success: false, message: "Category parameter is required" });
//     }

//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;
//     const categoryArray = Array.isArray(category) ? category : [category];

//     // Filter for pagination
//     const filter = { category: { $in: categoryArray } };

//     if (sit) filter["van_listing.specifications.capacity.sits"] = { $in: Array.isArray(sit) ? sit : [sit] };
//     if (sleep) filter["van_listing.specifications.capacity.sleeps"] = { $in: Array.isArray(sleep) ? sleep : [sleep] };
//     if (model) filter["van_listing.specifications.make_model"] = { $in: Array.isArray(model) ? model : [model] };
//     if (bedType) filter["van_listing.bedType"] = { $in: Array.isArray(bedType) ? bedType : [bedType] };
//     if (bathroomType) filter["van_listing.bathroomType"] = { $in: Array.isArray(bathroomType) ? bathroomType : [bathroomType] };


//     if (search) {
//       const regex = new RegExp(search.split(" ").join(".*"), "i");
//       filter.$or = [
//         { "van_listing.title": { $regex: regex } },
//         { "van_listing.description": { $regex: regex } }
//       ];
//     }

//     // Get filtered vans with pagination
//     const total = await PortfolioVan.countDocuments(filter);
//     const portfolios = await PortfolioVan.find(filter).skip(skip).limit(limitNum).sort({ createdAt: -1 });

//     // Get all vans in this category for filters
//     const allCategoryVans = await PortfolioVan.find({ category: { $in: categoryArray } });

//     const availableSits = [...new Set(allCategoryVans.map(v => v.van_listing?.specifications?.capacity?.sits).filter(Boolean))].sort((a, b) => parseInt(a) - parseInt(b));
//     const availableSleeps = [...new Set(allCategoryVans.map(v => v.van_listing?.specifications?.capacity?.sleeps).filter(Boolean))].sort((a, b) => parseInt(a) - parseInt(b));
//     const availableModels = [...new Set(allCategoryVans.map(v => v.van_listing?.specifications?.make_model).filter(Boolean))].sort();
//     const availableBedTypes = [...new Set(allCategoryVans.map(v => v.van_listing?.bedType).filter(Boolean))].sort();
//     const availableBathroomTypes = [...new Set(allCategoryVans.map(v => v.van_listing?.bathroomType).filter(Boolean))].sort();
//     res.json({
//       success: true,
//       total,
//       page: pageNum,
//       pages: Math.ceil(total / limitNum),
//       data: portfolios,
//       filters: {
//         sits: availableSits,
//         sleeps: availableSleeps,
//         models: availableModels,
//         bedType: availableBedTypes,
//         bathroomType: availableBathroomTypes
//       }
//     });

//   } catch (err) {
//     console.error("Error fetching portfolios by category:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
// router.get("/wheel-base", async (req, res) => {
//   try {
//     let { wheelBase, search, size, sit, sleep, model, bedType, bathroomType, page = 1, limit = 10 } = req.query;

//     const pageNum = parseInt(page);
//     const limitNum = parseInt(limit);
//     const skip = (pageNum - 1) * limitNum;

//     const filter = {};

//     // -----------------------------------------
//     // Wheelbase Filter
//     // -----------------------------------------
//     if (wheelBase) {
//       const wheelArray = Array.isArray(wheelBase) ? wheelBase.map(i => i.trim()) : [wheelBase.trim()];
//       filter["van_listing.specifications.wheelbase"] = { $in: wheelArray };
//     }

//     // -----------------------------------------
//     // Size Filter
//     // -----------------------------------------
//     if (size) {
//       const sizeArray = Array.isArray(size) ? size.map(i => i.trim()) : [size.trim()];
//       filter["van_listing.specifications.size"] = { $in: sizeArray };
//     }

//     // -----------------------------------------
//     // Sit Filter
//     // -----------------------------------------
//     if (sit) {
//       const sitArray = Array.isArray(sit) ? sit.map(i => i.trim()) : [sit.trim()];
//       filter["van_listing.specifications.capacity.sits"] = { $in: sitArray };
//     }

//     // -----------------------------------------
//     // Sleep Filter
//     // -----------------------------------------
//     if (sleep) {
//       const sleepArray = Array.isArray(sleep) ? sleep.map(i => i.trim()) : [sleep.trim()];
//       filter["van_listing.specifications.capacity.sleeps"] = { $in: sleepArray };
//     }

//     // -----------------------------------------
//     // Model Filter
//     // -----------------------------------------
//     if (model) {
//       const modelArray = Array.isArray(model) ? model.map(i => i.trim()) : [model.trim()];
//       filter["van_listing.specifications.make_model"] = { $in: modelArray };
//     }

//     // -----------------------------------------
//     // Bed Type Filter
//     // -----------------------------------------
//     if (bedType) {
//       const bedArray = Array.isArray(bedType) ? bedType.map(i => i.trim()) : [bedType.trim()];
//       filter["van_listing.bedType"] = { $in: bedArray };
//     }

//     // -----------------------------------------
//     // Bathroom Type Filter
//     // -----------------------------------------
//     if (bathroomType) {
//       const bathArray = Array.isArray(bathroomType) ? bathroomType.map(i => i.trim()) : [bathroomType.trim()];
//       filter["van_listing.bathroomType"] = { $in: bathArray };
//     }

//     // -----------------------------------------
//     // Search Filter (title + description)
//     // -----------------------------------------
//     if (search) {
//       const regex = new RegExp(search.split(" ").join(".*"), "i");
//       filter.$or = [
//         { "van_listing.title": { $regex: regex } },
//         { "van_listing.description": { $regex: regex } }
//       ];
//     }

//     // -----------------------------------------
//     // Fetch Vans with Pagination
//     // -----------------------------------------
//     const total = await PortfolioVan.countDocuments(filter);

//     const vans = await PortfolioVan.find(filter)
//       .skip(skip)
//       .limit(limitNum)
//       .sort({ createdAt: -1 });

//     // -----------------------------------------
//     // Prepare Dropdown Filters
//     // -----------------------------------------
//     const allVans = await PortfolioVan.find({});

//     const sits = [...new Set(allVans.map(v => v?.van_listing?.specifications?.capacity?.sits).filter(Boolean))].sort((a, b) => a - b);
//     const sleeps = [...new Set(allVans.map(v => v?.van_listing?.specifications?.capacity?.sleeps).filter(Boolean))].sort((a, b) => a - b);
//     const models = [...new Set(allVans.map(v => v?.van_listing?.specifications?.make_model).filter(Boolean))].sort();
//     const bedTypes = [...new Set(allVans.map(v => v?.van_listing?.bedType).filter(Boolean))].sort();
//     const bathroomTypes = [...new Set(allVans.map(v => v?.van_listing?.bathroomType).filter(Boolean))].sort();

//     res.json({
//       success: true,
//       data: vans,
//       total,
//       page: pageNum,
//       pages: Math.ceil(total / limitNum),
//       filters: {
//         sits,
//         sleeps,
//         models,
//         bedType: bedTypes,
//         bathroomType: bathroomTypes
//       }
//     });

//   } catch (err) {
//     console.error("Error fetching vans by wheelbase:", err);
//     res.status(500).json({ success: false, message: "Failed to fetch vans" });
//   }
// });
// router.get("/navCat", async (req, res) => {
//   try {
//     const categories = await PortfolioVan.distinct("category");

//     res.json({
//       success: true,
//       count: categories.length,
//       data: categories
//     });
//   } catch (err) {
//     console.error("Error fetching categories:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
// router.get("/navWheel-bases", async (req, res) => {
//   try {
//     // Extract unique wheelbase values from nested field
//     const wheelBases = await PortfolioVan.distinct(
//       "van_listing.specifications.wheelbase"
//     );

//     res.json({
//       success: true,
//       count: wheelBases.length,
//       data: wheelBases
//     });
//   } catch (err) {
//     console.error("Error fetching wheel bases:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// });
router.put(
  "/:slug",
  protect,
  adminOnly,
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "rendering", maxCount: 10 },
  ]),
  async (req, res) => {
    try {
      const { slug: paramsSlug } = req.params;
      const portfolio = await PortfolioVan.findOne({ slug: paramsSlug });

      if (!portfolio) {
        return res.status(404).json({ success: false, message: "Portfolio not found" });
      }

      // Folder Path determine karein (Existing slug use karenge)
      const folderPath = `layouts/${portfolio.slug}`;

      // 1. Parse JSON fields
      const van_listing = JSON.parse(req.body.van_listing || JSON.stringify(portfolio.van_listing));
      const detailed_features = JSON.parse(req.body.detailed_features || JSON.stringify(portfolio.detailed_features));
      const media = JSON.parse(req.body.media || JSON.stringify(portfolio.media));
      const sold = req.body.sold !== undefined ? req.body.sold === "true" : portfolio.sold;

      // 2. GALLERY LOGIC (Reordering + Specific Folder Upload + S3 Cleanup)
      let oldGallery = portfolio.gallery || [];
      let finalGalleryOrder = req.body.existingGallery ? JSON.parse(req.body.existingGallery) : oldGallery;

      // Un images ko dhundo jo delete kardi gayi hain
      const deletedGalleryImages = oldGallery.filter(url => !finalGalleryOrder.includes(url));

      const newGalleryUploads = await Promise.all(
        (req.files["gallery"] || []).map(file =>
          uploadToS3(file.buffer, `${folderPath}/gallery`, file.originalname)
        )
      );
      const updatedGallery = [...finalGalleryOrder, ...newGalleryUploads];

      // 3. RENDERING LOGIC (Reordering + Specific Folder Upload + S3 Cleanup)
      let oldRendering = portfolio.rendering || [];
      let finalRenderingOrder = req.body.existingRendering ? JSON.parse(req.body.existingRendering) : oldRendering;

      // Un images ko dhundo jo delete kardi gayi hain
      const deletedRenderingImages = oldRendering.filter(url => !finalRenderingOrder.includes(url));

      const newRenderingUploads = await Promise.all(
        (req.files["rendering"] || []).map(file =>
          uploadToS3(file.buffer, `${folderPath}/renderings`, file.originalname)
        )
      );
      const updatedRendering = [...finalRenderingOrder, ...newRenderingUploads];

      // 4. PERFORM S3 DELETION (Async cleanup)
      const allImagesToDelete = [...deletedGalleryImages, ...deletedRenderingImages];
      allImagesToDelete.forEach(url => deleteFromS3(url));

      // 5. Update portfolio data
      portfolio.van_listing = {
        ...portfolio.van_listing,
        ...van_listing,
        price: van_listing.price ? String(van_listing.price) : portfolio.van_listing.price,
      };

      portfolio.gallery = updatedGallery;
      portfolio.rendering = updatedRendering;
      portfolio.sold = sold;
      portfolio.detailed_features = detailed_features;
      portfolio.media = media;

      // Slug logic (if title changed)
      if (van_listing.title && van_listing.title !== portfolio.van_listing.title) {
        portfolio.slug = await PortfolioVan.generateSlug(van_listing.title);
        // Note: Folder name wahi rahega jo pehle tha taake links break na hon.
      }

      const updatedPortfolio = await portfolio.save();

      res.json({
        success: true,
        message: "Portfolio updated and cleaned up successfully",
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

    // 2️⃣ Combine all images to delete (Gallery + Renderings)
    const allImages = [
      ...(portfolio.gallery || []),
      ...(portfolio.rendering || []) // 🆕 Added renderings
    ];

    // 3️⃣ Delete all collected images from S3
    if (allImages.length > 0) {
      await Promise.all(allImages.map((url) => deleteFromS3(url)));
      console.log(`🧹 Deleted ${allImages.length} total images (Gallery & Renderings) from S3`);
    }

    // 4️⃣ Delete portfolio document from MongoDB
    const deletedPortfolio = await PortfolioVan.findOneAndDelete({
      slug: req.params.slug,
    });

    res.json({
      success: true,
      message: "Portfolio van and all associated media deleted successfully",
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