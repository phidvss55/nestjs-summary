import { Neo4jModule } from './modules/neo4j/neo4j.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module';
import * as Joi from '@hapi/joi';
import { MovieModule } from './domain/nodes/movie/movie.module';
import { PersonModule } from './domain/nodes/person/person.module';
import { UsersModule } from './domain/nodes/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        DATABASE_SCHEME: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
      }),
    }),
    // DatabaseModule,
    Neo4jModule.forRootAsync(),
    PersonModule,
    MovieModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
