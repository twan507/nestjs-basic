import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { TransformInterceptor } from './core/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,);

  //Khai báo configService để sử dụng biến .env trong cổng PORT
  const configService = app.get(ConfigService)

  //Khai báo Guard global để bảo vệ tất cả các route
  const reflector = app.get(Reflector)
  app.useGlobalGuards(new JwtAuthGuard(reflector))

  //Khai báo các app để sử dụng viewengine ejs
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  //Khai báo global việc check validation trong các file DTO
  app.useGlobalPipes(new ValidationPipe())

  //Sửa lỗi CORS, trường origin dùng để định nghĩa các domain có thể truy cập backend
  app.enableCors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false
  });

  //Khai báo intercepter global để chuẩn hoá dữ liệu đầu ra
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  //Câu lệnh sử dụng để bắn dự án lên cổng local host
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
