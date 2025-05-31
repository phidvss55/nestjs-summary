import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MyLoggerDev } from '@src/logger/my-logger.dev';

@Module({
  controllers: [UserController],
  providers: [UserService, MyLoggerDev],
})
export class UserModule {}
