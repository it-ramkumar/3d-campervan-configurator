const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Link = require('../models/link');
const { v4: uuidv4 } = require('uuid');

async function createUser(userData) {
  userData.password = await bcrypt.hash(userData.password, 10);
  const user = new User(userData);
  return await user.save();
}

async function findByEmail(email) {
  return await User.findOne({ email });
}

async function comparePasswords(password, hash) {
  return await bcrypt.compare(password, hash);
}

async function findById(userId) {
  return await User.findById(userId)
    .populate('links')
    .exec();
}

async function updateUser(userId, userData) {
  return await User.findByIdAndUpdate(
    userId,
    userData,
    { new: true }
  );
}

async function saveLink(userId, linkData) {
  const link = new Link({
    ...linkData,
    userId
  });
  return await link.save();
}

async function getLinksByUser(userId) {
  return await Link.find({ userId })
    .sort({ createdAt: -1 });
}

module.exports = {
  createUser,
  findByEmail,
  comparePasswords,
  findById,
  updateUser,
  saveLink,
  getLinksByUser
};