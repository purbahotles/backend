const winston = require('winston');

// Create a logger instance
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: winston.format.combine(
    winston.format.timestamp(), // Add timestamp
    winston.format.json() // Log as JSON
  ),
  transports: [
    new winston.transports.Console(), // Log to console
    new winston.transports.File({ filename: 'combined.log' }) // Log to a file
  ]
});

// Export the logger
module.exports = logger;
