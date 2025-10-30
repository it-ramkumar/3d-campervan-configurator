const mongoose = require("mongoose");

const InquerySchema = new mongoose.Schema(
  {
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

    // ✅ Added new field
    status: {
      type: String,
      enum: ["New", "Contacted", "In Progress", "Closed"],
      default: "New",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inquery", InquerySchema);
