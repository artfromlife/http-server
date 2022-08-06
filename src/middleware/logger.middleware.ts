import { Request, Response, NextFunction } from 'express';
export function loggerMiddleware (req: Request, res: Response, next: NextFunction) {
    const { url, method } = req
    // 请求API 日志打印
    global.logger.log(`${method} | ${url} `);
    next();
}
