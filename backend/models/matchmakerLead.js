const mongoose = require("mongoose");

const matchmakerLeadSchema = new mongoose.Schema(
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

    // Quiz Answers
    van_length: {
      type: String,
      enum: ["long", "short", "no_preference"],
      default: "no_preference",
    },

    passengers: {
      type: Number,
      default: 1,
    },

    bathroom_required: {
      type: String,
      enum: ["yes", "no_preference"],
      default: "no_preference",
    },

    battery_ac_required: {
      type: String,
      enum: ["yes", "no_preference"],
      default: "no_preference",
    },

    // Result Snapshot
    no_match_found: {
      type: Boolean,
      default: false,
    },

    primary_match: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    alternatives: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
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

module.exports = mongoose.models.MatchmakerLead || mongoose.model("MatchmakerLead", matchmakerLeadSchema);
