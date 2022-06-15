import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from '@libs/logger/Logger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.error('hello');
    return this.appService.getHello();
  }
}
