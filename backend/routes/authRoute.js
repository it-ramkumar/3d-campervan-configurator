const express = require("express");
const User = require("../models/user")
const {
  signupUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController")
const jwt = require("jsonwebtoken");

const { protect, adminOnly } = require("../middleware/authMiddleware")

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout",protect, logoutUser);


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



router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ loggedIn: false });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ loggedIn: true, user: decoded });
  } catch (err) {
    res.json({ loggedIn: false });
  }
});


module.exports = router;
