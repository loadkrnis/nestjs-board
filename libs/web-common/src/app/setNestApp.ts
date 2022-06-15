import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { CustomValidationError } from '@libs/web-common/pipe/validation/CustomValidationError';
import { GlobalExceptionFilter } from '@libs/web-common/filter/GlobalExceptionFilter';
import { Logger } from '@libs/logger/Logger';

export function setNestApp(app: INestApplication): void {
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(Logger)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validationError: {
        value: true,
      },
      exceptionFactory: (validationErrors: ValidationError[] = []) =>
        new BadRequestException(
          validationErrors.map((e) => new CustomValidationError(e)),
        ),
    }),
  );
}
