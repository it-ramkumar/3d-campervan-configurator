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
    type: Array, // <-- direct array allow
    default: []
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Quote", quoteSchema);
