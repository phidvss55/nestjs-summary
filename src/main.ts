import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { MyLogger } from './logger/my-logger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['log', 'error', 'warn', 'debug'],
    logger: new MyLogger(),
    bufferLogs: true,
  });

  // app.useLogger(app.get(MyLoggerDev));
  app.useLogger(new MyLogger());

  app.useGlobalPipes(new ValidationPipe());

  // app.enableCors();

  // app.useStaticAssets(join(__dirname, '..', 'public'), {
  //   prefix: '/public/',
  // });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}

bootstrap();
