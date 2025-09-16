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

// ✅ Get all quotes
router.get("/all-quotes", async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ data: quotes });
  } catch (err) {
    console.error("❌ Error fetching all quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes." });
  }
});

// ✅ Get quote by ID
router.get("/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    if (!quote) {
      return res.status(404).json({ message: "Quote not found." });
    }
    res.status(200).json({ data: quote });
  } catch (err) {
    console.error("❌ Error fetching quote by ID:", err);
    res.status(500).json({ message: "Server error while fetching quote." });
  }
});

// ✅ Update quote by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedQuote = await Quote.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // return updated doc
    );
    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found." });
    }
    res.status(200).json({ message: "Quote updated successfully", data: updatedQuote });
  } catch (err) {
    console.error("❌ Error updating quote:", err);
    res.status(500).json({ message: "Server error while updating quote." });
  }
});

// ✅ Delete quote by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedQuote = await Quote.findByIdAndDelete(req.params.id);
    if (!deletedQuote) {
      return res.status(404).json({ message: "Quote not found." });
    }
    res.status(200).json({ message: "Quote deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting quote:", err);
    res.status(500).json({ message: "Server error while deleting quote." });
  }
});

module.exports = router;
