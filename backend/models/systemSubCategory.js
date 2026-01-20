const mongoose = require("mongoose");
const slugify = require("slugify");

const SystemSubCategorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SystemCategory",
      required: true
    },
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// Auto-generate slug
SystemSubCategorySchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.SystemSubCategory.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! SubCategory exists."));
  }
  next();
});

module.exports = mongoose.models.SystemSubCategory || mongoose.model("SystemSubCategory", SystemSubCategorySchema);
