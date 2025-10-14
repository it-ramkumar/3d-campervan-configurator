const mongoose = require("mongoose");

// 🔧 Helper: generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

const blogsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    des: { type: String },
    slug: { type: String, unique: true },
    gallery: [String],
    blocks: [
      {
        heading: String,
        paragraph: String,
        image: String,
      },
    ],
  },
  { timestamps: true }
);

// ✅ Auto-generate + ensure unique slug
blogsSchema.pre("save", async function (next) {
  if (!this.isModified("title")) return next();

  const baseSlug = generateSlug(this.title);
  let slug = baseSlug;
  let count = 1;

  // Use model safely via `this.constructor`
  const Model = this.constructor;

  while (await Model.exists({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  this.slug = slug;
  next();
});

module.exports = mongoose.model("Blog", blogsSchema);
