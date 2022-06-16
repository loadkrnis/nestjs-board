import { Injectable } from '@nestjs/common';
import { ArticleQueryRepository } from '../article/ArticleQueryRepository';
import { BoardRequest } from './dto/BoardRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@libs/entity/domain/article/Article';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article)
    private articleQueryRepository: ArticleQueryRepository,
  ) {}

  async create(boardRequest: BoardRequest) {
    await this.articleQueryRepository.save(boardRequest.toEntity());
  }
}
