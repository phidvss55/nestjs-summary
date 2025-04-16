import { Consumer, Kafka, ConsumerSubscribeTopic, ConsumerConfig, KafkaMessage } from 'kafkajs';
import { IConsumer } from './consumer.interface';
import { Logger } from '@nestjs/common';
import * as retry from 'async-retry';

export class KafkajsConsumer implements IConsumer {
  private readonly kafka: Kafka;
  private readonly consumer: Consumer;
  private readonly logger: Logger;

  constructor(private readonly topic: ConsumerSubscribeTopic, config: ConsumerConfig, broker: string) {
    this.kafka = new Kafka({ brokers: [broker] });
    this.consumer = this.kafka.consumer(config);
    this.logger = new Logger(`${topic.topic}-${config.groupId}`);
  }

  connect = async () => {
    try {
      await this.consumer.connect();
    } catch (err) {
      this.logger.error('Failed to connect to kafka.', err);
      await this.sleep(4000);
      await this.connect();
    }
  };

  async consume(onMessage: (message: any) => Promise<void>) {
    await this.consumer.subscribe(this.topic);
    await this.consumer.run({
      eachMessage: async ({ message, partition }) => {
        this.logger.debug(`Processing message partition: ${partition}`);
        try {
          await retry(async () => onMessage(message), {
            retries: 3,
            onRetry: (error, attempt) =>
              this.logger.error(`Error consuming message, executing retry ${attempt}/3...`, error),
          });
        } catch (err) {
          this.logger.error(`Error consuming message.Adding to dead letter queue ... `, err);
          await this.addMessageToDlq(message);
        }
      },
    });
  }

  private async addMessageToDlq(message: KafkaMessage) {
    console.log('message', message);
  }

  sleep = async (timeout: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, timeout));
  };

  disconnect = async () => {
    await this.consumer.disconnect();
  };
}
