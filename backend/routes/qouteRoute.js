const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");

// POST - Create new quote request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, model,parts } = req.body;

    // Validation
    if (!name || !email || !phone || !model || !model.id || !model.url) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create new quote document
    const newQuote = new Quote({
      name,
      email,
      phone,
      model,
      parts
    });

    await newQuote.save();

    res.status(201).json({ message: "Quote request saved successfully.", quote: newQuote });
  } catch (err) {
    console.error("❌ Error saving quote:", err);
    res.status(500).json({ message: "Server error while saving quote." });
  }
});
// GET - Fetch quotes by email or phone
router.get("/search", async (req, res) => {

  try {
    const { email, phone } = req.query; // dono params receive
    console.log("Received email:", email);
    console.log("Received phone:", phone);

    if (!email || !phone) {
      return res.status(400).json({ message: "Both email and phone are required." });
    }

    // Find quotes where BOTH email AND phone match
    const quotes = await Quote.find({
      email: email.toLowerCase(),
      phone: phone
    }).sort({ createdAt: -1 }); // recent quotes first
    if (!quotes.length) {
      return res.status(404).json({ message: "No quotes found matching this email and phone." });
    }

    res.status(200).json({ data: quotes });
  } catch (err) {
    console.error("❌ Error fetching quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes." });
  }
});

module.exports = router;
