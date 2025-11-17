// models/Item.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const interiorItemSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: [String],
    required: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

interiorItemSchema.pre("save", function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Interior-Item", interiorItemSchema);
