const express = require('express');
const router  = express.Router();
const { getRecommendation } = require('../services/recommendationEngine');

// Strict configuration validation maps updated for Big Bear Vans infrastructure context
const VALID = {
  use_case:        ['family', 'solo', 'adventure', 'business'],
  bathroom_type:   ['', 'full_aluminum', 'full_acrylic', 'full_real_tile', 'rear_shower', 'shower_in_a_bench', 'folding_shower', 'rear_bathroom'],
  kitchen_amenities: ['sink', 'fridge', 'stove'],
  vehicle_chassis: ['sprinter', 'transit', 'no_preference'],
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
      kitchen_required,
      kitchen_items, // Expected as array of string tokens from frontend step 3
      vehicle_chassis,
      style,
      priority
    } = req.body;

    // Standard enum field assertions
    for (const field of ['use_case', 'vehicle_chassis', 'style', 'priority']) {
      const val = req.body[field];
      if (!val || !VALID[field].includes(val)) {
        return res.status(400).json({
          success: false,
          message: `Invalid setup value for field: ${field}.`
        });
      }
    }

    // Dynamic boolean translation maps
    const isBathroomNeeded = bathroom_required === true || bathroom_required === 'true';
    const isKitchenNeeded = kitchen_required === true || kitchen_required === 'true';

    // Validate bathroom variants conditional mapping
    if (isBathroomNeeded && (!bathroom_type || !VALID.bathroom_type.includes(bathroom_type))) {
      return res.status(400).json({
        success: false,
        message: 'A valid structural bathroom variant must be specified when layout requires indoor plumbing.'
      });
    }

    // Sanitize kitchen appliances arrays
    let validatedKitchenItems = [];
    if (isKitchenNeeded && Array.isArray(kitchen_items)) {
      validatedKitchenItems = kitchen_items.filter(item => VALID.kitchen_amenities.includes(item));
    }

    // Form structurally aligned payload map
    const userInput = {
      use_case,
      seats_required:    Math.max(1, parseInt(seats_required) || 2),
      bathroom_required: isBathroomNeeded,
      bathroom_type:     isBathroomNeeded ? bathroom_type : '',
      kitchen_required:  isKitchenNeeded,
      kitchen_items:     validatedKitchenItems,
      vehicle_chassis,
      style,
      priority
    };

    const result = await getRecommendation(userInput);

    // If matching configurations bypass inventory threshold, return clean structural matrix
    return res.json({ success: true, ...result });

  } catch (err) {
    console.error('Recommendation engine runtime exception:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal processing cluster failure',
      error: err.message
    });
  }
});

module.exports = router;