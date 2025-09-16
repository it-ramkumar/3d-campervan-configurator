// models/Van.js
const mongoose = require('mongoose');

// Capacity Sub-Schema
const capacitySchema = new mongoose.Schema({
  sits: {
    type: String,
    required: true
  },
  sleeps: {
    type: String,
    required: true
  }
});

// Specifications Sub-Schema
const specificationsSchema = new mongoose.Schema({
  make_model: {
    type: String
  },
  wheelbase: {
    type: String
  },
  drivetrain: {
    type: String
  },
  engine: {
    type: String
  },
  capacity: {
    type: capacitySchema
  }
});

// Van Listing Sub-Schema
const vanListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  subtitle: {
    type: String,
    trim: true
  },
  model_name: {
    type: String,
    trim: true
  },
  price: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  tagline: {
    type: String,
    trim: true
  },
  specifications: {
    type: specificationsSchema
  }
});

// Feature Highlight Schema
const featureHighlightSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
});

// Detailed Feature Item Schema
const detailedFeatureItemSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  items: [{
    type: String,
    trim: true
  }]
});

// Video Schema
const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true
  },
  platform: {
    type: String,
    trim: true
  },
  id: {
    type: String,
    trim: true
  }
});

// Media Schema
const mediaSchema = new mongoose.Schema({
  video: {
    type: videoSchema
  },
  video_gallery: [{
    type: videoSchema
  }]
});

// Main Van Schema
const vanSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  van_listing: {
    type: vanListingSchema,
    required: true
  },
  sold: {
    type: Boolean,
    default: false
  },
  gallery: [{
    type: String,
    trim: true
  }],
  feature_highlights: [{
    type: featureHighlightSchema
  }],
  detailed_features: [{
    type: detailedFeatureItemSchema
  }],
  media: {
    type: mediaSchema
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for formatted price
vanSchema.virtual('formatted_price').get(function() {
  if (!this.van_listing.price) return null;
  return `$${this.van_listing.price}`;
});

// Indexes for better query performance
vanSchema.index({ slug: 1 });
vanSchema.index({ sold: 1 });
vanSchema.index({ 'van_listing.title': 'text', 'van_listing.description': 'text' });

// Pre-save middleware to generate slug if not provided
vanSchema.pre('save', async function(next) {
  if (this.isModified('van_listing.title') && !this.slug) {
    this.slug = await this.constructor.generateSlug(this.van_listing.title);
  }
  next();
});

// Static method to generate a slug from title
vanSchema.statics.generateSlug = async function(title) {
  let baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/-+/g, '-') // Replace multiple - with single -
    .trim('-');

  let slug = baseSlug;
  let counter = 1;

  // Check if slug already exists
  while (await this.exists({ slug })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
};

// Static method to find available vans
vanSchema.statics.findAvailable = function() {
  return this.find({ sold: false });
};

// Static method to find sold vans
vanSchema.statics.findSold = function() {
  return this.find({ sold: true });
};

// Instance method to mark as sold
vanSchema.methods.markAsSold = function() {
  this.sold = true;
  return this.save();
};

const Van = mongoose.model('Van', vanSchema);

module.exports = Van;