const morgan = require('morgan');
const { createLogger, transports, format } = require('winston');
const path = require('path');
const fs = require('fs');

// Ensure logs folder exists
const logDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Winston Logger for errors and combined logs
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

// Morgan Middleware to log HTTP requests through Winston
const morganMiddleware = morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
});

// Export properly for use in server.js
module.exports = {
  logger,
  morganMiddleware
};
