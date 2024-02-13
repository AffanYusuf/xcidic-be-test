import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('XCIDIC Service')
    .setDescription('XCIDIC Test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  const port = process.env.APP_PORT;
  await app.listen(port);

  console.info(`Service running localhost:${port}`);
  console.info(`Swagger running localhost:${port}/api`);
}
bootstrap();
