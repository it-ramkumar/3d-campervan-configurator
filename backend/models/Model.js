const mongoose = require("mongoose");

// ------------------ SCHEMA ------------------
const modelSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    label: { type: String, required: true },
    price: { type: Number, required: true },
    shortId: { type: String, unique: true, required: true },
    image: { type: String, required: true },
    glbFile: { type: String, required: true },
    slug: { type: String, unique: true },
    type: { type: String, required: true },
    group: { type: String, required: true },
    description: { type: String, required: true },
    hasSink: { type: Boolean, default: false },
    extensionKey: { type: [String], default: [] },
  },
  { timestamps: true }
);

// ------------------ HELPERS ------------------
function generateSlug(text) {
  return (
    text
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .replace(/-{2,}/g, "-") || "item"
  );
}

// Generate short, readable ID (format: IN-AQUAGU23)
function generateCustomId(data) {
  const categoryPart = data.category?.toUpperCase().slice(0, 2) || "XX";

  const cleanLabel = (data.label || "")
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase();

  const labelPart = cleanLabel.slice(0, 6).padEnd(6, "X");

  const randomDigits = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");

  return `${categoryPart}-${labelPart}${randomDigits}`;
}

// ------------------ PRE-VALIDATE HOOK ------------------
modelSchema.pre("validate", async function (next) {
  try {
    const Model = this.constructor;

    if (!this.shortId) {
      let newId;
      let exists = true;
      let attempts = 0;

      while (exists && attempts < 20) {
        newId = generateCustomId(this);
        exists = await Model.findOne({ shortId: newId });
        attempts++;
      }

      if (exists) {
        return next(
          new Error("Failed to generate unique product ID after multiple attempts.")
        );
      }

      this.shortId = newId;
    }

    next();
  } catch (err) {
    next(err);
  }
});

// ------------------ PRE-SAVE HOOK ------------------
modelSchema.pre("save", function (next) {
  if (!this.slug && this.label) {
    this.slug = generateSlug(this.label);
  }
  next();
});

module.exports = modelSchema;
