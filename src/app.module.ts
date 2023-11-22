import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { ItemsModule } from './modules/items/items.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        ELASTICSEARCH_NODE: Joi.string().required(),
        ELASTICSEARCH_INDEX: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
      },
      isGlobal: true,
    }),
    DatabaseModule,
    ItemsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
