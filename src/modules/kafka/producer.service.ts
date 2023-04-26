import { Producer, Kafka, ProducerRecord } from 'kafkajs';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly kafka = new Kafka({
    brokers: ['localhost:9092'],
  });

  private readonly producer: Producer = this.kafka.producer();

  async onModuleInit() {
    await this.producer.connect();
  }

  async produce(record: ProducerRecord) {
    await this.producer.send(record);
  }

  async onApplicationShutdown(signal?: string) {
    await this.producer.disconnect();
  }
}
