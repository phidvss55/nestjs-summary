import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { ConsumerSubscribeTopic, ConsumerConfig, KafkaMessage } from 'kafkajs';
import { KafkajsConsumer } from './kafkajs.consumer';
import { ConfigService } from '@nestjs/config';
import { IConsumer } from './consumer.interface';

export interface KafkajsConsumerOptions {
  topic: ConsumerSubscribeTopic;
  config: ConsumerConfig;
  onMessage: (message: KafkaMessage) => Promise<void>;
}

@Injectable()
export class ConsumerService implements OnApplicationShutdown {
  // private readonly kafka = new Kafka({
  //   brokers: ['localhost:9092'],
  // });

  private readonly consumers: IConsumer[] = [];

  constructor(private readonly configService: ConfigService) {}

  // async consume(topic: ConsumerSubscribeTopic, config: ConsumerRunConfig) {
  // const consumer = this.kafka.consumer({ groupId: 'nestjs-kafka' });
  // await consumer.connect();
  // await consumer.subscribe(topic);
  // await consumer.run(config);
  // this.consumers.push(consumer);
  // }

  async consume({ topic, config, onMessage }: KafkajsConsumerOptions) {
    // const consumer = new KafkajsConsumer(topic, config, this.configService.get('KAFKA_BROKER'));
    const consumer = new KafkajsConsumer(topic, config, 'localhost:9092');

    await consumer.connect();
    await consumer.consume(onMessage);
    this.consumers.push(consumer);
  }

  async onApplicationShutdown() {
    for (const consumer of this.consumers) {
      await consumer.disconnect();
    }
  }
}
