require("dotenv").config();
const express = require("express");
const router = express.Router();
const Inquery = require("../models/inquery");
const nodemailer = require("nodemailer");
const { protect, adminOnly } = require("../middleware/authMiddleware")
const Lead = require("../models/leadsEmail");
router.post("/", async (req, res) => {
  try {
    // 1️⃣ Save form data to database
    const newForm = new Inquery(req.body);
    await newForm.save();

    // 2️⃣ Prepare HTML table for admin
    const tableRows = Object.entries(req.body)
      .map(
        ([key, value]) => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px; font-weight: bold; text-transform: capitalize;">${key}</td>
          <td style="padding: 8px;">${value}</td>
        </tr>
      `
      )
      .join("");

    const adminHtmlTable = `
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

    // 3️⃣ Prepare HTML for user confirmation email
    const userHtml = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background: #f9f9f9;">
        <h2 style="color: #2761FD;">Thank You for Your Inquiry!</h2>
        <p>Hi ${req.body.name || "there"},</p>
        <p>Thank you for contacting Big Bear Vans. We have received your inquiry and will get back to you shortly.</p>
        <p>Here is a summary of your submission:</p>
        <table style="width: 100%; border-collapse: collapse; background: white;">
          ${tableRows}
        </table>
        <br/>
        <p style="color: gray; font-size: 14px;">This is an automated confirmation email.</p>
      </div>
    `;

    // 4️⃣ Get all sub-admin emails from Lead collection
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map(l => l.email).filter(Boolean);

    // 5️⃣ Prepare all admin recipients (primary + sub-admins) & remove duplicates
    const allAdminEmails = [...new Set([process.env.GMAIL_USER, ...leadEmails])];

    // 6️⃣ Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,      // your Gmail address
        pass: process.env.GMAIL_APP_PASS,  // Gmail App Password
      },
    });

    // 7️⃣ Send email to all admins
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
      to: allAdminEmails,
      subject: "New Inquiry Message from Website",
      html: adminHtmlTable,
    });
    console.log("Admin email sent to:", allAdminEmails);

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

    // 9️⃣ Send response
    res.status(201).json({
      success: true,
      message: "Inquiry saved, admin(s) notified, and user confirmation sent.",
      data: newForm,
    });

  } catch (error) {
    console.error("Error saving inquiry or sending emails:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



// 🟢 GET ALL INQUIRIES (for dashboard)
router.get("/",  async (req, res) => {
  try {
    const leads = await Inquery.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// 🟢 UPDATE STATUS (Admin marks as contacted, etc.)
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["New", "Contacted", "In Progress", "Closed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status value." });
    }

    const updatedLead = await Inquery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ success: false, message: "Inquiry not found." });
    }

    res.status(200).json({
      success: true,
      message: "Lead status updated successfully.",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
// 🟢 DELETE INQUIRY (Admin deletes an inquiry)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deletedInquiry = await Inquery.findByIdAndDelete(req.params.id);

    if (!deletedInquiry) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Inquiry deleted successfully.",
      data: deletedInquiry,
    });
  } catch (error) {
    console.error("Error deleting inquiry:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
