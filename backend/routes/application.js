const express = require("express");
const router = express.Router();
const multer = require("multer");
const Application = require("../models/jobApp");
const { uploadToS3 } = require("../services/s3");
const {protect, adminOnly} = require("../middleware/authMiddleware");

/* ---------- MULTER (MEMORY STORAGE) ---------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});


router.post(
  "/apply",
  upload.fields([{ name: "resume", maxCount: 1 }]),
  async (req, res) => {
    try {
      const { jobId, name, email } = req.body;
      const resumeFile = req.files?.resume?.[0];

      if (!jobId || !name || !email || !resumeFile) {
        return res.status(400).json({
          message: "jobId, name, email and resume are required"
        });
      }

      // FIX FOR S3 ERROR: Sanitize the filename to remove spaces and special characters
      const sanitizedFileName = `${Date.now()}_${resumeFile.originalname.replace(/\s+/g, '_')}`;

      // Upload resume to S3
      const resumeUrl = await uploadToS3(
        resumeFile.buffer,
        "jobs/resumes",
        sanitizedFileName, // Use the sanitized name instead of originalname
        resumeFile.mimetype
      );

      const application = await Application.create({
        jobId,
        name,
        email,
        resume: resumeUrl
      });

      res.status(201).json({
        message: "Application submitted successfully",
        application
      });

    } catch (err) {
      console.error("APPLY JOB ERROR:", err);
      res.status(500).json({
        message: "Server error",
        error: err.message
      });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title location")
      .sort({ appliedAt: -1 }); // Note: Ensure your model uses 'appliedAt' or 'createdAt'

    res.json(applications);
  } catch (err) {
    console.error("GET APPLICATIONS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json({ message: "Application deleted successfully" });
  } catch (err) {
    console.error("DELETE APPLICATION ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate("jobId", "title location description type");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.json(application);
  } catch (err) {
    console.error("GET APPLICATION ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;