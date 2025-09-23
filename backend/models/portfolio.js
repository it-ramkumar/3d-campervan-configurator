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
  price: {
    type: String,
    trim: true,
    default: null
  },
  specifications: {
    type: specificationsSchema
  }
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

// Portfolio Van Schema
const portfolioVanSchema = new mongoose.Schema({
  slug: { type: String, unique: true, trim: true },
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
  blocks: [blockSchema], // ✅ NEW FIELD
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

portfolioVanSchema.virtual('formatted_price').get(function() {
  if (!this.van_listing.price) return null;
  return `$${this.van_listing.price}`;
});

// Indexes
portfolioVanSchema.index({ sold: 1 });
portfolioVanSchema.index({ 'van_listing.title': 'text', 'van_listing.description': 'text' });

// ✅ Slug generator hook (sirf ek)
portfolioVanSchema.pre("validate", async function (next) {
  if (!this.slug && this.van_listing?.title) {
    this.slug = await this.constructor.generateSlug(this.van_listing.title);
  }
  next();
});

// ✅ Static method: generate slug
portfolioVanSchema.statics.generateSlug = async function(title) {
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

// ✅ Helper methods
portfolioVanSchema.statics.findAvailable = function() {
  return this.find({ sold: false });
};
portfolioVanSchema.statics.findSold = function() {
  return this.find({ sold: true });
};
portfolioVanSchema.methods.markAsSold = function() {
  this.sold = true;
  return this.save();
};

const PortfolioVan = mongoose.model("Portfolio", portfolioVanSchema);
module.exports = PortfolioVan;
