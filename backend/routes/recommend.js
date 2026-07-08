const express = require('express');
const router = express.Router();
const { getRecommendation } = require('../services/recommendationEngine');
const { sendMatchmakerResultEmail } = require('../services/matchmakerMailer');

const VALID_VAN_LENGTH = ['long', 'short', 'no_preference'];

// 'no', 'not necessary', "don't know yet", missing, etc. all collapse to 'no_preference'
function normalizeYesPreference(value) {
  return String(value ?? '').toLowerCase().trim() === 'yes' ? 'yes' : 'no_preference';
}

router.post('/recommend', async (req, res) => {
  try {
    const { van_length, passengers, bathroom_required, battery_ac_required } = req.body;

    const userInput = {
      van_length: VALID_VAN_LENGTH.includes(String(van_length)) ? String(van_length) : 'no_preference',
      passengers: Math.max(1, parseInt(passengers) || 1),
      bathroom_required: normalizeYesPreference(bathroom_required),
      battery_ac_required: normalizeYesPreference(battery_ac_required)
    };

    const result = await getRecommendation(userInput);

    // Fire-and-forget — a mail outage should never block the matchmaker response
    sendMatchmakerResultEmail(userInput, result).catch(err =>
      console.error('BBV Matchmaker Email Error:', err)
    );

    return res.json({ success: true, ...result });

  } catch (err) {
    console.error('BBV Engine Error:', err);
    return res.status(500).json({ success: false, message: 'Server configuration cluster failure' });
  }
});

module.exports = router;
