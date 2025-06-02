import { LoggerService, LogLevel } from '@nestjs/common';
import chalk from 'chalk';
import dayjs from 'dayjs';
import { createLogger, format, Logger, transports } from 'winston';

/**
 *  This is a custom logger that implements the LoggerService interface.
 **/
export class MyLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'debug',
      // format: format.combine( // without chalk + dayjs
      //   format.colorize(),
      //   format.timestamp(),
      //   format.simple(),
      // ),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            // format.timestamp({
            //   format: 'YYYY-MM-DD HH:mm:ss',
            // }),
            format.printf(({ context, message, level, time }) => {
              const strApp = chalk.green('[NEST]');
              const strContext = chalk.yellow(`[${context as string}]`);

              return `${strApp} - ${time as string} ${level} ${strContext} ${message as string}`;
            }),
          ),
        }),
        new transports.File({
          format: format.combine(format.timestamp(), format.json()),
          dirname: 'logs',
          filename: 'demo.log',
        }),
      ],
    });
  }

  log(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, time });
    // this.logger.log('info', `[${context}] - ${message}`);
    // console.log(
    //   `[Log-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    // );
  }

  error(message: string, context: string) {
    this.logger.log('error', `[${context}] - ${message}`);
    // console.log(
    //   `[Error-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    // );
  }

  warn(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('info', message, { context, time });

    this.logger.log('warn', `[${context}] - ${message}`);
    // console.warn(
    //   `[Warn-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    // );
  }

  debug(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('debug', message, { context, time });

    // this.logger.log('debug', `[${context}] - ${message}`);
    // console.debug(
    //   `[Debug-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    // );
  }

  verbose(message: string, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('verbose', message, { context, time });

    // this.logger.log('verbose', `[${context}] - ${message}`);
    // console.info(
    //   `[Verbose-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    // );
  }

  fatal(message: any, context: string) {
    const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    this.logger.log('fatla', message, { context, time });

    // this.logger.log('fatla', `[${context}] - ${message}`);
  }

  setLogLevels(levels: LogLevel[]) {
    console.log(`Log levels set to: ${levels.join(', ')}`);
  }
}
