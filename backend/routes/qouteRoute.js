const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
// const appendToSheet = require("../services/appendToSheet");
const nodemailer = require("nodemailer");
const { protect, adminOnly } = require("../middleware/authMiddleware")
const Lead = require("../models/leadsEmail");
const { deleteFromS3 } = require("../services/s3");


// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

function formatPartsHTML(parts) {
  if (!parts || !Array.isArray(parts) || parts.length === 0) return "N/A";

  let html = "<ul>";
  for (const part of parts) {
    html += `<li>
      <strong>Category:</strong> ${part.category} <br/>
      <strong>Label:</strong> ${part.label} <br/>
      <strong>Price:</strong> $${part.price} <br/>
      <strong>Image:</strong> <a href="${part.imageUrl}" target="_blank">View Image</a> <br/>
      <strong>Model:</strong> <a href="${part.modelUrl}" target="_blank">View Model</a>
    </li><br/>`;
  }
  html += "</ul>";
  return html;
}

// POST - Create new quote request and send emails
router.post("/", async (req, res) => {
  // console.log("➡️ /quote route hit");

  try {
    const { name, email, phone, model, parts } = req.body;

    // Validation
    if (!name || !email || !phone || !model || !model.id || !model.url) {
      return res.status(400).json({ message: "All fields are required." });
    }
    // console.log("➡️ parts object:", parts);

    // Create new quote document
    const newQuote = new Quote({
      name,
      email,
      phone,
      model,
      parts,
    });

    await newQuote.save();

    // Format parts
    const htmlParts = formatPartsHTML(parts);

    // 1️⃣ Get all sub-admin emails from Lead collection
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map(l => l.email).filter(Boolean);
    const allAdminEmails = [process.env.GMAIL_USER, ...leadEmails];


    const emailContent = `
<h2>New Quote Request - 3D Big Bear Van Configurator</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Phone:</strong> ${phone}</p>
<p><strong>Model:</strong> ${model.id}</p>
<p><strong>Model URL:</strong> <a href="${model.url}" target="_blank">${model.url}</a></p>
<p><strong>Parts Requested:</strong> ${htmlParts}</p>
<p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
`;

    // Send email to admin
    try {
      await transporter.sendMail({
        from: `"3D Big Bear Van Configurator" <${process.env.GMAIL_USER}>`,
        to: allAdminEmails,
        subject: `New Quote Request from ${name}`,
        html: emailContent,
      });

      console.log("✅ Admin email sent successfully.");

      // Send confirmation email to user
      await transporter.sendMail({
        from: `"3D Big Bear Van Configurator" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Quote Request Received",
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for submitting your quote request. Here are the details we received:</p>
          <p><strong>Model:</strong> ${model.id}</p>
          <p><strong>Parts Requested:</strong> ${htmlParts}</p>
          <p>Our team will review your request and get back to you shortly.</p>
          <p>Best regards,<br/>3D Camper Configurator Team</p>
        `,
      });

      // console.log("✅ User confirmation email sent successfully.");

    } catch (emailErr) {
      console.error("❌ Error sending emails:", emailErr);
      // Continue, MongoDB save is successful
    }

    res.status(201).json({
      message: "Quote request saved successfully. Confirmation email sent.",
      quote: newQuote,
    });

  } catch (err) {
    console.error("❌ Error saving quote:", err);
    res.status(500).json({ message: "Server error while saving quote." });
  }
});


// GET - Fetch quotes by email or phone
router.get("/search", protect, adminOnly, async (req, res) => {

  try {
    const { email, phone } = req.query; // dono params receive
    // console.log("Received email:", email);
    // console.log("Received phone:", phone);

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
router.get("/all-quotes", protect, adminOnly, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ data: quotes });
  } catch (err) {
    console.error("❌ Error fetching all quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes." });
  }
});

// ✅ Get quote by ID
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);
    // console.log(quote,"quote")

    if (!quote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    // 🟢 Agar image / file URL save hai to pehle S3 se delete karo
      if (quote.model?.url) {
      await deleteFromS3(quote.model.url);
    }
    // 🟢 Ab DB se record delete karo
    await Quote.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Quote and related file deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting quote:", err);
    res.status(500).json({ message: "Server error while deleting quote." });
  }
});


// ✅ Update quote by ID
router.put("/:id", protect, adminOnly, async (req, res) => {
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
router.delete("/:id", protect, adminOnly, async (req, res) => {
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
