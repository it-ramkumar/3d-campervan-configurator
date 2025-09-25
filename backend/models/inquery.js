// models/VanForm.js
const mongoose = require("mongoose");

const InquerySchema = new mongoose.Schema(
  {
    plans: {
      type: [String], // Multiple choices (checkbox)
      required: true,
    },
    people: {
      type: String, // Radio button
      required: true,
    },

    vanSize: {
      type: [String], // Multiple choices
      required: true,
    },
    ac: {
      type: String, // Radio button
      required: true,
    },
    shower: {
      type: String,
      required: true,
    },
    electrical: {
      type: String,
      required: true,
    },
    heating: {
      type: String,
      required: true,
    },
    roads: {
      type: String,
      required: true,
    },
    sleeping: {
      type: [String], // Multiple choices
      required: true,
    },
    haveVan: {
      type: String,
      required: true,
    },
    budget: {
      type: String,
      required: true,
    },
    payment: {
      type: [String], // Multiple choices
      required: true,
    },
    phone: {
      type: String, // Optional
    },
    email: {
      type: String, // Optional
    },
  },
  { timestamps: true }
);

// Check if model already exists (to avoid overwrite in watch mode)
module.exports = mongoose.model("inquery", InquerySchema);
