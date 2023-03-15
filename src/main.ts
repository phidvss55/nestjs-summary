import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API with NestJs')
    .setDescription('API development throught the api with NestJs')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)
  const port = configService.get('PORT', 3000)

  app.setGlobalPrefix('api')

  await app.listen(port);
}
bootstrap();
