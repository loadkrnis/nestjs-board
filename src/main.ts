import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { setNestApp } from '@libs/web-common/app/setNestApp';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);

  const config = new DocumentBuilder()
    .setTitle('게시판 API')
    .setDescription('게시판 CRUD 입니다.')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}

void bootstrap();
