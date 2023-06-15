import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
// import { Neo4jModule } from './modules/neo4j/neo4j.module';
// import { AuthModule } from './modules/auth/auth.module';
// import { UserModule } from './modules/user/user.module';
// import { EncryptionModule } from './modules/encryption/encryption.module';
// import { GenreModule } from './modules/genre/genre.module';
// import { SubscriptionModule } from './modules/subscription/subscription.module';
// import { PlanModule } from './modules/plan/plan.module';
import { MulterModule } from '@nestjs/platform-express';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.number(),
        DATABASE_SCHEME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
    // Neo4jModule.forRoot(),
    // AuthModule,
    // UserModule,
    // EncryptionModule,
    // SubscriptionModule,
    // GenreModule,
    // PlanModule,
    MulterModule.register({ dest: './uploads' }),
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
