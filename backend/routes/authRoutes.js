const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Quote = require('../models/quote');
const qs = require('qs');

require('dotenv').config();

// POST /api/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.googleId && !existingUser.password) {
        return res.status(400).json({ message: 'You already registered using Google. Please sign in with Google.' });
      } else {
        return res.status(400).json({ message: 'Email already exists. Please login.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/google', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Authorization code is required.' });
    }

    const tokenResponse = await axios.post(
      'https://oauth2.googleapis.com/token',
      qs.stringify({
        code: code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: 'http://localhost:5173',
        grant_type: 'authorization_code'
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token } = tokenResponse.data;
    if (!access_token) {
      return res.status(400).json({ message: 'Failed to obtain access token.' });
    }

    const userInfoResponse = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const { sub: googleId, email, name } = userInfoResponse.data;
    if (!googleId) {
      return res.status(400).json({ message: 'Failed to fetch user info from Google' });
    }

    // Check if someone manually registered with same email already
    let existingUser = await User.findOne({ email });

    if (existingUser && existingUser.password && !existingUser.googleId) {
      return res.status(400).json({ message: 'You have already registered manually. Please login with password.' });
    }

    // Else, find by googleId or create new
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        googleId,
        name,
        email
      });
      await user.save();
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error: JWT secret missing.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Authentication failed' });
  }
});


// POST /api/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/quotes
router.post('/api/quotes', async (req, res) => {
  const { name, email, phone, modelUrl } = req.body;
console.log("🛰️ Incoming quote data:", { name, email, phone, modelUrl });
  if (!name || !email || !modelUrl) {
    return res.status(400).json({ error: "name, email and modelUrl are required" });
  }

  try {
    const quote = new Quote({ name, email, phone, modelUrl });
    await quote.save();
    return res.status(201).json({ message: "Quote saved", quoteId: quote._id });
  } catch (err) {
    console.error("Error saving quote:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});



module.exports = router;