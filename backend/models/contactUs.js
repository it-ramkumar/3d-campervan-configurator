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

    // ==========================
    // Marketing / Tracking Data
    // ==========================
    leadSource: {
      type: String,
      default: "Direct",
    },

    gclid: {
      type: String,
      default: null,
    },

    utm_source: {
      type: String,
      default: null,
    },

    utm_medium: {
      type: String,
      default: null,
    },

    utm_campaign: {
      type: String,
      default: null,
    },

    utm_term: {
      type: String,
      default: null,
    },

    utm_content: {
      type: String,
      default: null,
    },

    referrer: {
      type: String,
      default: null,
    },

    landing_page: {
      type: String,
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