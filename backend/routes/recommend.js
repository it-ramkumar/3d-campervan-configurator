const express = require('express');
const router  = express.Router();
const { getRecommendation } = require('../services/recommendationEngine');

const VALID = {
  use_case:  ['family', 'solo', 'couple', 'business', 'adventure'],
  budget:    ['low', 'mid', 'high', 'premium'],
  style:     ['luxury', 'rugged', 'minimal', 'mixed'],
  priority:  ['comfort', 'adventure', 'price', 'space']
};

router.post('/recommend', async (req, res) => {
  try {
    const {
      use_case,
      seats_required,
      sleeps_required,
      bathroom_required,
      budget,
      style,
      priority
    } = req.body;

    // Validate required enum fields
    for (const field of ['use_case', 'budget', 'style', 'priority']) {
      const val = req.body[field];
      if (!val || !VALID[field].includes(val)) {
        return res.status(400).json({
          success: false,
          message: `Invalid or missing field: ${field}. Must be one of: ${VALID[field].join(', ')}`
        });
      }
    }

    const userInput = {
      use_case,
      seats_required:    Math.max(1, parseInt(seats_required)  || 2),
      sleeps_required:   Math.max(1, parseInt(sleeps_required) || 2),
      bathroom_required: bathroom_required === true || bathroom_required === 'true',
      budget,
      style,
      priority
    };

    const result = await getRecommendation(userInput);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'No matching vans found in inventory or portfolio'
      });
    }

    res.json({ success: true, ...result });

  } catch (err) {
    console.error('Recommendation engine error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
