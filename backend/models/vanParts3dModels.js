const mongoose = require('mongoose');

const vanPart3dModelSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },

  name: { type: String, required: true },

  category: {
    type: String,
    enum: ["kitchen", "bed", "table", "bathroom", "storage"],
    required: true
  },

  model: { type: String, required: true }, // GLB path

  thumbnail: { type: String },

  position: { type: [Number], default: [0, 0, 0] },
  rotation: { type: [Number], default: [0, 0, 0] },
  scale: { type: [Number], default: [1, 1, 1] },

  isActive: { type: Boolean, default: true }
});
const VanPart3dModel = mongoose.model('VanPart3dModel', vanPart3dModelSchema);
module.exports = VanPart3dModel;