import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import * as dotenv from 'dotenv';

dotenv.config();

// Define log file path and other configurations from environment variables
const logFilePath = process.env.LOG_FILE_PATH || 'logs/configuration-properties-api.log';

// Create a logger instance with rolling file transport
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: logFilePath,
      datePattern: 'YYYY-MM-DD',
      maxSize: '10m',
      maxFiles: '10',
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  ],
});

export default logger;