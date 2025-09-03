const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
category: { type: String, required: true },
  label: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  componentKey:{
    type: String,
    required: true
  },
  component: {
    id: {
      type: String,
      // required: true
    },
    modelUrl: {
      type: String,
      // required: true
    }
  },
  type: {
    type: String,
    required: true
  },
  group: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  hasSink: {
    type: Boolean,
    default: false
  },
  extensionKey: {
    type: [String], // Array of strings
    default: []
  }
}, {
  timestamps: true // createdAt & updatedAt auto add ho jayenge
});

module.exports = modelSchema;
