const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Van = require("../models/vanModel");
const PortfolioVan = require("../models/portfolio");
const { SECTIONS } = require("../models/usedOptions");

// Only what a build card needs
const CARD_FIELDS = "slug status sold gallery van_listing.title van_listing.subtitle van_listing.specifications";

// Legacy van galleries can hold { url } objects instead of plain strings
const firstImage = (gallery = []) => {
  const g = gallery[0];
  return typeof g === "string" ? g : g?.url || null;
};

const toCard = (doc, type) => ({
  type, // "van" (for sale) or "layout" (portfolio)
  slug: doc.slug,
  title: doc.van_listing?.title,
  subtitle: doc.van_listing?.subtitle,
  image: firstImage(doc.gallery),
  specifications: doc.van_listing?.specifications || {},
  sold: type === "van" ? doc.status === "sold" : !!doc.sold,
});

// GET /api/option-builds/:section/:id
// Published vans (for sale) and portfolio layouts that have this option ticked
router.get("/:section/:id", async (req, res) => {
  try {
    const { section, id } = req.params;
    if (!SECTIONS[section]) {
      return res.status(400).json({ success: false, message: "Section must be exterior, interior or system" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid option id" });
    }

    const filter = { [`used_options.${section}`]: id, is_published: true };
    const [vans, layouts] = await Promise.all([
      Van.find(filter).select(CARD_FIELDS).sort({ order: 1 }).lean(),
      PortfolioVan.find(filter).select(CARD_FIELDS).sort({ createdAt: -1 }).lean(),
    ]);

    res.json({
      success: true,
      data: {
        vans: vans.map((v) => toCard(v, "van")),
        layouts: layouts.map((l) => toCard(l, "layout")),
        total: vans.length + layouts.length,
      },
    });
  } catch (err) {
    console.error("Error fetching option builds:", err);
    res.status(500).json({ success: false, message: "Fetch failed" });
  }
});

module.exports = router;
