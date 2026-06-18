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

    // Setup basic variables for email mapping
    const clientName = req.body.name || "Customer";
    const clientEmail = req.body.email;
    const clientPhone = req.body.phone || "N/A";
    const brandLogo = "https://www.bigbearvans.com/images/blackLogo.webp";

    // 2️⃣ Prepare HTML table rows dynamically (excluding sensitive or internal keys if any)
    const tableRows = Object.entries(req.body)
      .map(
        ([key, value]) => `
        <tr style="border-bottom: 1px solid #eee;">
          <td style="padding: 10px; font-weight: bold; text-transform: capitalize; color: #001F3D; width: 30%; font-size: 14px;">${key}:</td>
          <td style="padding: 10px; color: #555; font-size: 14px;">${value}</td>
        </tr>
      `
      )
      .join("");

    // 3️⃣ Beautiful Admin Notification HTML (Matching Big Bear Vans Identity)
    const adminHtmlTable = `
      <div style="font-family: Arial, sans-serif; background: #f4f6f8; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; overflow: hidden; border: 1px solid #eee;">
          <div style="background: #001F3D; padding: 15px; text-align: center;">
            <h2 style="color: #fff; margin: 0; font-size: 18px;">
              [Inquiry Form] New Lead Received
            </h2>
          </div>
          <div style="padding: 20px;">
            <p style="margin: 0 0 15px 0; color: #333; font-size: 15px;">
              You have received a new general inquiry from the website. Here are the details:
            </p>

            <table style="width: 100%; border-collapse: collapse; background: #fff; margin-top: 10px;">
              <tbody>
                ${tableRows}
              </tbody>
            </table>

            <div style="margin-top: 25px; text-align: center;">
              <a href="https://www.bigbearvans.com/dashboard"
                style="background: #ED985F; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Open Admin Panel
              </a>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
              This message was generated automatically by your website at ${new Date().toLocaleString()}.
            </p>
          </div>
        </div>
      </div>
    `;

    // 4️⃣ Beautiful User Confirmation Email HTML (Matches Perfectly)
    const userHtml = `
      <div style="margin: 0; padding: 0; background: #f4f6f8; font-family: Arial, sans-serif;">
        <div style="max-width: 620px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; margin-top: 20px; margin-bottom: 20px;">
          <div style="text-align: center; padding: 30px 20px; background: #001F3D;">
            <img src="${brandLogo}" width="140" style="margin-bottom: 10px;" />
            <p style="color: #ED985F; margin: 0; font-weight: 600; letter-spacing: 1px; font-size: 13px;">
              YOU DREAM IT, WE BUILD IT
            </p>
          </div>

          <div style="padding: 25px;">
            <h2 style="color: #001F3D; margin-top: 0; font-size: 22px;">
              Thanks for reaching out, ${clientName}!
            </h2>
            <p style="color: #555; line-height: 1.6; font-size: 15px;">
              We’ve successfully received your inquiry. Our specialized team is reviewing your message and will connect with you shortly to discuss how we can build your dream van exactly the way you imagine it.
            </p>

            <div style="margin-top: 25px; padding: 16px; border-radius: 12px; background: #f9fafb; border: 1px solid #eee;">
              <h3 style="margin: 0 0 12px 0; color: #001F3D; font-size: 16px;">Inquiry Submission Summary</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tbody>
                  ${tableRows}
                </tbody>
              </table>
            </div>

            <div style="text-align: center; margin-top: 25px;">
              <a href="https://www.bigbearvans.com"
                style="
                  display: inline-block;
                  padding: 14px 24px;
                  background: #001F3D;
                  color: #fff;
                  text-decoration: none;
                  border-radius: 8px;
                  font-weight: 700;
                  font-size: 15px;
                ">
                Visit Our Website
              </a>
            </div>
          </div>

          <div style="text-align: center; padding: 20px; font-size: 12px; color: #888; background: #f9fafb; border-top: 1px solid #eee;">
            © ${new Date().getFullYear()} Big Bear Vans — All Rights Reserved
          </div>
        </div>
      </div>
    `;

    // 5️⃣ Get all sub-admin emails from Lead collection
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map(l => l.email).filter(Boolean);

    // 6️⃣ Prepare all admin recipients (primary + sub-admins) & remove duplicates
    const allAdminEmails = [...new Set([process.env.GMAIL_USER, ...leadEmails])];

    // 7️⃣ Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    // 8️⃣ Send email to all admins
    await transporter.sendMail({
      from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
      to: allAdminEmails,
      subject: `[Inquiry Form] New Lead from ${clientName}`,
      html: adminHtmlTable,
    });
    // console.log("Admin email sent to:", allAdminEmails);

    // 9️⃣ Send confirmation email to user
    if (clientEmail) {
      await transporter.sendMail({
        from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
        to: clientEmail,
        subject: "Thank You for Your Inquiry - Big Bear Vans",
        html: userHtml,
      });
      console.log("User confirmation sent to:", clientEmail);
    }

    // 🔟 Send response
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
