import { ConsoleLogger } from '@nestjs/common';

/**
 * Custom logger for development environment that extends NestJS ConsoleLogger.
 * It formats log messages with timestamps and context.
 * This is logger for system
 */
export class MyLoggerDev extends ConsoleLogger {
  log(message: string, context?: string) {
    console.log(
      `[Log] ${new Date().toISOString()} - ${context || 'DefaultContext'}: ${message}`,
    );
  }

  error(message: string, trace?: string, context?: string) {
    console.error(
      `[Error] ${new Date().toISOString()} - ${context || 'DefaultContext'}: ${message}`,
      trace,
    );
  }

  warn(message: string, context?: string) {
    console.warn(
      `[Warn] ${new Date().toISOString()} - ${context || 'DefaultContext'}: ${message}`,
    );
  }

  debug(message: string, context?: string) {
    console.debug(
      `[Debug] ${new Date().toISOString()} - ${context || 'DefaultContext'}: ${message}`,
    );
  }

  verbose(message: string, context?: string) {
    console.info(
      `[Verbose] ${new Date().toISOString()} - ${context || 'DefaultContext'}: ${message}`,
    );
  }
}
