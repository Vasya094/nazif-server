import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function main() {
  const PORT = process.env.PORT || 5000;
  const config = new DocumentBuilder()
    .setTitle('Nazif BACKEND')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('Ama')
    .build();
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () =>
    console.log(
      `Server started on: ${PORT}. DB host: ${process.env.POSTGRES_HOST}`,
    ),
  );
}
main();
