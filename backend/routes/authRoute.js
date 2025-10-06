const express = require("express");
const User = require("../models/user")
const {
  signupUser,
  loginUser,
  logoutUser,
  getProfile,
  adminDashboard,
  guestDashboard,
} = require("../controllers/userController")

const { protect, adminOnly } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", protect, getProfile);
router.get("/admin", protect, adminOnly, adminDashboard);
router.get("/guest", protect, guestDashboard);

router.post("/create-admin", protect, adminOnly, async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = new User({ name, email, password, role: "admin" });
    await user.save();

    res.status(201).json({ message: "Admin created successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
