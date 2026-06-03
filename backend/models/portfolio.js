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
   bathroomType: {
    type: String,
    trim: true
  },
   bedType: {
    type: String,
    trim: true
  },
    size: {
    type: String,
    trim: true
  },
    roof: {
    type: String,
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

// Portfolio Van Schema
const portfolioVanSchema = new mongoose.Schema({
  slug: {
    type: String,
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

 category: [{
  type: String,
  enum: [
    "Flagship Short Van — Santa Monica",
    "Flagship Long Van — Montreal",
    "Layouts for Solo & Couple Travelers",
    "Layouts for Families (3–9 People)",
    "Portfolio of Custom Builds"
  ],
  trim: true
}],


  gallery: [{
    type: String,
    trim: true
  }],
  rendering:[{
     type: String,
    trim: true
  }],

  detailed_features: [{
    type: detailedFeatureItemSchema
  }],

  // ✅ Media as simple string array for URLs only
  media: [{
    type: String,
    trim: true
  }]
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
portfolioVanSchema.index({ category: 1 });
portfolioVanSchema.index({ 'van_listing.title': 'text', 'van_listing.description': 'text' });

// ✅ Slug generator hook
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

portfolioVanSchema.statics.findByCategory = function(category) {
  return this.find({ category: category });
  // MongoDB automatically matches array elements
};


portfolioVanSchema.methods.markAsSold = function() {
  this.sold = true;
  return this.save();
};

const PortfolioVan = mongoose.model("Portfolio", portfolioVanSchema);
module.exports = PortfolioVan;