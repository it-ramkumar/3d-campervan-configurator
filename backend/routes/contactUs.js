const express = require('express');
const router = express.Router();
const Contact = require('../models/contactUs')



// POST route - Save contact message
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
