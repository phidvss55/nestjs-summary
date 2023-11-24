import { config } from 'dotenv';
config();

import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Item } from '../modules/items/entities/item.entity';
import { Listing } from '../modules/items/entities/listing.entity';
import { Tag } from '../modules/items/entities/tag.entity';
import { Comment } from '../modules/items/entities/comment.entity';

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('DATABASE_HOST'),
  port: configService.getOrThrow('DATABASE_PORT'),
  database: configService.getOrThrow('DATABASE_DATABASE'),
  username: configService.getOrThrow('DATABASE_USERNAME'),
  password: configService.getOrThrow('DATABASE_PASSWORD'),
  migrations: ['src/migrations/**'],
  entities: [Item, Listing, Comment, Tag],
});
