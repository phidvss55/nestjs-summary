import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database/database.module';
import { KafkaModule } from './modules/kafka/kafka.module';
import { PostsModule } from './modules/posts/posts.module';
import { TestConsumer } from './modules/posts/test.consumer';

@Module({
  controllers: [],
  providers: [TestConsumer],
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_TYPE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    DatabaseModule,
    KafkaModule,
    PostsModule,
  ],
})
export class AppModule {}
