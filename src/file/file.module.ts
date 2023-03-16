import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import File from './file.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [FileController],
  imports: [
    TypeOrmModule.forFeature([File]),
    ConfigModule
  ],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
