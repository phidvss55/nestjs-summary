import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwtAuth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PostsModule } from './modules/posts/posts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), AuthModule, UsersModule, PostsModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      // useClass: JwtAuthGuard, //concrete class
      useExisting: JwtAuthGuard, 
    },
    JwtAuthGuard,
  ],
})
export class AppModule {}
