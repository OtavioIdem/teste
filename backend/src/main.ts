import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParse from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe);

  app.use(cookieParse());

  app.enableCors({
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true
  })

  const config = new DocumentBuilder()
  .setTitle('API Development')
  .setDescription('Nothing read')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    bearerFormat: 'JWT',
    name: 'Authorization',
    description: 'Insert token JWT',
    in: 'header',
  }, 'JWT-auth')

  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger/v1', app, document);

  const port = process.env.PORT;
  app.listen(port ?? 3000, () =>{
    console.log(`Server Running: http://localhost:${port}`);
  });
}
bootstrap();
