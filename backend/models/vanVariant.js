const mongoose = require("mongoose");
const variantSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    thumbnail: {
      type: String,
      default: null,
    },

    // 🔥 Link to Van
    vanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Van",
      required: true,
    },

    // 🔥 Parts included in this variant
    parts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VanPart3dModel",
      },
    ],

    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Variant", variantSchema);