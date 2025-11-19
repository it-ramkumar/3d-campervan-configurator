const express = require("express");
const router = express.Router();
const InteriorCategory = require("../models/ExteriorCategory");

// POST: Create Category
router.post("/category", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Title is required" });
    }

    const newCategory = new InteriorCategory({ title, description });
    await newCategory.save();

    res.status(201).json({ success: true, message: "Category created", data: newCategory });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});
// GET: Fetch all Categories
router.get("/category", async (req, res) => {
  try {
    const categories = await InteriorCategory.find().sort({ createdAt: -1 });
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

module.exports = router;
