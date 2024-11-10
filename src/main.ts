import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
    abortOnError: false,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home music library service')
    .setDescription('Home music library API description')
    .setVersion('1.0.0')
    .addTag('Users')
    .addTag('Tracks')
    .addTag('Artists')
    .addTag('Albums')
    .addTag('Favorites')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('doc', app, documentFactory);

  await app.listen(process.env.PORT || 4000);
}

bootstrap();
