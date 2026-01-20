const mongoose = require("mongoose");
const slugify = require("slugify");

const SystemChoiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: [String], default: [] },
    images: [{ type: String }], // multiple image URLs
    link: { type: String, default: "" },

    // Optional references
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SystemCategory", default: null },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SystemSubCategory", default: null }
  },
  { timestamps: true }
);

// Auto-generate slug
SystemChoiceSchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.SystemChoice.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! SystemChoice exists."));
  }
  next();
});

module.exports = mongoose.models.SystemChoice || mongoose.model("SystemChoice", SystemChoiceSchema);
