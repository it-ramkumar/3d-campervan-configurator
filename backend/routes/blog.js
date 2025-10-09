const express = require("express");
const router = express.Router();
const multer = require("multer");
// const path = require("path");
const PortfolioVan = require("../models/blog");
const { blogs } = require("../services/s3");
const upload = multer({ storage: blogs });
// const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post(
  "/with-blocks",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 50 }, // block images
  ]),

  async (req, res) => {
    try {
      // ✅ Gallery images
      const gallery = req.files["gallery"]?.map((f) => f.location) || [];

      // ✅ Parse blocksData (heading + paragraph)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge each block with its image
      const blocks = blocksData.map((block, index) => ({
        heading: block.heading,
        paragraph: block.paragraph,
       image: req.files["blockImages"]?.[index]?.location || null
      }));

      // ✅ Create portfolio doc (only title, slug, gallery, blocks)
      const newPortfolio = new PortfolioVan({
        title: req.body.title,
        slug: req.body.slug,
        gallery,
        blocks,
      });

      await newPortfolio.save();

      res.json({
        success: true,
        message: "Portfolio created successfully",
        data: newPortfolio,
      });
    } catch (err) {
      console.error("Error creating portfolio:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);
router.put(
  "/with-blocks/:id",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 50 },
  ]),
  async (req, res) => {
    try {
      const { id } = req.params;

      // ✅ Gallery images (if new uploaded, merge with old)
      const gallery = req.files["gallery"]?.map((f) => f.path);

      // ✅ Parse blocksData (heading + paragraph)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge each block with its image
      const blocks = blocksData.map((block, index) => ({
        heading: block.heading,
        paragraph: block.paragraph,
        image: req.files["blockImages"]?.[index]?.path || block.image || null, // keep old image if not updated
      }));

      // ✅ Find and update
      const updatedPortfolio = await PortfolioVan.findByIdAndUpdate(
        id,
        {
          title: req.body.title,
          slug: req.body.slug,
          ...(gallery ? { gallery } : {}), // only update gallery if new images uploaded
          blocks,
        },
        { new: true }
      );

      if (!updatedPortfolio) {
        return res.status(404).json({ success: false, message: "Portfolio not found" });
      }

      res.json({
        success: true,
        message: "Portfolio updated successfully",
        data: updatedPortfolio,
      });
    } catch (err) {
      console.error("Error updating portfolio:", err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const portfolios = await PortfolioVan.find().sort({ createdAt: -1 }); // latest first
    res.json({
      success: true,
      count: portfolios.length,
      data: portfolios,
    });
  } catch (err) {
    console.error("Error fetching portfolios:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching portfolios",
    });
  }
});

// ----------------------------
// DELETE portfolio by ID
router.delete("/:id", async (req, res) => {
  try {
    const portfolio = await PortfolioVan.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.json({
      success: true,
      message: "Portfolio deleted successfully",
      data: portfolio,
    });
  } catch (err) {
    console.error("Error deleting portfolio:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while deleting portfolio",
    });
  }
});

// ----------------------------
router.get("/:slug", async (req, res) => {
  try {
    const portfolio = await PortfolioVan.findOne({ slug: req.params.slug });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found with this slug",
      });
    }

    res.json({
      success: true,
      data: portfolio,
    });
  } catch (err) {
    console.error("Error fetching portfolio by slug:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error while fetching portfolio",
    });
  }
});



module.exports = router;
