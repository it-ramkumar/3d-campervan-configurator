const { check, validationResult } = require('express-validator');

const validateUpdateProfile = [
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required'),
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateUpdateProfile
};