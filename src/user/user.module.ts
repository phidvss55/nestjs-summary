import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import AddressEntity from './entities/address.entity';
import Post from '../post/entities/post.entity';
import { FileModule } from '../file/file.module';
import { DatabaseModule } from '../database/database.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserEntity, AddressEntity, Post]), FileModule, DatabaseModule],
})
export class UserModule {}
