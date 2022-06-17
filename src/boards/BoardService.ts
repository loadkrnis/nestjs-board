import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleQueryRepository } from '../article/ArticleQueryRepository';
import { BoardRequest } from './dto/BoardRequest';
import { Article } from '@libs/entity/domain/article/Article';
import { EntityManager, EntityNotFoundError } from 'typeorm';

@Injectable()
export class BoardService {
  private articleQueryRepository: ArticleQueryRepository;

  constructor(em: EntityManager) {
    this.articleQueryRepository = em.getCustomRepository(
      ArticleQueryRepository,
    );
  }

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

  async deleteById(id: number): Promise<void> {
    await this.articleQueryRepository.softDelete(id);
  }

  async findOfPage(
    offset: number,
    limit: number,
  ): Promise<[Article[], number]> {
    return this.articleQueryRepository.findOfPage(offset, limit);
  }
}
