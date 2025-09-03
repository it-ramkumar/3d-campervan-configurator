const { check, validationResult } = require('express-validator');

const validateLink = [
  check('title')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Title is required'),
  check('url')
    .trim()
    .not()
    .isEmpty()
    .withMessage('URL is required')
    .isURL()
    .withMessage('Please enter a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = {
  validateLink
};