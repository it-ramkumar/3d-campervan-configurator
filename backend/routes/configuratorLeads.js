const express = require("express");
const router = express.Router();
const Quote = require("../models/quote");
const nodemailer = require("nodemailer");
const Lead = require("../models/leadsEmail");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const { deleteFromS3 } = require("../services/s3");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASS,
  },
});

// 🔥 Debugging: Check karein ke SMTP connect ho raha hai ya nahi
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection Error:", error);
  } else {
    console.log("✅ Email Server ready to send messages");
  }
});

// Simple parts formatter (no S3 links now)
function formatPartsHTML(parts) {
  if (!parts || !Array.isArray(parts) || parts.length === 0) {
    return "No additional parts selected.";
  }

  return `
    <ul>
      ${parts
        .map(
          (part) => `
            <li>
              <strong>${part.label || "Unnamed Part"}</strong>
              (${part.id || "No ID"})
              ${part.type ? `<br/><strong>Type:</strong> ${part.type}` : ""}
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

// POST - Create new quote request
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, model, parts } = req.body;

    // Basic validation
    if (!name || !email || !phone || !model || !model.id) {
      return res.status(400).json({
        message: "Name, email, phone and model.id are required.",
      });
    }

    // Save quote (JSON only — no S3 model URL)
    const newQuote = await Quote.create({
      name,
      email,
      phone,
      model,
      parts,
    });

    // Generate dynamic preview link
    const previewLink = `${process.env.FRONTEND_URL}/quote/preview/${newQuote._id}`;
    const htmlParts = formatPartsHTML(parts);

    // Get admin + sub-admin emails
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map((l) => l.email).filter(Boolean);

    // Ensure allAdminEmails is clean and has no undefined values
    const allAdminEmails = [process.env.GMAIL_USER, ...leadEmails].filter(Boolean);

    const emailContent = `
      <h2>New Quote Request - Van Configurator</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Model:</strong> ${model.id}</p>
      <p><strong>Layout:</strong> ${model.layout || "N/A"}</p>
      <p><strong>Selected Parts:</strong></p>
      ${htmlParts}
      <p><strong>Preview Link:</strong>
        <a href="${previewLink}" target="_blank">${previewLink}</a>
      </p>
      <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
    `;

    // Emails Send karne ka process
    try {
      // 1. Admin Email
      if (allAdminEmails.length > 0) {
        await transporter.sendMail({
          from: `"Van Configurator" <${process.env.GMAIL_USER}>`,
          to: allAdminEmails.join(", "), // Multiple emails ko comma separated string banana behtar hota hai
          subject: `New Quote Request from ${name}`,
          html: emailContent,
        });
        console.log("ℹ️ Admin Email sent successfully");
      }

      // 2. User confirmation
      await transporter.sendMail({
        from: `"Van Configurator" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Your Quote Request Has Been Received",
        html: `
          <h2>Hi ${name},</h2>
          <p>Thank you for submitting your van configuration.</p>
          <p>You can preview your configured van here:</p>
          <p><a href="${previewLink}" target="_blank">${previewLink}</a></p>
          <p>Our team will contact you shortly.</p>
          <p>Best regards,<br/>Van Configurator Team</p>
        `,
      });
      console.log("ℹ️ User Confirmation Email sent successfully");

    } catch (emailErr) {
      // 🔥 Yeh console aapko terminal mein asli galti bataye ga
      console.error("❌ Detailed Email sending error:", emailErr);
    }

    res.status(201).json({
      message: "Quote saved successfully.",
      quote: newQuote,
      previewLink,
    });

  } catch (err) {
    console.error("Quote save error:", err);
    res.status(500).json({
      message: "Server error while saving quote.",
    });
  }
});
router.get("/all-quotes", protect, adminOnly, async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({ data: quotes });
  } catch (err) {
    console.error("❌ Error fetching all quotes:", err);
    res.status(500).json({ message: "Server error while fetching quotes." });
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

router.get("/preview/:id", async (req, res) => {
  try {
    const quote = await Quote.findById(req.params.id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    res.json(quote);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
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
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { id } = req.params;

    const quote = await Quote.findById(id);

    if (!quote) {
      return res.status(404).json({ message: "Quote not found." });
    }

    await Quote.findByIdAndDelete(id);

    res.status(200).json({ message: "Quote deleted successfully." });
  } catch (err) {
    console.error("❌ Error deleting quote:", err);
    res.status(500).json({ message: "Server error while deleting quote." });
  }
});

module.exports = router;
