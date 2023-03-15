import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)
  app.use(cookieParser());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJs')
    .setDescription('API development throught the api with NestJs')
    .setVersion('1.0')
    .build()

  app.setGlobalPrefix('api')
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  app.useGlobalPipes(new ValidationPipe());

  const port = configService.get('PORT', 3000)
  await app.listen(port);
}
bootstrap();
