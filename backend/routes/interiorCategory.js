// /routes/category.js
const express = require("express");
const router = express.Router();
const Category = require("../models/InteriorCategory");

router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: "Title is required" });

    const category = new Category({ title, description });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    res.json(await Category.find());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
