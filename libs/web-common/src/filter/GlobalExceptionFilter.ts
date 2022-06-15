import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Logger } from '@libs/logger/Logger';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { ResponseEntity } from '@libs/web-common/res/ResponseEntity';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost): any {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.logger.error(
      `GlobalExceptionFilter unknown Exception:
      path=${request.url},
      body=${JSON.stringify(request.body)},
      `,
      exception as Error,
    );

    response
      .status(HttpStatus.OK)
      .json(instanceToPlain(ResponseEntity.ERROR()));
  }
}
