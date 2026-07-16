const mongoose = require("mongoose");

const InquerySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    plans: { type: [String], required: true },
    people: { type: String, required: true },
    vanSize: { type: [String], required: true },
    ac: { type: String, required: true },
    shower: { type: String, required: true },
    electrical: { type: String, required: true },
    heating: { type: String, required: true },
    roads: { type: String, required: true },
    sleeping: { type: [String], required: true },
    haveVan: { type: String, required: true },
    budget: { type: String, required: true },
    payment: { type: [String], required: true },
    phone: { type: String },
    email: { type: String },

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

    // Inquiry Status
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inquery", InquerySchema);