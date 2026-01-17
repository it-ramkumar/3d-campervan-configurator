const mongoose = require('mongoose');

// --- Naya Dynamic Block Schema ---
const contentBlockSchema = new mongoose.Schema({
  block_type: {
    type: String,
    enum: ['heading', 'subheading', 'paragraph', 'list', 'table'],
    required: true
  },
  title: { type: String, trim: true }, // Heading ya Table title ke liye
  content: { type: String },           // Paragraph ya simple text ke liye
  list_items: [{ type: String }],      // Agar block_type 'list' ho
  table_data: {                        // Agar block_type 'table' ho
    headers: [{ type: String }],
    rows: [[{ type: String }]]
  },
  order: { type: Number, default: 0 }  // Blocks ki sequence manage karne ke liye
});

const capacitySchema = new mongoose.Schema({
  sits: { type: String, required: true },
  sleeps: { type: String, required: true }
});

const specificationsSchema = new mongoose.Schema({
  make_model: { type: String },
  wheelbase: { type: String },
  drivetrain: { type: String },
  engine: { type: String },
  capacity: { type: capacitySchema }
});

const vanListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  subtitle: { type: String, trim: true },
  model_name: { type: String, trim: true },
  price: { type: Number },
  tagline: { type: String, trim: true },
  specifications: { type: specificationsSchema }
});

const detailedFeatureItemSchema = new mongoose.Schema({
  category: { type: String, required: true, trim: true },
  items: [{ type: String, trim: true }]
});

const vanSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    van_listing: { type: vanListingSchema, required: true },
    status: {
      type: String,
      enum: ['available', 'sale_pending', 'sold', 'coming_soon'],
      default: 'available'
    },
    gallery: {
      type: [String],
      default: []
    },
    detailed_features: [detailedFeatureItemSchema],

    // --- Dynamic Blocks ka Addition ---
    blocks: [contentBlockSchema],

    media: {
      type: [String],
      default: []
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

vanSchema.virtual('formatted_price').get(function () {
  if (!this.van_listing.price) return null;
  return `$${this.van_listing.price.toLocaleString()}`;
});

vanSchema.index({ status: 1 });
vanSchema.index({
  'van_listing.title': 'text',
  'van_listing.description': 'text'
});

vanSchema.pre('save', async function (next) {
  if (this.isModified('van_listing.title') && !this.slug) {
    this.slug = await this.constructor.generateSlug(this.van_listing.title);
  }
  next();
});

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

vanSchema.statics.findAvailable = function () {
  return this.find({ status: 'available' });
};

vanSchema.statics.findSold = function () {
  return this.find({ status: 'sold' });
};

vanSchema.methods.markAsSold = function () {
  this.status = 'sold';
  return this.save();
};

const Van = mongoose.model('Van', vanSchema);
module.exports = Van;