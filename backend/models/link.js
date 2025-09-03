// const mongoose = require('mongoose');

// const LinkSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   url: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Link', LinkSchema);
const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // ✅ Now optional for guest links
    },
    name: {
      type: String,
      required: true,
      unique: true, // optional but recommended to avoid duplicate short codes
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Link', LinkSchema);
