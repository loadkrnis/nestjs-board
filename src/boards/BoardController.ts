import { Controller, Get } from '@nestjs/common';
import { Logger } from '@libs/logger/Logger';
import { BoardService } from './BoardService';

@Controller()
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    this.logger.error('hello');
    return this.boardService.getHello();
  }
}
