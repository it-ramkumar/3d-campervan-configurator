const mongoose = require("mongoose");
const slugify = require("slugify");

const SystemCategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" }
  },
  { timestamps: true }
);

// Auto-generate slug
SystemCategorySchema.pre("save", async function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
    const existing = await mongoose.models.SystemCategory.findOne({ slug: this.slug });
    if (existing) return next(new Error("Duplicate slug! Category exists."));
  }
  next();
});

module.exports = mongoose.models.SystemCategory || mongoose.model("SystemCategory", SystemCategorySchema);
