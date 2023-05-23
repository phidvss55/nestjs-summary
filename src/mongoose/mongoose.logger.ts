import { Logger } from '@nestjs/common';

export class MongooseLoggerService {
  private readonly logger: Logger;

  constructor() {
    this.logger = new Logger('Mongoose');
  }

  log(message: string) {
    this.logger.log(message);
    // You can perform additional actions here, such as logging to a file or external service
  }

  error(message: string, trace: string) {
    this.logger.error(message, trace);
    // You can perform additional actions here, such as logging to a file or external service
  }

  warn(message: string) {
    this.logger.warn(message);
    // You can perform additional actions here, such as logging to a file or external service
  }

  debug(message: string) {
    this.logger.debug(message);
    // You can perform additional actions here, such as logging to a file or external service
  }

  verbose(message: string) {
    this.logger.verbose(message);
    // You can perform additional actions here, such as logging to a file or external service
  }
}
