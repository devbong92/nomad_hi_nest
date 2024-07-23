import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,  // 데이터 타입 형태를 체크해줌
    transform: true,    // 데이터 형변환을 자동으로 해줌
  }));
  await app.listen(3000);
}
bootstrap();
