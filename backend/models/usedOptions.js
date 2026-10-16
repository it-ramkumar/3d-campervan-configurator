const mongoose = require("mongoose");

// Options (exterior / interior / system) fitted to a build. Only ObjectIds are stored;
// option data is pulled in with populate() when a page needs it.
const SECTIONS = {
  exterior: "ExteriorChoice",
  interior: "InteriorChoice",
  system: "SystemChoice",
};

const usedOptionsField = {
  exterior: [{ type: mongoose.Schema.Types.ObjectId, ref: SECTIONS.exterior }],
  interior: [{ type: mongoose.Schema.Types.ObjectId, ref: SECTIONS.interior }],
  system: [{ type: mongoose.Schema.Types.ObjectId, ref: SECTIONS.system }],
};

// Accepts the multipart body value: a JSON string like
// {"exterior":["id1"],"interior":["id2"],"system":[]}. Bad/duplicate ids are dropped.
// Returns `fallback` when the field wasn't sent, so older admin forms don't wipe it.
const parseUsedOptions = (raw, fallback) => {
  if (raw === undefined) return fallback;

  let value = raw;
  if (typeof raw === "string") {
    try {
      value = JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  // Edit forms load populated options, so accept { _id } objects as well as plain ids
  const asId = (id) => String(id && typeof id === "object" ? id._id : id);

  const result = {};
  for (const section of Object.keys(SECTIONS)) {
    const ids = Array.isArray(value?.[section]) ? value[section] : [];
    result[section] = [...new Set(ids.map(asId))].filter((id) => mongoose.Types.ObjectId.isValid(id));
  }
  return result;
};

// System options have no `title` field; their name comes from the first heading block
const POPULATE_FIELDS = {
  exterior: "title slug images",
  interior: "title slug images",
  system: "slug images blocks",
};

const populateUsedOptions = Object.keys(SECTIONS).map((section) => ({
  path: `used_options.${section}`,
  select: POPULATE_FIELDS[section],
}));

// Called when an option is deleted so builds don't keep a dangling id
const removeOptionFromBuilds = async (section, id) => {
  const pull = { $pull: { [`used_options.${section}`]: id } };
  await Promise.all([
    mongoose.model("Van").updateMany({}, pull),
    mongoose.model("Portfolio").updateMany({}, pull),
  ]);
};

module.exports = { SECTIONS, usedOptionsField, parseUsedOptions, populateUsedOptions, removeOptionFromBuilds };
