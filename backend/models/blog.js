const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  gallery: [String], // gallery images array
  blocks: [
    {
      heading: String,
      paragraph: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model("PortfolioVan", portfolioSchema);
