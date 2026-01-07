const mongoose = require('mongoose');

const QuickLinkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,        // Har link ka title zaruri hai
    trim: true
  },
  url: {
    type: String,
    required: true,        // Link URL bhi zaruri
    trim: true
  },
  icon: {
    type: String,          // Optional icon ya thumbnail URL
    default: ''
  },
  order: {
    type: Number,          // Links ka display order
    default: 0
  },
  category: {
    type: String,          // Optional category: Social, Shop, etc.
    default: ''
  },
  is_active: {
    type: Boolean,         // Show / hide link
    default: true
  }
}, { timestamps: true });   // automatically createdAt aur updatedAt fields add ho jayein

module.exports = mongoose.model('QuickLink', QuickLinkSchema);
