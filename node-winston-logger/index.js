import winston from 'winston';
import 'winston-daily-rotate-file';

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    // simple, json, prettyPrint, colorize
    winston.format.label({ label: 'orderFunc | ' }),
    winston.format.timestamp(),
    // winston.format.json(),
    winston.format.simple(),
  ),
  transports: [
    new winston.transports.Console(),
    // new winston.transports.File({
    new winston.transports.DailyRotateFile({
      dirname: 'log-rotate',
      filename: 'nest-demo-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxsize: '1024', // kb
    }),
    new winston.transports.Http({
      host: 'localhost',
      port: 3000,
      path: 'usr/log',
    }),
  ],
});

logger.error('1111111');
logger.warn('2222222');
logger.info('3333333');
