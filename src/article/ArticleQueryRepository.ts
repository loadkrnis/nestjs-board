import { EntityRepository, Repository } from 'typeorm';
import { Article } from '@libs/entity/domain/article/Article';

@EntityRepository(Article)
export class ArticleQueryRepository extends Repository<Article> {
  async findOfPage(
    offset: number,
    limit: number,
  ): Promise<[Article[], number]> {
    return this.createQueryBuilder()
      .orderBy('id', 'DESC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();
  }
}
