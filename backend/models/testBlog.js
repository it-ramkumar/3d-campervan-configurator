const mongoose = require("mongoose");

const TestblogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String }, // optional but useful for SEO/preview
  gallery: [
    {
      type: String, // each will store the image URL from S3
    },
  ],
  content: [
    {
      type: {
        type: String,
        enum: ["heading", "paragraph", "image", "table", "proscons"],
      },
      text: String,
      image: String,
      rows: [[String]],
      pros: [String],
      cons: [String],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TestBlog", TestblogSchema);
