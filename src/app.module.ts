import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
// import { MovieModule } from './domain/nodes/movie/movie.module';
// import { PersonModule } from './domain/nodes/person/person.module';
// import { UsersModule } from './domain/nodes/user/user.module';
import { Neo4jModule } from './modules/neo4j/neo4j.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { EncryptionModule } from './modules/encryption/encryption.module';
import { GenreModule } from './modules/genre/genre.module';
import { SubscriptionModule } from './modules/subscription/subscription.module';
import { PlanModule } from './modules/plan/plan.module';

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
    Neo4jModule.forRoot(),
    AuthModule,
    UserModule,
    EncryptionModule,
    SubscriptionModule,
    GenreModule,
    PlanModule,
    // PersonModule,
    // MovieModule,
    // UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
