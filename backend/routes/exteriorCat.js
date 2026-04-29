const express = require("express");
const router = express.Router();
const ExteriorCategory = require("../models/ExteriorCategory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// POST: Create Category
router.post("/exterior/category", protect, adminOnly, async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newCategory = new ExteriorCategory({ title, description });
    await newCategory.save();

    res.status(201).json({ success: true, message: "Category created", data: newCategory });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

// GET: Fetch all Categories
router.get("/exterior/category", async (req, res) => {
  try {
    const categories = await ExteriorCategory.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
      data: categories
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

// DELETE: Delete a Category by ID
router.delete("/exterior/category/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await ExteriorCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, message: "Category deleted", data: deletedCategory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

module.exports = router;
