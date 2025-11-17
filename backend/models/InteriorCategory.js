// models/Category.js
const mongoose = require('mongoose');
const slugify = require('slugify');

const InteriorCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

InteriorCategorySchema.pre("save", function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("Interior-Category", InteriorCategorySchema);
