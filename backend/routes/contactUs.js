require("dotenv").config();
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactUs");
const nodemailer = require("nodemailer");
const { protect, adminOnly } = require("../middleware/authMiddleware")
const Lead = require("../models/leadsEmail");


router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ success: false, error: "All fields are required" });
    }

    // Save contact
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // HTML content
    const tableHtml = `
      <table style="width:100%;border-collapse:collapse;">
        <tr><td><strong>Name:</strong></td><td>${name}</td></tr>
        <tr><td><strong>Email:</strong></td><td>${email}</td></tr>
        <tr><td><strong>Phone:</strong></td><td>${phone}</td></tr>
        <tr><td><strong>Message:</strong></td><td>${message}</td></tr>
      </table>
    `;

    const adminHtml = `<h2>New Contact Message</h2>${tableHtml}`;
    const userHtml = `
      <h2>Thank You for Contacting Big Bear Vans</h2>
      <p>Hi ${name},</p>
      <p>We received your message and will get back to you shortly.</p>
      <p>Here’s a copy of your message:</p>
      ${tableHtml}
      <p>This is an automated email.</p>
    `;

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

    // 1️⃣ Get all sub-admin emails from Lead collection
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map(l => l.email).filter(Boolean);


    // 2️⃣ Prepare all admin recipients (primary + sub-admins)
    const allAdminEmails = [process.env.GMAIL_USER, ...leadEmails];
    // console.log(allAdminEmails,"email")

    // 3️⃣ Send email to all admins
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
      to: allAdminEmails, // array of emails
      subject: "New Contact Message from Website",
      html: adminHtml,
    });


    // 8️⃣ Send confirmation email to user
    if (req.body.email) {
      await transporter.sendMail({
        from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
        to: req.body.email,
        subject: "Thank You for Your Inquiry!",
        html: userHtml,
      });
      console.log("User confirmation sent to:", req.body.email);
    }

    res.status(201).json({
      success: true,
      message: "Message saved, admin(s) notified, and user confirmation sent.",
      data: newContact,
    });

  } catch (error) {
    console.error("Error saving contact or sending emails:", error);
    res.status(500).json({ success: false, error: "Server error", details: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ success: false, error: "Contact not found" });
    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

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

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Contact not found" });
    res.status(200).json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
