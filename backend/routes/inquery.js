require("dotenv").config();
const express = require("express");
const router = express.Router();
const Inquery = require("../models/inquery");
const nodemailer = require("nodemailer");

// 🟢 CREATE NEW INQUIRY (same as before)
router.post("/", async (req, res) => {
  try {
    const newForm = new Inquery(req.body);
    await newForm.save();

    const formData = req.body;
    const tableRows = Object.entries(formData)
      .map(([key, value]) => `
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px; font-weight: bold; text-transform: capitalize;">${key}</td>
          <td style="padding: 8px;">${value}</td>
        </tr>
      `)
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
      subject: "New Inqquiry Message from Website",
      html: htmlTable
    });


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


// 🟢 GET ALL INQUIRIES (for dashboard)
router.get("/", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
