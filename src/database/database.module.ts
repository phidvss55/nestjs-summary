import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import ProductEntity from '../entities/product.entity';
// import CategoryEntity from '../entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('MYSQL_HOST'),
        port: configService.get('MYSQL_PORT'),
        username: configService.get('MYSQL_USER'),
        password: configService.get('MYSQL_PASSWORD'),
        database: configService.get('MYSQL_DB'),
        // entities: [
        //     __dirname + '/../**/*.entity{.ts,.js}'
        // ],
        // entities: [ProductEntity,CategoryEntity],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
