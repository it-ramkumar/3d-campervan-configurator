const mongoose = require("mongoose");
const slugify = require("slugify");

const TestblogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, default: undefined },
  gallery: {
    type: [String],
    default: undefined
  },
  content: [
    {
      type: {
        type: String,
        // ✅ "list" enum mein add kar diya hai
        enum: ["heading", "subheading", "paragraph", "image", "table", "proscons", "mediaLink", "list"],
        required: true
      },
      text: { type: String, default: undefined },
      image: { type: String, default: undefined },
      url: { type: String, default: undefined },
      rows: { type: [[String]], default: undefined },
      pros: { type: [String], default: undefined },
      cons: { type: [String], default: undefined },
      // ✅ List items ke liye naya field
      items: { type: [String], default: undefined },
      // Aap listStyle bhi add kar sakte hain (optional)
      listStyle: { type: String, enum: ["ordered", "unordered"], default: undefined }
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

// ✅ Pre-save middleware to generate unique slug
TestblogSchema.pre("save", async function (next) {
  if (this.isModified("title")) {
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    const TestBlog = mongoose.models.TestBlog || mongoose.model("TestBlog", TestblogSchema);

    while (await TestBlog.findOne({ slug, _id: { $ne: this._id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
  next();
});

TestblogSchema.index({ "$**": "text" });

module.exports = mongoose.models.TestBlog || mongoose.model("TestBlog", TestblogSchema);