import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ 
    origin: ['https://kimballllly.github.io', 'https://kimballllly.github.io/Student-management/'],
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization"
  });

  await app.listen(3000);
}

bootstrap();
