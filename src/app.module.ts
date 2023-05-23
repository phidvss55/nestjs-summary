import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentModule } from './modules/student/student.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_URL: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    MongooseModule.forRoot(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/research_mongodb'),
    StudentModule,
    /*DatabaseModule,
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,*/
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
