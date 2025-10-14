// models/Van.js
const mongoose = require('mongoose');

// Capacity Sub-Schema
const capacitySchema = new mongoose.Schema({
  sits: { type: String, required: true },
  sleeps: { type: String, required: true }
});

// Specifications Sub-Schema
const specificationsSchema = new mongoose.Schema({
  make_model: { type: String },
  wheelbase: { type: String },
  drivetrain: { type: String },
  engine: { type: String },
  capacity: { type: capacitySchema }
});

// Van Listing Sub-Schema
const vanListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  subtitle: { type: String, trim: true },
  model_name: { type: String, trim: true },
  price: { type: Number },
  // status: { type: String, trim: true },
  tagline: { type: String, trim: true },
  specifications: { type: specificationsSchema }
});

// Feature Highlight Schema
const featureHighlightSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true }
});

// Detailed Feature Item Schema
const detailedFeatureItemSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  items: [{ type: String, trim: true }]
});
// ✅ Block Schema (new)
const blockSchema = new mongoose.Schema({
  image: {
    type: String,
    trim: true,
    required: false
  },
  caption: {
    type: String,
    trim: true
  }
});

const gallerySchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: String, trim: true }
});

// Main Van Schema
const vanSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, trim: true },
  van_listing: { type: vanListingSchema, required: true },
  sold: { type: Boolean, default: false },
  gallery: [gallerySchema],
    blocks: [blockSchema], // ✅ NEW FIELD
  feature_highlights: [featureHighlightSchema],
  detailed_features: [detailedFeatureItemSchema],
   media: [{ type: String }],   // ✅ ab ye bhi array of objects
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
vanSchema.virtual('formatted_price').get(function () {
  if (!this.van_listing.price) return null;
  return `$${this.van_listing.price.toLocaleString()}`;
});


vanSchema.index({ sold: 1 });
vanSchema.index({
  'van_listing.title': 'text',
  'van_listing.description': 'text'
});

// Pre-save middleware
vanSchema.pre('save', async function (next) {
  if (this.isModified('van_listing.title') && !this.slug) {
    this.slug = await this.constructor.generateSlug(this.van_listing.title);
  }
  next();
});

// Slug generator
vanSchema.statics.generateSlug = async function (title) {
  let baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let counter = 1;

  while (await this.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  return slug;
};

// Static methods
vanSchema.statics.findAvailable = function () {
  return this.find({ sold: false });
};
vanSchema.statics.findSold = function () {
  return this.find({ sold: true });
};

// Instance methods
vanSchema.methods.markAsSold = function () {
  this.sold = true;
  return this.save();
};

const Van = mongoose.model('Van', vanSchema);
module.exports = Van;
