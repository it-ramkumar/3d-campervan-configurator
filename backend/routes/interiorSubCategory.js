const express = require("express");
const router = express.Router();
const InteriorSubCategory = require("../models/InteriorSubCategory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST: Create SubCategory
router.post("/interior/subcategory", protect, adminOnly, async (req, res) => {
  try {
    const { title, categoryId, description } = req.body;

    if (!title || !categoryId) {
      return res.status(400).json({ success: false, message: "Title and Category ID are required" });
    }

    const newSubCategory = new InteriorSubCategory({ title, categoryId, description });
    await newSubCategory.save();

    res.status(201).json({ success: true, message: "SubCategory created", data: newSubCategory });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
router.get("/interior/subcategory", async (req, res) => {
  try {
    // Populate category details
    const subcategories = await InteriorSubCategory.find()
      .populate("categoryId", "title description") // only fetch title & description from category
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "SubCategories fetched successfully",
      data: subcategories
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});
// DELETE: Delete SubCategory by ID
router.delete("/interior/subcategory/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSubCategory = await InteriorSubCategory.findByIdAndDelete(id);

    if (!deletedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
});

module.exports = router;
