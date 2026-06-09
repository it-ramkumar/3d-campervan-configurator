const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    // Contact Info
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    // Van Details (Optional)
    vanSlug: {
      type: String,
      trim: true,
      default: null,
    },

    vanTitle: {
      type: String,
      trim: true,
      default: null,
    },

    vanSlug: {
      type: String,
      trim: true,
      default: null,
    },

    vanPrice: {
      type: Number,
      default: null,
    },

    // Lead Status
    status: {
      type: String,
      enum: ["New", "In Progress", "Resolved"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);