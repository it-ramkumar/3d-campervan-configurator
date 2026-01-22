const mongoose = require("mongoose");
const slugify = require("slugify");

const blockSchema = new mongoose.Schema({
  block_type: {
    type: String,
    required: true,
    enum: ["heading", "subheading", "paragraph", "list", "table"]
  },
  title: { type: String, default: undefined },
  content: { type: String, default: undefined },
  list_items: {
    type: [{
      text: { type: String, required: true },
      sub_items: { type: [String], default: undefined }
    }],
    default: undefined
  },
  table_data: {
    type: {
      headers: [String],
      rows: [[String]]
    },
    default: undefined
  },
}, { _id: false });

const SystemChoiceSchema = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    images: [{ type: String }],
    link: { type: String, default: "" },
    blocks: [blockSchema],
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SystemCategory", default: null },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: "SystemSubCategory", default: null }
  },
  { timestamps: true }
);

// ✅ Updated Slug Generation Logic
SystemChoiceSchema.pre("save", async function (next) {
  // Agar slug pehle se hai aur blocks modify nahi hue toh skip karein
  if (this.slug && !this.isModified("blocks")) return next();

  // 1. Blocks mein se pehli 'heading' ya 'subheading' dhoondein slug banane ke liye
  const headingBlock = this.blocks.find(b =>
    (b.block_type === "heading" || b.block_type === "subheading") && b.title
  );

  // 2. Agar koi heading block mil gaya
  if (headingBlock && headingBlock.title) {
    let generatedSlug = slugify(headingBlock.title, { lower: true, strict: true });

    // 3. Unique slug check
    const SystemChoice = mongoose.model("SystemChoice");
    const existing = await SystemChoice.findOne({ slug: generatedSlug, _id: { $ne: this._id } });

    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now()}`;
    }

    this.slug = generatedSlug;
  } else {
    // 4. Fallback: Agar koi heading nahi mili toh ID se slug banayein taaki error na aaye
    if (!this.slug) {
      this.slug = `choice-${this._id}-${Date.now()}`;
    }
  }

  next();
});

module.exports = mongoose.models.SystemChoice || mongoose.model("SystemChoice", SystemChoiceSchema);