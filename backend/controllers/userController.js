const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user")

// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Signup
const signupUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // role: "admin",
      role: role || "user",
    });

    const token = generateToken(user);
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // ✅ must be true in production (HTTPS)
  sameSite: "None", // ✅ required for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});



    res.status(201).json({ message: "Signup successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(user);
res.cookie("token", token, {
  httpOnly: true,
  secure: true, // ✅ must be true in production (HTTPS)
  sameSite: "None", // ✅ required for cross-site cookies
  maxAge: 7 * 24 * 60 * 60 * 1000,
});



    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};




module.exports = {
  signupUser,
  loginUser,
  logoutUser,

};
