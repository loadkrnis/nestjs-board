import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleQueryRepository } from '../article/ArticleQueryRepository';
import { BoardRequest } from './dto/BoardRequest';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from '@libs/entity/domain/article/Article';
import { EntityNotFoundError } from 'typeorm';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article)
    private articleQueryRepository: ArticleQueryRepository,
  ) {}

  async create(boardRequest: BoardRequest): Promise<void> {
    await this.articleQueryRepository.save(boardRequest.toEntity());
  }

  async findOneById(id: number): Promise<Article> {
    try {
      return await this.articleQueryRepository.findOneOrFail(id);
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException('존재하지 않습니다.');
      }
      throw e;
    }
  }
}
