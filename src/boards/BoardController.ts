import { Body, Controller, Post } from '@nestjs/common';
import { BoardService } from './BoardService';
import { BoardRequest } from './dto/BoardRequest';
import { ResponseEntity } from '@libs/web-common/res/ResponseEntity';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(
    @Body() boardRequest: BoardRequest,
  ): Promise<ResponseEntity<string>> {
    await this.boardService.create(boardRequest);
    return ResponseEntity.OK();
  }
}
