require("dotenv").config();
const express = require("express");
const router = express.Router();
const Contact = require("../models/contactUs");
const nodemailer = require("nodemailer");
const { protect, adminOnly } = require("../middleware/authMiddleware")
const Lead = require("../models/leadsEmail");


router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      message,
      vanSlug,
      vanTitle,
      vanPrice,
    } = req.body;


    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        error: "All fields are required",
      });
    }
const vanUrl = vanSlug
  ? `${process.env.FRONTEND_URL.replace(/\/$/, "")}/layout-detail/${vanSlug}`
  : null;
    // Save contact
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      vanSlug:vanUrl || null,
      vanTitle: vanTitle || null,
      vanPrice: vanPrice || null,
    });

    await newContact.save();

  const brandLogo = "https://www.bigbearvans.com/images/blackLogo.webp";

const vanCard = vanTitle
  ? `
  <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #eee;">

    <h3 style="margin:0 0 10px 0;color:#001F3D;">Selected Van</h3>

    <p style="margin:4px 0;font-size:15px;font-weight:600;">
      ${vanTitle}
    </p>

    <p style="margin:4px 0;color:#666;">
      Price: <strong>$${vanPrice ? Number(vanPrice).toLocaleString() : "-"}</strong>
    </p>

    ${
      vanUrl
        ? `
      <a href="${vanUrl}" target="_blank"
        style="
          display:inline-block;
          margin-top:12px;
          padding:12px 18px;
          background:#ED985F;
          color:#fff;
          text-decoration:none;
          border-radius:8px;
          font-weight:700;
        ">
        View Van Details →
      </a>
    `
        : ""
    }

  </div>
`
  : "";
const adminHtml = `
<div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">

  <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">

    <!-- Header -->
    <div style="background:#001F3D;padding:15px;text-align:center;">
      <h2 style="color:#fff;margin:0;font-size:18px;">
        New BBV Lead Received
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:20px;">

      <p style="margin:0 0 10px 0;color:#333;">
        <strong>${name}</strong> submitted a new inquiry.
      </p>

      <div style="background:#f9fafb;padding:12px;border-radius:8px;margin-top:10px;">
        <p style="margin:5px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:5px 0;"><strong>Phone:</strong> ${phone}</p>
        <p style="margin:5px 0;"><strong>Message:</strong> ${message}</p>
      </div>

      ${
        vanTitle
          ? `
        <div style="margin-top:15px;padding:12px;border:1px solid #eee;border-radius:8px;">
          <p style="margin:5px 0;"><strong>Van:</strong> ${vanTitle}</p>
          <p style="margin:5px 0;"><strong>Price:</strong> $${vanPrice ? Number(vanPrice).toLocaleString() : "-"}</p>
          <p style="margin:5px 0;"><strong>Slug:</strong> ${vanSlug}</p>
        </div>
      `
          : ""
      }

      <div style="margin-top:20px;text-align:center;">
        <a href="https://www.bigbearvans.com/dashboard"
          style="background:#ED985F;color:#fff;padding:10px 16px;text-decoration:none;border-radius:6px;font-weight:bold;">
          Open Admin Panel
        </a>
      </div>

    </div>

  </div>

</div>
`;
const userHtml = `
<div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">

  <!-- Container -->
  <div style="max-width:620px;margin:auto;background:#ffffff;">

    <!-- Header -->
    <div style="text-align:center;padding:30px 20px;background:#001F3D;">
      <img src="${brandLogo}" width="140" style="margin-bottom:10px;" />
      <p style="color:#ED985F;margin:0;font-weight:600;letter-spacing:1px;">
        YOU DREAM IT, WE BUILD IT
      </p>
    </div>

    <!-- Body -->
    <div style="padding:25px;">

      <h2 style="color:#001F3D;margin-top:0;">
        Thanks for reaching out, ${name}
      </h2>

      <p style="color:#555;line-height:1.6;">
        We’ve received your inquiry and our team will connect with you shortly.
        Our focus is to build your dream van exactly the way you imagine it.
      </p>

      <!-- Contact Block -->
      <div style="margin-top:20px;padding:15px;background:#f9fafb;border-radius:10px;">
        <p style="margin:6px 0;"><strong>Email:</strong> ${email}</p>
        <p style="margin:6px 0;"><strong>Phone:</strong> ${phone}</p>
      </div>

      <!-- Message -->
      <div style="margin-top:15px;">
        <p style="color:#001F3D;font-weight:700;">Your Message</p>
        <p style="color:#555;background:#fff;border:1px solid #eee;padding:12px;border-radius:8px;">
          ${message}
        </p>
      </div>

      ${vanCard}

      <!-- CTA -->
      <div style="text-align:center;margin-top:25px;">
        <a href="https://www.bigbearvans.com"
          style="
            display:inline-block;
            padding:14px 22px;
            background:#001F3D;
            color:#fff;
            text-decoration:none;
            border-radius:8px;
            font-weight:700;
          ">
          Visit Website
        </a>
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:20px;font-size:12px;color:#888;">
      © ${new Date().getFullYear()} Big Bear Vans — All Rights Reserved
    </div>

  </div>

</div>
`;
    // Send emails (unchanged logic)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map((l) => l.email).filter(Boolean);

    const allAdminEmails = [process.env.GMAIL_USER, ...leadEmails];

    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
      to: allAdminEmails,
      subject: "New Contact Message from Website",
      html: adminHtml,
    });

    if (email) {
      await transporter.sendMail({
        from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: "Thank You for Your Inquiry!",
        html: userHtml,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Message saved and emails sent",
      data: newContact,
    });
  } catch (error) {
    console.error("ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Server error",
      details: error.message,
    });
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
