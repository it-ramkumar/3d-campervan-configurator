const { InteriorModel, ExteriorModel, SystemModel,getAllModels } = require("../models/modelsByCategory");
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

function getModelByCategory(category) {
  if (category === "interior") return InteriorModel;
  if (category === "exterior") return ExteriorModel;
  if (category === "system") return SystemModel;
  return null; // agar invalid category ho
}

router.post("/", async (req, res) => {
  try {
    let { category, data } = req.body;
    // Agar direct array bheji hai without "data"
    if (Array.isArray(req.body) && req.body.length > 0) {
      data = req.body;
      category = req.body[0]?.category; // Pehle object se category le lo
    }

    // Agar data me category nahi di aur upar se bhi nahi aayi
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required (interior, exterior, system)"
      });
    }

    // Agar data valid array nahi hai
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data must be a non-empty array"
      });
    }

    // Model select kare category ke basis pe
    let Model;
    if (category === "interior") Model = InteriorModel;
    else if (category === "exterior") Model = ExteriorModel;
    else if (category === "system") Model = SystemModel;
    else {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }

    // Insert data (category inject karke)
    const insertedData = await Model.insertMany(
      data.map(item => ({ ...item, category }))
    );

    res.json({
      success: true,
      message: `${category} data imported successfully!`,
      count: insertedData.length,
      data: insertedData
    });

  } catch (error) {
    console.error("Bulk insert error:", error);
    res.status(500).json({ success: false, error: "Failed to import data" });
  }
});

// ======================= GET SINGLE =======================
router.get("/:category/:id", async (req, res) => {
  try {
    const { category, id } = req.params;

    const Model = getModelByCategory(category);
    if (!Model) return res.status(400).json({ success: false, message: "Invalid category" });

    const item = await Model.findById(id);
    if (!item) return res.status(404).json({ success: false, message: "Item not found" });

    res.json({ success: true, data: item });
  } catch (error) {
    console.error("Get single error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch item" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID format" });
  }

  // List of all collections
  const collections = [InteriorModel, ExteriorModel, SystemModel];
  let deletedItem = null;

  for (const Model of collections) {
    deletedItem = await Model.findOneAndDelete({ _id: id });
    if (deletedItem) break; // stop when found and deleted
  }

  if (!deletedItem) return res.status(404).json({ success: false, message: "Item not found" });

  res.json({ success: true, message: "Item deleted successfully" });
});


router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let updateData = req.body;
    let category = null; // 🔹 declare category here

    // ✅ Agar body array hai aur usme category hai to wahan se le lo
    if (Array.isArray(req.body) && req.body.length > 0) {
      if (req.body[0]?.category) {
        category = req.body[0].category;
        updateData = req.body[0];
      } else {
        return res.status(400).json({
          success: false,
          message: "Category missing in body array"
        });
      }
    }

    // ✅ Agar object aaya hai to directly use karo
    if (!Array.isArray(req.body) && req.body.category) {
      category = req.body.category;
    }

    // ✅ Agar abhi bhi category nahi mili
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }

    // ✅ Correct model choose karo based on category
    let Model;
    if (category === "interior") Model = InteriorModel;
    else if (category === "exterior") Model = ExteriorModel;
    else if (category === "system") Model = SystemModel;
    else {
      return res.status(400).json({
        success: false,
        message: "Invalid category"
      });
    }

    // ✅ Update document by ID
    const updatedItem = await Model.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, error: "Failed to update item" });
  }
});
router.put("/:id", async (req, res) => {

  try {
    let { id } = req.params;
    let updateData = req.body;
    console.log("Update data received:", updateData);
    // ✅ Agar body array hai aur usme category hai to wahan se le lo
    if (Array.isArray(req.body) && req.body.length > 0) {
      if (req.body[0]?.category) {
        category = req.body[0].category;
        updateData = req.body[0];
      } else {
        return res.status(400).json({
          success: false,
          message: "Category missing in body array"
        });
      }
    }


    // ✅ Agar abhi bhi category nahi hai to error
    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required"
      });
    }
  const collections = [InteriorModel, ExteriorModel, SystemModel];
  let updatedItem = null;

  for (const Model of collections) {
    updatedItem = await Model.findByIdAndUpdate({ _id: id }, updateData, { new: true });
    if (updatedItem) break; // stop when found and updated
  }
    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    res.json({ success: true, message: "Item updated successfully", data: updatedItem });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ success: false, error: "Failed to update item" });
  }
});

module.exports = router;
