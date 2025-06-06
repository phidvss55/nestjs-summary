import { Producer, Kafka, ProducerRecord, Message } from 'kafkajs';
import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { IProducer } from './producer.interface';
import { ConfigService } from '@nestjs/config';
import { KafkajsProducer } from './kafkajs.producer';

@Injectable()
export class ProducerService implements OnApplicationShutdown {
  private readonly producers = new Map<string, IProducer>();
  constructor(private readonly configService: ConfigService) {}

  async produce(topic: string, message: Message) {
    const producer = await this.getProducer(topic);
    await producer.produce(message);
  }

  private async getProducer(topic: string) {
    let producer = this.producers.get(topic);
    if (!producer) {
      producer = new KafkajsProducer(topic, 'localhost:9092');
      await producer.connect();
      this.producers.set(topic, producer);
    }
    return producer;
  }

  async onApplicationShutdown(signal?: string) {
    for (const producer of this.producers.values()) {
      await producer.disconnect();
    }
  }
}
