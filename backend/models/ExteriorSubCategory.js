const mongoose = require("mongoose");
const slugify = require("slugify");

const ExteriorSubCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExteriorCategory",
      required: true
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// Auto-generate slug
ExteriorSubCategorySchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.ExteriorSubCategory.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! SubCategory exists."));
  }
  next();
});

module.exports = mongoose.models.ExteriorSubCategory || mongoose.model("ExteriorSubCategory", ExteriorSubCategorySchema);
