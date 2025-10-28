require("dotenv").config();
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactUs");
const nodemailer = require("nodemailer");

// POST route - Save contact message & send emails
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email || !phone || !message) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    // 1️⃣ Save message in MongoDB
    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    // 2️⃣ Setup Nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3️⃣ Email to Admin
    const adminMail = {
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: "zainikram704@gmail.com", // your main receiving email
      subject: "New Contact Message from Website",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(adminMail);

    // 4️⃣ Thank-you email to User
    const thankYouMail = {
      from: `"Big Bear Vans" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for contacting Big Bear Vans!",
      html: `
        <div style="font-family: Arial, sans-serif; background-color:#f5f5f5; padding:20px; border-radius:10px;">
          <h2 style="color:#2761FD;">Hi ${name},</h2>
          <p>Thank you for reaching out to <strong>Big Bear Vans</strong>!</p>
          <p>We’ve received your message and our team will get back to you shortly.</p>
          <p><strong>Your Message:</strong></p>
          <blockquote style="background:white; padding:10px; border-left:4px solid #2761FD;">${message}</blockquote>
          <p style="margin-top:20px;">Warm regards,<br><strong>Big Bear Vans Team</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(thankYouMail);

    // 5️⃣ Response
    res.status(201).json({
      success: true,
      message: "Message saved, admin notified, and thank-you email sent successfully.",
      data: newContact,
    });
  } catch (error) {
    console.error("Error saving contact or sending email:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
    });
  }
});

module.exports = router;
