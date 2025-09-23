// routes/vanFormRoutes.js
const express = require("express");
const router = express.Router();
const Inquery = require('../models/inquery')

router.post("/", async (req, res) => {
  try {
    const newForm = new Inquery(req.body);
    await newForm.save();
    res.status(201).json({ success: true, data: newForm });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
