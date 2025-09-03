const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/userController');
const { validateUpdateProfile } = require('../utils/validators/userValidators');

router.get('/profile', getProfile);
router.put('/profile', validateUpdateProfile, updateProfile);

module.exports = router;