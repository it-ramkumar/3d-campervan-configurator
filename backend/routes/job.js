const express = require("express");
const router = express.Router();
const Job = require("../models/job");
const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const payload = {
      ...req.body,

      // Ensure array fields are arrays
      requirements: Array.isArray(req.body.requirements)
        ? req.body.requirements
        : [],

      responsibilities: Array.isArray(req.body.responsibilities)
        ? req.body.responsibilities
        : [],

      niceToHave: Array.isArray(req.body.niceToHave)
        ? req.body.niceToHave
        : [],

      benefits: Array.isArray(req.body.benefits)
        ? req.body.benefits
        : [],
    };

    const job = await Job.create(payload);
    res.status(201).json(job);
  } catch (err) {
    console.error("CREATE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const filter = {};

    // Public side: only active jobs
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    console.error("GET JOBS ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("GET JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.put("/:id",protect, adminOnly, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
    };

    // Handle arrays safely
    ["requirements", "responsibilities", "niceToHave", "benefits"].forEach(
      (field) => {
        if (req.body[field] && !Array.isArray(req.body[field])) {
          updateData[field] = [];
        }
      }
    );

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(job);
  } catch (err) {
    console.error("UPDATE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id",protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("DELETE JOB ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
