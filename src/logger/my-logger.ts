import { LoggerService, LogLevel } from '@nestjs/common';

/**
 *  This is a custom logger that implements the LoggerService interface.
 **/
export class MyLogger implements LoggerService {
  log(message: string, context: string) {
    console.log(
      `[Log-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    );
  }

  error(message: string, context: string) {
    console.log(
      `[Error-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    );
  }

  warn(message: string, context: string) {
    console.warn(
      `[Warn-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    );
  }

  debug(message: string, context: string) {
    console.debug(
      `[Debug-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    );
  }

  verbose(message: string, context: string) {
    console.info(
      `[Verbose-Custom] ${new Date().toISOString()} - ${context}: ${message}`,
    );
  }

  setLogLevels(levels: LogLevel[]) {
    // This method can be used to set the log levels dynamically
    // For simplicity, we are not implementing any logic here
    console.log(`Log levels set to: ${levels.join(', ')}`);
  }
}
