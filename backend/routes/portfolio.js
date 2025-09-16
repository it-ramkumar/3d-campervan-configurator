const express = require('express');
const router = express.Router();
const PortfolioVan = require('../models/portfolio')// Adjust path as needed

// Single Van Creation Route
router.post('/', async (req, res) => {
  try {
    const {
      van_listing,
      sold,
      gallery,
      detailed_features,
      media
    } = req.body;

    // Validate required fields
    if (!van_listing || !van_listing.title) {
      return res.status(400).json({
        message: 'Van listing with title is required'
      });
    }

    // Generate slug if not provided
    let slug = req.body.slug;
    if (!slug) {
      slug = await PortfolioVan.generateSlug(van_listing.title);
    }

    // Check if slug already exists
    const existingVan = await PortfolioVan.findOne({ slug });
    if (existingVan) {
      return res.status(409).json({
        message: 'Van with this slug already exists'
      });
    }

    // Create the van object
    const vanData = {
      slug,
      van_listing: {
        title: van_listing.title,
        description: van_listing.description || '',
        subtitle: van_listing.subtitle || '',
        price: van_listing.price || null,
        specifications: van_listing.specifications || {}
      },
      sold: sold || false,
      gallery: gallery || [],
      detailed_features: detailed_features || [],
      media: media || {}
    };

    // Handle specifications if provided
    if (van_listing.specifications) {
      vanData.van_listing.specifications = {
        make_model: van_listing.specifications.make_model || '',
        wheelbase: van_listing.specifications.wheelbase || '',
        drivetrain: van_listing.specifications.drivetrain || '',
        capacity: van_listing.specifications.capacity || {
          sits: '',
          sleeps: ''
        }
      };
    }

    // Create and save the van
    const van = new PortfolioVan(vanData);
    const newVan = await van.save();

    res.status(201).json({
      message: 'Van created successfully',
      van: newVan
    });
  } catch (error) {
    console.error('Error creating van:', error);

    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        message: 'Validation error',
        errors
      });
    }

    res.status(500).json({
      message: 'Server error while creating van',
      error: error.message
    });
  }
});

// Bulk Van Creation Route
router.post('/bulk', async (req, res) => {
  try {
    const { vans } = req.body;

    if (!Array.isArray(vans)) {
      return res.status(400).json({
        message: 'Request body must contain a vans array'
      });
    }

    const results = {
      successful: [],
      failed: []
    };

    // Process each van
    for (const vanData of vans) {
      try {
        let slug = vanData.slug;

        // Generate slug if not provided
        if (!slug && vanData.van_listing && vanData.van_listing.title) {
          slug = await PortfolioVan.generateSlug(vanData.van_listing.title);
        }

        // Check if van already exists
        const existingVan = await PortfolioVan.findOne({ slug });
        if (existingVan) {
          results.failed.push({
            data: vanData,
            error: 'Van with this slug already exists'
          });
          continue;
        }

        // Create and save van
        const van = new PortfolioVan({
          ...vanData,
          slug
        });

        const savedVan = await van.save();
        results.successful.push(savedVan);
      } catch (error) {
        results.failed.push({
          data: vanData,
          error: error.message
        });
      }
    }

    res.status(201).json({
      message: 'Bulk create completed',
      summary: {
        total: vans.length,
        successful: results.successful.length,
        failed: results.failed.length
      },
      results
    });
  } catch (error) {
    console.error('Error in bulk create:', error);
    res.status(500).json({
      message: 'Server error during bulk create',
      error: error.message
    });
  }
});
// GET /vehicles - Get all vehicles
router.get('/portfolio', async (req, res) => {
  try {
    const Portfolio = await PortfolioVan.find();
    res.status(200).json({
      message: 'Vehicles fetched successfully',
      count: Portfolio.length,
      Portfolio
    });
  } catch (error) {
    console.error('Error fetching Portfolio:', error);
    res.status(500).json({
      message: 'Server error while fetching vehicles',
      error: error.message
    });
  }
});

// GET /vehicles/:slug - Get a single vehicle by slug
router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const Portfolio = await PortfolioVan.findOne({ slug });

    if (!Portfolio) {
      return res.status(404).json({
        message: 'Portfolio not found'
      });
    }

    res.status(200).json({
      message: 'Portfolio fetched successfully',
      Portfolio
    });
  } catch (error) {
    console.error('Error fetching Portfolio:', error);
    res.status(500).json({
      message: 'Server error while fetching Portfolio',
      error: error.message
    });
  }
});


module.exports = router;