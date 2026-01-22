const mongoose = require("mongoose");
const slugify = require("slugify");

// 1. Block Schema ko clean karein
const blockSchema = new mongoose.Schema({
  block_type: {
    type: String,
    required: true,
    enum: ["heading", "subheading", "paragraph", "list", "table"]
  },
  title: { type: String, default: undefined },
  content: { type: String, default: undefined },

  // ✅ default: undefined arrays ke liye aise likhein
// ✅ Updated list_items: Ab ye objects ki array hogi
  list_items: {
    type: [{
      text: { type: String, required: true },
      sub_items: { type: [String], default: undefined } // Isme sub-list items aayenge
    }],
    default: undefined
  },

  // ✅ Nested object ke liye structure aise rakhein
  table_data: {
    type: {
      headers: [String],
      rows: [[String]]
    },
    default: undefined // Agar data nahi hoga to ye field DB mein create hi nahi hogi
  },

}, { _id: false }); // Blocks ke andar apni _id save nahi hogi, memory bachegi

// 2. Main Schema
const InteriorChoiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: [String], default: [] },
    images: [{ type: String }],
    link: { type: String, default: "" },
    blocks: [blockSchema], // Array of blocks
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "InteriorCategory", default: null },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "InteriorSubCategory", default: null }
  },
  { timestamps: true }
);

// Slug auto-generation logic
InteriorChoiceSchema.pre("save", async function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const InteriorChoice = mongoose.model("InteriorChoice");
    const existing = await InteriorChoice.findOne({ slug: this.slug, _id: { $ne: this._id } });
    if (existing) {
      this.slug = `${this.slug}-${Date.now()}`;
    }
  }
  next();
});

module.exports = mongoose.models.InteriorChoice || mongoose.model("InteriorChoice", InteriorChoiceSchema);