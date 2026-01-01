const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },

    department: {
      type: String,
      trim: true
    },

    location: {
      type: String,
      trim: true
    },

    type: {
      type: String, // Full Time, Part Time, Contract
      trim: true
    },

    experienceLevel: {
      type: String, // Junior, Mid, Senior
      trim: true
    },

    vacancies: {
      type: Number,
      default: null
    },

    description: {
      type: String
    },

    responsibilities: [
      {
        type: String,
        trim: true
      }
    ],

    requirements: [
      {
        type: String,
        trim: true
      }
    ],

    niceToHave: [
      {
        type: String,
        trim: true
      }
    ],

    salaryMin: {
      type: Number,
      default: null
    },

    salaryMax: {
      type: Number,
      default: null
    },

    workMode: {
      type: String, // Remote, Hybrid, Onsite
      trim: true
    },

    benefits: [
      {
        type: String,
        trim: true
      }
    ],

    status: {
      type: String,
      enum: ["active", "closed", "draft"],
      default: "active"
    },

    deadline: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true // createdAt + updatedAt
  }
);

module.exports = mongoose.model("Job", jobSchema);
