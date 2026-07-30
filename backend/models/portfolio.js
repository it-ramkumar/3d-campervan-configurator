const mongoose = require('mongoose');

/* -------------------------------------------------------------------------- */
/* Content Block Schema (mirrors backend/models/vanModel.js)                 */
/* -------------------------------------------------------------------------- */

const BLOCK_TYPES = [
  "heading",
  "subheading",
  "paragraph",
  "list",
  "table",
  "media",
  "feature-grid",
  "stats",
  "quote",
  "cta"
];

const BLOCK_LAYOUTS = ["left", "right", "center", "full", "grid"];

const MEDIA_TYPES = ["image", "video", "pdf", "iframe"];

const contentBlockSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString()
    },
    order: {
      type: Number,
      default: 0
    },
    is_active: {
      type: Boolean,
      default: true
    },
    block_type: {
      type: String,
      enum: BLOCK_TYPES,
      required: true
    },
    layout: {
      type: String,
      enum: BLOCK_LAYOUTS,
      default: undefined
    },
    title: { type: String, trim: true, default: undefined },
    subtitle: { type: String, trim: true, default: undefined },
    content: { type: String, trim: true, default: undefined },

    block_media: {
      type: [
        {
          type: {
            type: String,
            enum: MEDIA_TYPES,
            required: true
          },
          url: { type: String, required: true },
          thumbnail: { type: String, trim: true },
          alt: { type: String, trim: true },
          caption: { type: String, trim: true }
        }
      ],
      default: undefined
    },

    items: {
      type: [
        {
          title: { type: String, trim: true },
          description: { type: String, trim: true },
          value: { type: String, trim: true },
          icon: { type: String, trim: true },
          media: { type: String, trim: true }
        }
      ],
      default: undefined
    },

    button: {
      label: { type: String, default: undefined },
      url: { type: String, default: undefined },
      target: {
        type: String,
        enum: ["self", "blank"],
        default: undefined
      }
    },

    list_items: {
      type: [
        {
          text: { type: String, trim: true },
          sub_items: [{ type: String, trim: true }]
        }
      ],
      default: undefined
    },

    table_data: {
      type: {
        headers: [String],
        rows: [[String]]
      },
      default: undefined
    }
  },
  { _id: false }
);

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
  clientName: {
    type: String,
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
  is_published: {
    type: Boolean,
    default: true // existing portfolio items were always public before this field existed
  },

  blocks: { type: [contentBlockSchema], default: [] },

  category: [{
    type: String,
    enum: [
      "flagship-short-van-santa-monica",
      "flagship-long-van-montreal",
      "layouts-for-solo-and-couple-travelers",
      "layouts-for-families-3-9-people",
      "portfolio-of-custom-builds",
      "sugarloaf",
      "amsterdam",
      "poptop",
    ],
    trim: true
  }],


  gallery: [{
    type: String,
    trim: true
  }],
  rendering: [{
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

portfolioVanSchema.virtual('formatted_price').get(function () {
  if (!this.van_listing.price) return null;
  return `$${this.van_listing.price}`;
});

// Indexes
portfolioVanSchema.index({ sold: 1 });
portfolioVanSchema.index({ is_published: 1 });
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
portfolioVanSchema.statics.generateSlug = async function (title) {
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
portfolioVanSchema.statics.findAvailable = function () {
  return this.find({ sold: false });
};

portfolioVanSchema.statics.findSold = function () {
  return this.find({ sold: true });
};

portfolioVanSchema.statics.findByCategory = function (category) {
  return this.find({ category: category });
  // MongoDB automatically matches array elements
};


portfolioVanSchema.methods.markAsSold = function () {
  this.sold = true;
  return this.save();
};

const PortfolioVan = mongoose.model("Portfolio", portfolioVanSchema);
module.exports = PortfolioVan;