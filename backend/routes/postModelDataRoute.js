const express = require('express');
const router = express.Router();
const modelsData = require('../models/Model');


router.post('/', async (req, res) => {
  try {
    const { label, price, image, component, type, group, description, hasSink, componentKey } = req.body;

    const newModelData = new modelsData({
      label,
      price,
      image,
      component,
      componentKey,
      type,
      group,
      description,
      hasSink
    });

    const savedModelData = await newModelData.save();
    res.status(201).json({ success: true, data: savedModelData });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const modelsData = await modelsData.find();
    res.json({ success: true, data: modelsData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const modelsData = await modelsData.findById(req.params.id);
    if (!modelsData) {
      return res.status(404).json({ success: false, message: 'modelsData not found' });
    }
    res.json({ success: true, data: modelsData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedmodelsData = await modelsData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedmodelsData) {
      return res.status(404).json({ success: false, message: 'modelsData not found' });
    }
    res.json({ success: true, data: updatedmodelsData });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedCounterTop = await modelsData.findByIdAndDelete(req.params.id);
    if (!deletedCounterTop) {
      return res.status(404).json({ success: false, message: 'modelsData not found' });
    }
    res.json({ success: true, message: 'modelsData deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
