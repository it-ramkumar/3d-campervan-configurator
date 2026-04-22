const express = require("express");
const router = express.Router();
const Email = require("../models/leadsEmail");

// POST — Save Email
router.post("/emails", async (req, res) => {
  try {
    const { email } = req.body;

    const saved = await Email.create({
      email,
      ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      userAgent: req.headers["user-agent"],
    });

    return res.status(201).json({
      success: true,
      message: "Email saved successfully",
      data: saved,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// GET — List All Emails
router.get("/emails", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: emails.length,
      data: emails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// DELETE — Delete Email by ID
router.delete("/emails/:id", async (req, res) => {
  try {
    const deleted = await Email.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Email deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
