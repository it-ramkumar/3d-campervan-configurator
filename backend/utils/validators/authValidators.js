const { check, validationResult } = require('express-validator');

const validateRegistration = [
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
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const validateLogin = [
  check('email')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateRegistration,
  validateLogin
};