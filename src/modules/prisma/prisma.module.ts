import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  providers: [ConfigModule, PrismaService],
  controllers: [],
  exports: [PrismaService],
})
export class PrismaModule {}
