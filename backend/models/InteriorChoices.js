const mongoose = require("mongoose");
const slugify = require("slugify");

const InteriorChoiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: [String], default: [] },
    images: [{ type: String }], // multiple image URLs
    link: { type: String, default: "" },

    // Optional references
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "InteriorCategory", default: null },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "InteriorSubCategory", default: null }
  },
  { timestamps: true }
);

// Auto-generate slug
InteriorChoiceSchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.InteriorChoice.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! InteriorChoice exists."));
  }
  next();
});

module.exports = mongoose.models.InteriorChoice || mongoose.model("InteriorChoice", InteriorChoiceSchema);
