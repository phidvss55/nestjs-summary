import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import PostEntity from './entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronPostService } from './posts.cron.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), AuthModule, UsersModule],
  providers: [PostsService, CronPostService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
