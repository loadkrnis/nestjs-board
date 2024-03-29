import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BoardService } from './BoardService';
import { BoardRequest } from './dto/BoardRequest';
import { ResponseEntity } from '@libs/web-common/res/ResponseEntity';
import { Logger } from '@libs/logger/Logger';
import { BoardDetailResponse } from './dto/BoardDetailResponse';
import { PageRequest } from '@libs/web-common/req/PageRequest';
import { Pagination } from '@libs/web-common/res/Pagination';

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
      return ResponseEntity.OK(HttpStatus.CREATED);
    } catch (e) {
      this.logger.error(
        `BoardController create UnknownException: boardRequest=${boardRequest}`,
        e,
      );
      return ResponseEntity.ERROR();
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: number) {
    try {
      await this.boardService.deleteById(id);
      return ResponseEntity.OK();
    } catch (e) {
      this.logger.error(`BoardController delete UnknownException: id=${id}`, e);
      return ResponseEntity.ERROR();
    }
  }

  @Get()
  async findAll(
    @Query() pageRequest: PageRequest,
  ): Promise<ResponseEntity<Pagination<BoardDetailResponse> | string>> {
    try {
      const [articles, total] = await this.boardService.findOfPage(
        pageRequest.offset,
        pageRequest.limit,
      );

      return ResponseEntity.OK_WITH(
        new Pagination<BoardDetailResponse>(
          pageRequest.pageNumber,
          total,
          pageRequest.pageSize,
          articles.map((article) => new BoardDetailResponse(article)),
        ),
      );
    } catch (e) {
      this.logger.error(
        `BoardController findAll UnknownException: id=${JSON.stringify(
          pageRequest,
        )}`,
        e,
      );
      return ResponseEntity.ERROR();
    }
  }

  @Get('/count')
  async getCount(): Promise<ResponseEntity<number | string>> {
    try {
      const result = await this.boardService.findBoardCount();
      return ResponseEntity.OK_WITH(result);
    } catch (e) {
      this.logger.error(`BoardController count UnknownException:`, e);
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
