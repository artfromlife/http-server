import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter} from './filters/http-exception.filter';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { loggerMiddleware } from './middleware/logger.middleware';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthGuard } from './guards/auth.guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, );
  app.useGlobalGuards(new AuthGuard())
  // 错误封装 全局异常过滤
  app.useGlobalFilters(new HttpExceptionFilter())
  // 成功封住 全局的响应拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 创建路由前缀 全局的路由前缀
  app.setGlobalPrefix('nest/');
  // swagger 接口文档
  const config = new DocumentBuilder()
    .setTitle('NEST接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  // 开启dto数据验证 全局管道数据验证, whiteList filter fields not in dto
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true // 参数校验第一个出错, 就直接返回
  }));
  // 使用全局中间件
  app.use(loggerMiddleware)
  // replace nest logger
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  await app.listen(3000);
}
bootstrap().then(() => {
  console.log(`Swagger is running at http://localhost:3000/swagger`)
}).catch(console.log);
