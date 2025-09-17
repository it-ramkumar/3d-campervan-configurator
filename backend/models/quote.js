const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    id: { type: String, required: true },
    url: { type: String, required: true }
  },
  parts: {
    type: Array,
    default: []
  },

  // 🔑 New Fields
  status: {
    type: String,
    enum: ["New", "Contacted", "In Progress", "Closed Won", "Closed Lost"],
    default: "New"
  },
  notes: {
    type: String,
    default: ""
  },
  followUpDate: {
    type: Date,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// auto-update "updatedAt"
quoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Quote", quoteSchema);
