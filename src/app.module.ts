import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'config/datasource';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PostsModule } from './modules/posts/posts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  // imports: [TypeOrmModule.forRoot(dataSourceOptions), ConfigModule.forRoot(), AuthModule, UsersModule, PostsModule],
  imports: [DatabaseModule, ConfigModule.forRoot(), AuthModule, UsersModule, PostsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
