import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';
const logger = new Logger()
export function loggerMiddleware (req: Request, res: Response, next: NextFunction) {
    const { url, method } = req
    // 请求API 日志打印
    logger.log(`url: ${url} | method: ${method}`,loggerMiddleware.name);
    next();
}
