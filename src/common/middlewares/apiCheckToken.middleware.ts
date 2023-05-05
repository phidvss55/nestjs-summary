import { NextFunction } from 'express';
import { Request } from 'express';
import { NestMiddleware } from '@nestjs/common';
import { ApiTokenPaymentException } from '../exceptions/apiTokenCheck.exception';

export class ApiTokenCheckMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers['api-token'] && req.headers['api-token'] !== 'my-token') {
      throw new ApiTokenPaymentException();
    }
    next();
  }
}
