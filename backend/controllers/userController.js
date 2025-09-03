const User = require('../models/user');
const UserService = require('../services/userService');

async function getProfile(req, res) {
  try {
    const user = await UserService.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err.message });
  }
}

async function updateProfile(req, res) {
  try {   
    const user = await UserService.updateUser(req.user._id, req.body);
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
}

module.exports = {
  getProfile,
  updateProfile
};