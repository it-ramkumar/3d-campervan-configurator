const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio')// Adjust path as needed
const multer = require("multer")
const { portfolios } = require("../services/cloudinary")
const upload = multer({ storage: portfolios });


router.post(
  "/",
  upload.fields([
    { name: "gallery", maxCount: 10 },
    { name: "blockImages", maxCount: 20 },
  ]),
  async (req, res) => {
    try {
      // ✅ Extract gallery
      const gallery = req.files["gallery"]?.map((f) => f.path) || [];

      // ✅ Parse blocksData from body (captions etc.)
      const blocksData = JSON.parse(req.body.blocksData || "[]");

      // ✅ Merge images with captions
      const blocks = blocksData.map((b, i) => ({
        caption: b.caption,
        image: req.files["blockImages"]?.[i]?.path || null,
      }));

      // ✅ Create new portfolioVan doc
      const newPortfolio = new PortfolioVan({
        slug: req.body.slug, // optional // ya title se auto generate hoga
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

router.get("/", async (req, res) => {
  try {
    const portfolios = await PortfolioVan.find();
    res.json({ success: true, data: portfolios });
  } catch (err) {
    res.status(500).json({ success: false, message: "Fetch failed" });
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
      const gallery = req.files["gallery"]?.map((f) => f.path) || [];

      const blocksData = JSON.parse(req.body.blocksData || "[]");

      const blocks = blocksData.map((b, i) => ({
        caption: b.caption,
        image: req.files["blockImages"]?.[i]?.path || b.image || null,
      }));

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