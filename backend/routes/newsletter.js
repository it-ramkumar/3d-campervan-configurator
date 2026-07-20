const express = require("express");
const router = express.Router();
const NewsletterSubscriber = require("../models/newsletterSubscriber");

// POST — Public newsletter signup (footer "Stay Updated" form)
router.post("/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    const saved = await NewsletterSubscriber.create({
      email,
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    return res.status(201).json({
      success: true,
      message: "Subscribed successfully",
      data: saved,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already subscribed",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
