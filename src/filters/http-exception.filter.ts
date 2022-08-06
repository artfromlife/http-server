import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // const status = exception.getStatus();
    global.logger.error(exception.stack,exception.getResponse())
    response
      .status(200) // 接口只要访问成功就是 200
      .json({
        code: 500, // 异常统一给个500, 可以通过 data 中的 statusCode 来获取真正的状态码
        data: exception.getResponse(),
        time: new Date().toISOString(),
        path: request.url,
      });
  }
}
