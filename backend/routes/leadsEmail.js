const express = require('express');
const router = express.Router();
const EmailSettings = require('../models/leadsEmail');
const { encrypt, decrypt } = require('../services/encryption'); // helper functions

// ----------------------
// GET current settings
// ----------------------
router.get('/lead-emails', async (req, res) => {
  try {
    const settings = await EmailSettings.getSettings();
    if (!settings) return res.json({ success: false, message: 'No settings found' });

    res.json({
      success: true,
      senderEmail: settings.senderEmail,
      recipients: settings.recipients
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------
// CREATE / UPDATE sender email + password
// ----------------------
router.post('/sender', async (req, res) => {
  try {
    const { senderEmail, password } = req.body;
    if (!senderEmail || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const encryptedPassword = encrypt(password);

    let settings = await EmailSettings.getSettings();
    if (!settings) {
      settings = new EmailSettings({
        senderEmail,
        encryptedPassword,
        recipients: []
      });
    } else {
      settings.senderEmail = senderEmail;
      settings.encryptedPassword = encryptedPassword;
    }

    await settings.save();

    res.json({ success: true, message: 'Sender email updated', senderEmail: settings.senderEmail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------
// Add recipient
// ----------------------
router.post('/recipient/add', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Recipient email required' });

    const settings = await EmailSettings.addRecipient(email);
    if (!settings) return res.status(400).json({ success: false, message: 'No settings found' });

    res.json({ success: true, recipients: settings.recipients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ----------------------
// Remove recipient
// ----------------------
router.post('/recipient/remove', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Recipient email required' });

    const settings = await EmailSettings.removeRecipient(email);
    if (!settings) return res.status(400).json({ success: false, message: 'No settings found' });

    res.json({ success: true, recipients: settings.recipients });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
