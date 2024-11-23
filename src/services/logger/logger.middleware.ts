import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './custom-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: CustomLogger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { body, query, url, params, method } = req;
    const { statusCode } = res;

    const handleFinish = () => {
      const preparedMessage = this.prepareLogInfo(
        url,
        method,
        query,
        params,
        body,
        statusCode,
      );

      this.loggerService.log(preparedMessage);
    };

    res.on('finish', handleFinish);

    next();
  }

  prepareLogInfo(
    url: Request['url'],
    method: Request['method'],
    query: Request['query'],
    params: Request['params'],
    body: Request['body'],
    statusCode: Response['statusCode'],
  ): string {
    return `Server got request with url:${url}, method:${method}, params:${params ? JSON.stringify(params) : 'without parameters'}, queryParams:${query ? JSON.stringify(query) : 'without query params'} and body: ${body ? JSON.stringify(body) : "wasn't provided"}. And response with status code: ${statusCode}`;
  }
}
