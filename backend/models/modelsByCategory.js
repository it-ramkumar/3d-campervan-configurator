

const mongoose = require("mongoose");
const modelSchema = require("./Model");

const InteriorModel = mongoose.model("InteriorModel", modelSchema);
const ExteriorModel = mongoose.model("ExteriorModel", modelSchema);
const SystemModel = mongoose.model("SystemModel", modelSchema);

module.exports = { InteriorModel, ExteriorModel, SystemModel };
