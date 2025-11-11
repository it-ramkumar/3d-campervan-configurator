require("dotenv").config();
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactUs");
const nodemailer = require("nodemailer");

/* ===============================
   POST - Create new contact
================================ */
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    let transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false, // use STARTTLS
      auth: {
        user: process.env.ZOHO_USER, // Zoho email
        pass: process.env.ZOHO_PASS  // Zoho app password
      },
      tls: {
        ciphers: 'TLSv1.2'
      }
    });

    // ✅ Send to Admin only
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.ZOHO_USER}>`,
to: process.env.ZOHO_USER,
      subject: "New Contact Message from Website",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Message saved and admin notified.",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact or sending email:", error);
    res.status(500).json({ success: false, error: "Server error", details: error.message });
  }
});


/* ===============================
   GET - Fetch all contacts
================================ */
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ===============================
   GET - Single contact by ID
================================ */
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: "Contact not found" });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ===============================
   PUT - Update contact by ID (full update)
================================ */
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedContact) return res.status(404).json({ success: false, error: "Contact not found" });
//     res.status(200).json({ success: true, message: "Contact updated", data: updatedContact });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

/* ===============================
   PATCH - Update only status
================================ */
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["New", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedContact)
      return res.status(404).json({ success: false, error: "Contact not found" });

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: updatedContact,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/* ===============================
   DELETE - Delete contact
================================ */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Contact not found" });
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
