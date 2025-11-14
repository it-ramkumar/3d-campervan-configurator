const mongoose = require("mongoose");
const slugify = require("slugify");

const TestblogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true }, // ✅ Auto-generated slug
  description: { type: String },
  gallery: [
    {
      type: String, // image URLs from S3
    },
  ],
  content: [
    {
      type: {
        type: String,
        enum: ["heading", "subheading", "paragraph", "image", "table", "proscons", "mediaLink"],

      },
      text: String,
      image: String,
      url: String,
      rows: [[String]],
      pros: [String],
      cons: [String],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});


// ✅ Pre-save middleware to generate unique slug
TestblogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    // Generate basic slug from title
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true, // remove special chars
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    // Check for existing slugs in DB
    while (await mongoose.models.TestBlog.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

module.exports = mongoose.model("TestBlog", TestblogSchema);
