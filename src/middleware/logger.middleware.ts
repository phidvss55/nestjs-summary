import { NestMiddleware } from "@nestjs/common/interfaces";
import { NextFunction, Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("Middleware triggered.");
    next();
  }
}