const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  category: { type: String, required: true },
  label: { type: String, required: true },
  price: { type: Number, required: true },
  shortId: { type: String, unique: true },
  image: { type: String, required: true },
  glbFile: { type: String, required: true },
  slug: { type: String, unique: true },
  type: { type: String, required: true },
  group: { type: String, required: true },
  description: { type: String, required: true },
  hasSink: { type: Boolean, default: false },
  extensionKey: { type: [String], default: [] },
}, { timestamps: true });

// Slug generator
function generateSlug(text) {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-") || "item";
}

modelSchema.pre("save", async function (next) {
  if (!this.isModified("label")) return next();

  const baseSlug = generateSlug(this.label);
  let slug = baseSlug;
  let count = 1;
  const Model = this.constructor;

  while (await Model.findOne({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

module.exports = modelSchema;
