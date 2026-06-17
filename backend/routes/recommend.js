const express = require('express');
const router  = express.Router();
const { getRecommendation } = require('../services/recommendationEngine');

const VALID = {
  use_case:        ['family', 'solo', 'adventure', 'business'],
  bathroom_type:   ['', 'full_aluminum', 'full_acrylic', 'full_real_tile', 'rear_shower', 'shower_in_a_bench', 'folding_shower', 'rear_bathroom'],
  vehicle_chassis: ['sprinter', 'transit', 'no_preference'],
  wheelbase:       ['144', '170', '148', '130', 'no_preference'], // Standard Big Bear Vans platform lines
  style:           ['luxury', 'rugged', 'minimal'],
  priority:        ['comfort', 'adventure', 'space']
};

router.post('/recommend', async (req, res) => {
  try {
    const {
      use_case,
      seats_required,
      bathroom_required,
      bathroom_type,
      vehicle_chassis,
      wheelbase,
      style,
      priority
    } = req.body;

    // Enums assertion check loops
    for (const field of ['use_case', 'vehicle_chassis', 'wheelbase', 'style', 'priority']) {
      const val = req.body[field];
      if (!val || !VALID[field].includes(String(val))) {
        return res.status(400).json({
          success: false,
          message: `Invalid configuration variable for field: ${field}.`
        });
      }
    }

    const isBathroomNeeded = bathroom_required === true || bathroom_required === 'true';

    if (isBathroomNeeded && (!bathroom_type || !VALID.bathroom_type.includes(bathroom_type))) {
      return res.status(400).json({
        success: false,
        message: 'Valid structural bathroom style choice is required.'
      });
    }

    const userInput = {
      use_case,
      seats_required:    Math.max(1, parseInt(seats_required) || 2),
      bathroom_required: isBathroomNeeded,
      bathroom_type:     isBathroomNeeded ? bathroom_type : '',
      vehicle_chassis,
      wheelbase:         String(wheelbase),
      style,
      priority
    };

    const result = await getRecommendation(userInput);
    return res.json({ success: true, ...result });

  } catch (err) {
    console.error('BBV Engine Error:', err);
    return res.status(500).json({ success: false, message: 'Server configuration cluster failure' });
  }
});

module.exports = router;