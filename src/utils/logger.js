const winston = require('winston');

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: combine(
    label({ label: 'Telegram Music Downloader Bot' }),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console(),
    // Add file logging or other transports as needed
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = { logger };