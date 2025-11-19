const mongoose = require("mongoose");
const slugify = require("slugify");

const InteriorSubCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "InteriorCategory",
      required: true
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// Auto-generate slug
InteriorSubCategorySchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.InteriorSubCategory.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! SubCategory exists."));
  }
  next();
});

module.exports = mongoose.models.InteriorSubCategory || mongoose.model("InteriorSubCategory", InteriorSubCategorySchema);
