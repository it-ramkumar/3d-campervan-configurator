// controllers/modelController.js
const { InteriorModel, ExteriorModel, SystemModel } = require("../models/modelsByCategory");

// Add model to correct category collection
exports.addModel = async (req, res) => {
  try {
    const { category, ...data } = req.body;

    let Model;
    if (category === "interior") Model = InteriorModel;
    else if (category === "exterior") Model = ExteriorModel;
    else if (category === "system") Model = SystemModel;
    else return res.status(400).json({ success: false, message: "Invalid category" });

    const saved = await Model.create({ category, ...data });

    res.json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get interior only
exports.getInterior = async (req, res) => {
  try {
    const data = await InteriorModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get exterior only--
exports.getExterior = async (req, res) => {
  try {
    const data = await ExteriorModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get system only
exports.getSystem = async (req, res) => {
  try {
    const data = await SystemModel.find();
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Merge all three into one response
exports.getAllModels = async (req, res) => {
  try {
    const [interior, exterior, system] = await Promise.all([
      InteriorModel.find(),
      ExteriorModel.find(),
      SystemModel.find()
    ]);

    // Merge all into a single array
    const allModels = [...interior, ...exterior, ...system];

    res.json({ success: true, data: allModels });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
