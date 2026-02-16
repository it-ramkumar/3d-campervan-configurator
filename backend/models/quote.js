const mongoose = require("mongoose");

const partSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true
    },

    label: {
      type: String
    },

    type: {
      type: String
    },

    // 🔮 Future drag/drop support
    position: {
      type: [Number], // [x, y, z]
      default: undefined, // 👈 required nahi
      validate: {
        validator: function (v) {
          return !v || v.length === 3;
        },
        message: "Position must be an array of 3 numbers"
      }
    },

    rotation: {
      type: [Number], // [x, y, z]
      default: undefined, // 👈 required nahi
      validate: {
        validator: function (v) {
          return !v || v.length === 3;
        },
        message: "Rotation must be an array of 3 numbers"
      }
    }
  },
  { _id: false }
);

const quoteSchema = new mongoose.Schema(
  {
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
      id: {
        type: String,
        required: true
      },
      layout: {
        type: String
      }
    },

    parts: {
      type: [partSchema],
      default: []
    },

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
    }
  },
  {
    timestamps: true // 👈 auto createdAt & updatedAt
  }
);

module.exports = mongoose.model("Quote", quoteSchema);