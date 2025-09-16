const express = require('express');
const router = express.Router();
const Van = require("../models/vanModel")

router.post('/', async (req, res) => {
  try {
    const {
      van_listing,
      sold,
      gallery,
      feature_highlights,
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
      slug = await Van.generateSlug(van_listing.title);
    }

    // Check if slug already exists
    const existingVan = await Van.findOne({ slug });
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
        model_name: van_listing.model_name || '',
        price: van_listing.price || null,
        status: van_listing.status || '',
        tagline: van_listing.tagline || '',
        specifications: van_listing.specifications || {}
      },
      sold: sold || false,
      gallery: gallery || [],
      feature_highlights: feature_highlights || [],
      detailed_features: detailed_features || [],
      media: media || {}
    };

    // Handle specifications if provided
    if (van_listing.specifications) {
      vanData.van_listing.specifications = {
        make_model: van_listing.specifications.make_model || '',
        wheelbase: van_listing.specifications.wheelbase || '',
        drivetrain: van_listing.specifications.drivetrain || '',
        engine: van_listing.specifications.engine || '',
        capacity: van_listing.specifications.capacity || {
          sits: '',
          sleeps: ''
        }
      };
    }

    // Create and save the van
    const van = new Van(vanData);
    const newVan = await van.save();

    res.status(201).json({
      message: 'Van created successfully',
      van: van
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
          slug = await Van.generateSlug(vanData.van_listing.title);
        }

        // Check if van already exists
        const existingVan = await Van.findOne({ slug });
        if (existingVan) {
          results.failed.push({
            data: vanData,
            error: 'Van with this slug already exists'
          });
          continue;
        }

        // Create and save van
        const van = new Van({
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


router.get('/vans', async (req, res) => {
  try {
    const vans = await Van.find();
    res.status(200).json({
      message: 'Vehicles fetched successfully',
      count: vans.length,
      vans
    });
  } catch (error) {
    console.error('Error fetching Van:', error);
    res.status(500).json({
      message: 'Server error while fetching vehVanicles',
      error: error.message
    });
  }
});


router.get('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const vans = await Van.findOne({ slug });

    if (!vans) {
      return res.status(404).json({
        message: 'vans not found'
      });
    }

    res.status(200).json({
      message: 'vans fetched successfully',
      vans
    });
  } catch (error) {
    console.error('Error fetching vehicle:', error);
    res.status(500).json({
      message: 'Server error while fetching vehicle',
      error: error.message
    });
  }
});


module.exports = router;