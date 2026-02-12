const mongoose = require('mongoose');
const slugify = require('slugify');

const BasevanSchema = new mongoose.Schema({
  layout: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  modelYear: { type: String },
  price: { type: Number },
  shortDescription: { type: String },
  imgUrl: { type: String, required: true },
  glbFileUrl: { type: String, required: true },
  spec: {
    wheelBase: { type: Number },
    drivetrain: { type: String },
    sitSleep: { type: String }
  },
  colors: {
    type: String,
    default: "Standard"
  }
}, { timestamps: true });

// Pre-save middleware to handle slug generation and uniqueness
BasevanSchema.pre('save', async function (next) {
  if (!this.isModified('layout')) return next();

  // Initial slug generation
  let generatedSlug = slugify(this.layout, { lower: true, strict: true });

  // Check for existing slugs in the DB
  let slugExists = await mongoose.model('BaseVan').findOne({ slug: generatedSlug });
  let count = 1;

  // Agar slug pehle se hai, toh loop chala kar suffix add karo (-1, -2 etc)
  while (slugExists) {
    const newSlug = `${generatedSlug}-${count}`;
    slugExists = await mongoose.model('BaseVan').findOne({ slug: newSlug });
    if (!slugExists) {
      generatedSlug = newSlug;
      break;
    }
    count++;
  }

  this.slug = generatedSlug;
  next();
});

module.exports = mongoose.model('BaseVan', BasevanSchema);