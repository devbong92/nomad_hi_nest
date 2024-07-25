import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // true로 설정하면, 유효성 검사기는 유효성 검사 데코레이터를 사용하지 않는 모든 속성을 유효성 검사된(반환된) 객체에서 제거합니다
    forbidNonWhitelisted: true,   // true로 설정하면, 허용 목록에 없는 속성을 제거하는 대신 유효성 검사기가 예외를 발생시킵니다
    transform: true,              // 데이터 형변환을 자동으로 해줌
  }));
  await app.listen(3000);
}
bootstrap();
