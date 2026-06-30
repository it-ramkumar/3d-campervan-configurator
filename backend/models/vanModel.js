const mongoose = require("mongoose");

/* -------------------------------------------------------------------------- */
/* Constants & Configurations                                                 */
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

const VAN_STATUSES = ["available", "sale_pending", "sold", "coming_soon"];

/* -------------------------------------------------------------------------- */
/* Block Schema                                                               */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* Specifications Schema                                                      */
/* -------------------------------------------------------------------------- */

const capacitySchema = new mongoose.Schema({
  sits: { type: String, required: true },
  sleeps: { type: String, required: true }
}, { _id: false });

const specificationsSchema = new mongoose.Schema({
  make_model: String,
  wheelbase: String,
  drivetrain: String,
  engine: String,
  transmission: String,
  exterior_color: String,
  interior_color: String,
  capacity: capacitySchema
}, { _id: false });

/* -------------------------------------------------------------------------- */
/* Listing Schema                                                             */
/* -------------------------------------------------------------------------- */

const vanListingSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subtitle: String,
  description: String,
  tagline: String,
  roof: String,
  price: { type: Number, required: true },
  sale_price: { type: Number, default: undefined },
  specifications: specificationsSchema
}, { _id: false });

/* -------------------------------------------------------------------------- */
/* Detailed Features Schema                                                   */
/* -------------------------------------------------------------------------- */

const detailedFeatureItemSchema = new mongoose.Schema({
  category: { type: String, trim: true },
  items: [{ type: String, trim: true }]
}, { _id: false });

/* -------------------------------------------------------------------------- */
/* Gallery normalizer — fixes legacy character-indexed objects in DB          */
/* -------------------------------------------------------------------------- */

const normaliseGalleryItem = (item) => {
  if (typeof item === "string") return item;
  const numKeys = Object.keys(item)
    .filter(k => /^\d+$/.test(k))
    .sort((a, b) => Number(a) - Number(b));
  if (numKeys.length > 0) return numKeys.map(k => item[k]).join("");
  return typeof item.url === "string" ? item.url : null;
};

const normaliseGallery = (arr) =>
  (arr || []).map(normaliseGalleryItem).filter(Boolean);

/* -------------------------------------------------------------------------- */
/* Main Van Schema                                                             */
/* -------------------------------------------------------------------------- */

const vanSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    van_listing: { type: vanListingSchema, required: true },
    is_published: { type: Boolean, default: false },
    status: {
      type: String,
      enum: VAN_STATUSES,
      default: "available"
    },
    delivery_date: String,

    gallery: { type: [String], default: [] },

    detailed_features: [detailedFeatureItemSchema],

    glbFile: { type: String, default: null },
    textures: { type: [String], default: [] },

    blocks: { type: [contentBlockSchema], default: [] },

    media: { type: [String], default: [] },
    order: { type: Number, default: 0 }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.gallery = normaliseGallery(ret.gallery);
        return ret;
      }
    },
    toObject: { virtuals: true }
  }
);

/* -------------------------------------------------------------------------- */
/* Virtuals                                                                   */
/* -------------------------------------------------------------------------- */

vanSchema.virtual("formatted_price").get(function () {
  if (!this.van_listing || !this.van_listing.price) return null;
  return `$${this.van_listing.price.toLocaleString()}`;
});

vanSchema.virtual("formatted_sale_price").get(function () {
  if (!this.van_listing || !this.van_listing.sale_price) return null;
  return `$${this.van_listing.sale_price.toLocaleString()}`;
});

/* -------------------------------------------------------------------------- */
/* Indexes & Hooks                                                            */
/* -------------------------------------------------------------------------- */

vanSchema.index({ status: 1, order: -1 });
vanSchema.index({
  "van_listing.title": "text",
  "van_listing.description": "text"
});

vanSchema.pre("save", async function (next) {
  if (this.isModified("van_listing.title") && !this.slug) {
    this.slug = await this.constructor.generateSlug(this.van_listing.title);
  }
  // clean up any legacy character-indexed gallery objects
  this.gallery = normaliseGallery(this.gallery);
  next();
});

/* -------------------------------------------------------------------------- */
/* Statics & Methods                                                          */
/* -------------------------------------------------------------------------- */

vanSchema.statics.generateSlug = async function (title) {
  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  let slug = baseSlug;
  let counter = 1;
  while (await this.exists({ slug })) {
    slug = `${baseSlug}-${counter++}`;
  }
  return slug;
};

vanSchema.statics.findAvailable = function () { return this.find({ status: "available" }); };
vanSchema.statics.findSold = function () { return this.find({ status: "sold" }); };
vanSchema.methods.markAsSold = function () { this.status = "sold"; return this.save(); };

module.exports = mongoose.model("Van", vanSchema);