require("dotenv").config();
const express = require("express");
const router = express.Router();
const Inquery = require("../models/inquery");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save inquiry to MongoDB
    const newForm = new Inquery(req.body);
    await newForm.save();

    // 2️⃣ Create an HTML table for the email
    const formData = req.body;
    const tableRows = Object.entries(formData)
      .map(([key, value]) => {
        return `
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 8px; font-weight: bold; text-transform: capitalize;">${key}</td>
            <td style="padding: 8px;">${value}</td>
          </tr>
        `;
      })
      .join("");

    const htmlTable = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #2761FD;">🚐 New Van Inquiry Received</h2>
        <p>You’ve received a new van inquiry with the following details:</p>
        <table style="width: 100%; border-collapse: collapse; background: white;">
          ${tableRows}
        </table>
        <br/>
        <p style="color: gray; font-size: 14px;">This message was generated automatically by your website.</p>
      </div>
    `;

    // 3️⃣ Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 4️⃣ Send email to yourself (admin)
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.SMTP_USER}>`,
      to: "zainikram704@gmail.com", // 📩 Replace with your admin/receiving email
      subject: "New Van Inquiry Received",
      html: htmlTable,
    });

    // 5️⃣ Send confirmation email to the user
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.SMTP_USER}>`,
      to: formData.email, // 📩 user's email field
      subject: "Thanks for your inquiry — Big Bear Vans",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
          <h2 style="color: #2761FD;">Thank you for reaching out!</h2>
          <p>We’ve received your inquiry and our team will get in touch with you soon.</p>
          <p>If you have any urgent questions, feel free to call us at <strong> +1 (951) 441-9719</strong>.</p>
          <br/>
          <p style="font-size: 14px; color: gray;">Warm regards,<br/>Big Bear Vans Team</p>
        </div>
      `,
    });

    // 6️⃣ Final response
    res.status(201).json({
      success: true,
      message: "Inquiry saved and emails sent successfully.",
      data: newForm,
    });

  } catch (error) {
    console.error("Error saving inquiry or sending email:", error);
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
