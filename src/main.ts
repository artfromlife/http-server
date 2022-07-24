import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter} from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 错误封装 全局异常过滤
  app.useGlobalFilters(new HttpExceptionFilter())
  // 成功封住 全局的响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 创建路由前缀
  app.setGlobalPrefix('nest/v1');
  // swagger 接口文档
  const config = new DocumentBuilder()
    .setTitle('NEST接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // 开启dto数据验证 全局管道数据验证
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap().then().catch(console.log);
