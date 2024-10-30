import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://nextjs-auth-frontend-git-main-to-phng-hius-projects.vercel.app',
      'https://nextjs-auth-frontend.vercel.app',
      'https://nextjs-auth-frontend-boflcxntc-to-phng-hius-projects.vercel.app'
    ],
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();