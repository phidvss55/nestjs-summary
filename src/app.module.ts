import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendModule } from './backend/backend.module';
import { FrontendModule } from './frontend/frontend.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    BackendModule,
    FrontendModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MYSQL_HOST: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_DB: Joi.string().required(),
        MYSQL_PASSWORD: Joi.optional(),
        PORT: Joi.number(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
