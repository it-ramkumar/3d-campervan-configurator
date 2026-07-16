const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../services/recommendationEngine');
const { sendMatchmakerResultEmail } = require('../services/matchmakerMailer');
const MatchmakerLead = require('../models/matchmakerLead');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const VALID_VAN_LENGTH = ['long', 'short', 'no_preference'];

// 'no', 'not necessary', "don't know yet", missing, etc. all collapse to 'no_preference'
function normalizeYesPreference(value) {
  return String(value ?? '').toLowerCase().trim() === 'yes' ? 'yes' : 'no_preference';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/recommend', async (req, res) => {
  try {
    const { van_length, passengers, bathroom_required, battery_ac_required, customer_name, customer_phone, customer_email } = req.body;

    const contact = {
      name: String(customer_name || '').trim(),
      phone: String(customer_phone || '').trim(),
      email: String(customer_email || '').trim()
    };

    if (!contact.name || !contact.phone || !contact.email) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone and email are required so our team can reach you back.'
      });
    }
    if (!EMAIL_REGEX.test(contact.email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    const userInput = {
      van_length: VALID_VAN_LENGTH.includes(String(van_length)) ? String(van_length) : 'no_preference',
      passengers: Math.max(1, parseInt(passengers) || 1),
      bathroom_required: normalizeYesPreference(bathroom_required),
      battery_ac_required: normalizeYesPreference(battery_ac_required)
    };

    const result = await getRecommendation(userInput);

    // ==========================
    // Lead Tracking Detection
    // ==========================
    let leadSource = 'Direct';

    if (req.body.gclid) {
      leadSource = 'Google Ads';
    } else if (req.body.utm_source === 'google' && req.body.utm_medium === 'cpc') {
      leadSource = 'Google Ads';
    } else if (req.body.utm_source === 'google') {
      leadSource = 'Organic Search';
    } else if (req.body.referrer && req.body.referrer.includes('google')) {
      leadSource = 'Organic Search';
    }

    try {
      await MatchmakerLead.create({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        van_length: userInput.van_length,
        passengers: userInput.passengers,
        bathroom_required: userInput.bathroom_required,
        battery_ac_required: userInput.battery_ac_required,
        no_match_found: Boolean(result?.no_match_found),
        primary_match: result?.primary_match || null,
        alternatives: result?.alternatives || [],
        leadSource,
        gclid: req.body.gclid || null,
        utm_source: req.body.utm_source || null,
        utm_medium: req.body.utm_medium || null,
        utm_campaign: req.body.utm_campaign || null,
        utm_term: req.body.utm_term || null,
        utm_content: req.body.utm_content || null,
        referrer: req.body.referrer || null,
        landing_page: req.body.landing_page || null,
      });
    } catch (dbErr) {
      // A DB hiccup should never block the matchmaker response
      console.error('BBV Matchmaker Save Error:', dbErr);
    }

    // Fire-and-forget — a mail outage should never block the matchmaker response
    sendMatchmakerResultEmail(userInput, contact, result).catch(err =>
      console.error('BBV Matchmaker Email Error:', err)
    );

    return res.json({ success: true, ...result });

  } catch (err) {
    console.error('BBV Engine Error:', err);
    return res.status(500).json({ success: false, message: 'Server configuration cluster failure' });
  }
});

router.get('/recommend', async (req, res) => {
  try {
    const leads = await MatchmakerLead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/recommend/:id', async (req, res) => {
  try {
    const lead = await MatchmakerLead.findById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/recommend/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['New', 'In Progress', 'Resolved'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updatedLead = await MatchmakerLead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedLead) return res.status(404).json({ success: false, error: 'Lead not found' });

    res.status(200).json({ success: true, message: 'Status updated successfully', data: updatedLead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/recommend/:id', protect, adminOnly, async (req, res) => {
  try {
    const deleted = await MatchmakerLead.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.status(200).json({ success: true, message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
