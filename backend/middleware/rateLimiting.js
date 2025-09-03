const rateLimit = require('express-rate-limit');

// Global limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: { success: false, message: 'Too many requests, try again later' }
});

// Stricter limiter for login routes
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many login attempts, try again later' }
});

module.exports = { globalLimiter, loginLimiter };
