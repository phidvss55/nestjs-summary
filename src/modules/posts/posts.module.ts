import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import PostEntity from './entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CronPostService } from './posts.cron.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostsService, CronPostService],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
