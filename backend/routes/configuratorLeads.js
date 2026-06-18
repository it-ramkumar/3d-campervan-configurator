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

    // Brand constants matching your contact form style
    const brandLogo = "https://www.bigbearvans.com/images/blackLogo.webp";

    // Get admin + sub-admin emails
    const leads = await Lead.find({}, { email: 1, _id: 0 });
    const leadEmails = leads.map((l) => l.email).filter(Boolean);

    // Ensure allAdminEmails is clean and has no undefined values
    const allAdminEmails = [process.env.GMAIL_USER, ...leadEmails].filter(Boolean);

    // 1. Admin Email HTML Content (Clean & Organized)
    const emailContent = `
      <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;overflow:hidden;">
          <div style="background:#001F3D;padding:15px;text-align:center;">
            <h2 style="color:#fff;margin:0;font-size:18px;">New Quote Request - Van Configurator</h2>
          </div>
          <div style="padding:20px;">
            <p style="margin:0 0 10px 0;color:#333;"><strong>${name}</strong> submitted a new van configuration.</p>
            <div style="background:#f9fafb;padding:12px;border-radius:8px;margin-top:10px;">
              <p style="margin:5px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin:5px 0;"><strong>Phone:</strong> ${phone}</p>
              <p style="margin:5px 0;"><strong>Model ID:</strong> ${model.id}</p>
              <p style="margin:5px 0;"><strong>Layout:</strong> ${model.layout || "N/A"}</p>
            </div>
            <div style="margin-top:15px;padding:12px;border:1px solid #eee;border-radius:8px;">
              <p style="margin:5px 0;font-weight:bold;color:#001F3D;">Selected Parts:</p>
              ${htmlParts}
            </div>
            <div style="margin-top:20px;text-align:center;">
              <a href="${previewLink}" target="_blank" style="background:#ED985F;color:#fff;padding:12px 18px;text-decoration:none;border-radius:6px;font-weight:bold;display:inline-block;">
                View Configuration Preview
              </a>
            </div>
            <p style="font-size:12px;color:#888;margin-top:20px;text-align:center;">Submitted At: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // 2. Beautiful User Thank You Email HTML (Matches Contact Form Branding)
    const userQuoteHtml = `
      <div style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">
        <div style="max-width:620px;margin:auto;background:#ffffff;">
          <div style="text-align:center;padding:30px 20px;background:#001F3D;">
            <img src="${brandLogo}" width="140" style="margin-bottom:10px;" />
            <p style="color:#ED985F;margin:0;font-weight:600;letter-spacing:1px;">
              YOU DREAM IT, WE BUILD IT
            </p>
          </div>

          <div style="padding:25px;">
            <h2 style="color:#001F3D;margin-top:0;">
              Thanks for Your Quote Request, ${name}!
            </h2>
            <p style="color:#555;line-height:1.6;">
              We’ve received your custom van configuration. Our team is excited to look over your choices and we will get back to you with a detailed quote shortly.
            </p>

            <div style="margin-top:20px;padding:16px;border-radius:12px;background:#f9fafb;border:1px solid #eee;">
              <h3 style="margin:0 0 10px 0;color:#001F3D;">Your Configuration Summary</h3>
              <p style="margin:4px 0;font-size:15px;"><strong>Base Model:</strong> ${model.id}</p>
              ${model.layout ? `<p style="margin:4px 0;font-size:15px;"><strong>Layout:</strong> ${model.layout}</p>` : ""}

              <p style="margin:12px 0 4px 0;font-weight:700;color:#001F3D;font-size:14px;">Selected Add-ons / Parts:</p>
              <div style="font-size:14px; color:#555;">
                ${htmlParts}
              </div>

              <div style="text-align:center; margin-top:15px;">
                <a href="${previewLink}" target="_blank"
                  style="
                    display:inline-block;
                    padding:12px 18px;
                    background:#ED985F;
                    color:#fff;
                    text-decoration:none;
                    border-radius:8px;
                    font-weight:700;
                  ">
                  View Your 3D Preview →
                </a>
              </div>
            </div>

            <div style="margin-top:20px;padding:15px;background:#fff;border:1px solid #eee;border-radius:10px;font-size:14px;color:#666;">
              <p style="margin:4px 0;"><strong>Your Contact Email:</strong> ${email}</p>
              <p style="margin:4px 0;"><strong>Your Contact Phone:</strong> ${phone}</p>
            </div>

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
                Visit Our Website
              </a>
            </div>
          </div>

          <div style="text-align:center;padding:20px;font-size:12px;color:#888;background:#f9fafb;border-top:1px solid #eee;">
            © ${new Date().getFullYear()} Big Bear Vans — All Rights Reserved
          </div>
        </div>
      </div>
    `;

    // Emails Send karne ka process
    try {
      // 1. Admin Email Notification
      if (allAdminEmails.length > 0) {
        await transporter.sendMail({
          from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
          to: allAdminEmails.join(", "),
          subject: `Configuraor New Lead from ${name}`,
          html: emailContent,
        });
        // console.log("ℹ️ Admin Email sent successfully");
      }

      // 2. User beautiful confirmation template
      if (email) {
        await transporter.sendMail({
          from: `"Big Bear Vans" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Thank You for Your Van Configuration Request!",
          html: userQuoteHtml,
        });
        console.log("ℹ️ User Beautiful Confirmation Email sent successfully");
      }

    } catch (emailErr) {
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
