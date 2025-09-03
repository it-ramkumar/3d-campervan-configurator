const Link = require('../models/link');
const UserService = require('../services/userService');

async function saveLink(req, res) {
  try {
    const link = await UserService.saveLink(req.user._id, req.body);
    res.status(201).json({ message: 'Link saved successfully', link });
  } catch (err) {
    res.status(500).json({ message: 'Error saving link', error: err.message });
  }
}

async function getLinks(req, res) {
  try {
    const links = await UserService.getLinksByUser(req.user._id);
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching links', error: err.message });
  }
}

module.exports = {
  saveLink,
  getLinks
};