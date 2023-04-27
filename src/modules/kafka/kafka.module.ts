import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerService } from './consumer.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
  imports: [ConfigModule],
})
export class KafkaModule {}
