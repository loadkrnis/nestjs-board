import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { BoardService } from './BoardService';
import { BoardRequest } from './dto/BoardRequest';
import { ResponseEntity } from '@libs/web-common/res/ResponseEntity';
import { Logger } from '@libs/logger/Logger';
import { BoardDetailResponse } from './dto/BoardDetailResponse';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly logger: Logger,
  ) {}

  @Post()
  async create(
    @Body() boardRequest: BoardRequest,
  ): Promise<ResponseEntity<string>> {
    try {
      await this.boardService.create(boardRequest);
      return ResponseEntity.OK();
    } catch (e) {
      this.logger.error(
        `BoardController create UnknownException: boardRequest=${boardRequest}`,
        e,
      );
      return ResponseEntity.ERROR();
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    try {
      const article = await this.boardService.findOneById(id);
      return ResponseEntity.OK_WITH(new BoardDetailResponse(article));
    } catch (e) {
      if (e instanceof NotFoundException) {
        this.logger.info(
          `BoardController findOne NotFoundException: id=${id}`,
          e,
        );
        return ResponseEntity.ERROR_WITH(e.message, HttpStatus.NOT_FOUND);
      }
      this.logger.error(
        `BoardController findOne UnknownException: id=${id}`,
        e,
      );
      return ResponseEntity.ERROR();
    }
  }
}
