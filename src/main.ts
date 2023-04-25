import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import ExcludeNullInterceptor from './utils/excludeNull.interceptor';
//import { ConfigService } from '@nestjs/config';

// declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Inject exception filter
  // const { httpAdapter } = app.get(HttpAdapterHost);
  // app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

  // Inject validation
  app.useGlobalPipes(new ValidationPipe());

  // Inject interceptors
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('API Swagger')
    .setDescription('API generate routes')
    .setVersion('1.0')
    .build();

  app.setGlobalPrefix('api');

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
