const mongoose = require('mongoose');

// --- Naya Dynamic Block Schema ---
const contentBlockSchema = new mongoose.Schema({
  block_type: {
    type: String,
    enum: ['heading', 'subheading', 'paragraph', 'list', 'table'],
    required: true
  },
  // Khali strings ko save hone se rokne ke liye default: undefined
  title: {
    type: String,
    trim: true,
    default: undefined
  },
  content: {
    type: String,
    default: undefined
  },
  // Arrays ke liye default: undefined use karein taaki [] save na ho
list_items: {
  type: [
    {
      text: { type: String, trim: true },
      sub_items: [{ type: String, trim: true }]
    }
  ],
  default: undefined
}
  ,
  // Nested Object ke liye pure object ko undefined set karein
  table_data: {
    type: {
      headers: [String],
      rows: [[String]]
    },
    default: undefined
  },
}, { _id: false }); // Individual blocks ki ID remove kar di taki space bache

const capacitySchema = new mongoose.Schema({
  sits: { type: String, required: true },
  sleeps: { type: String, required: true }
});

const specificationsSchema = new mongoose.Schema({
  make_model: { type: String },
  wheelbase: { type: String },
  drivetrain: { type: String },
  engine: { type: String },
  capacity: { type: capacitySchema },
  transmission: { type: String },
  exterior_color: { type: String },
  interior_color: { type: String },
});

const vanListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  subtitle: { type: String, trim: true },
  roof: { type: String, trim: true },
  price: { type: Number },
  tagline: { type: String, trim: true },
  specifications: { type: specificationsSchema }
});

const detailedFeatureItemSchema = new mongoose.Schema({
  category: { type: String, trim: true },
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
    delivery_date: { type: String, trim: true },
    gallery: {
      type: [String],
      default: []
    },
    detailed_features: [detailedFeatureItemSchema],

    // --- 3D Model Section ---
    glbFile: { type: String, default: null }, // Aisa hona chahiye
    textures: {
      type: [String],
      default: []
    }, // Multiple texture images URLs

    // --- Dynamic Blocks ka Addition ---
    blocks: [contentBlockSchema],

    media: {
      type: [String],
      default: []
    },
    // Model mein add karein
order: { type: Number, default: 0 }
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