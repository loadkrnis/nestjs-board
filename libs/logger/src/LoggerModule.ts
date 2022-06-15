import { Global, Module } from '@nestjs/common';
import { Logger } from '@libs/logger/Logger';
import { createLogger } from 'winston';
import { getWinstonLoggerOption } from '@libs/logger/getWinstonLoggerOption';

@Global()
@Module({
  providers: [
    {
      provide: Logger,
      useFactory: () => createLogger(getWinstonLoggerOption()),
    },
  ],
  exports: [Logger],
})
export class LoggerModule {}
