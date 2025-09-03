const User = require('../models/user');
const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');
const { generateToken } = require('../config/auth');

async function register(req, res) {
  try {
    const user = await UserService.createUser(req.body);
    const token = generateToken(user);
    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await UserService.findByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isValidPassword = await UserService.comparePasswords(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = generateToken(user);
    res.status(200).json({
      message: 'User logged in successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in user', error: err.message });
  }
}

module.exports = {
  register,
  login
};