import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepository, Repository } from 'typeorm';
import { Article } from '@libs/entity/domain/article/Article';
import { LocalTypeOrmModule } from '../../../libs/entity/LocalTypeOrmModule';
import { getRepositoryToken } from '@nestjs/typeorm';
import { closeNestApp } from '../../util/closeNestApp';
import { ArticleModule } from '@libs/entity/domain/article/ArticleModule';
import { ArticleQueryRepository } from '../../../src/article/ArticleQueryRepository';

describe('ArticleQueryRepository', () => {
  let module: TestingModule;
  let articleQueryRepository: ArticleQueryRepository;
  let articleRepository: Repository<Article>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [LocalTypeOrmModule, ArticleModule, ArticleQueryRepository],
    }).compile();

    articleRepository = module.get(getRepositoryToken(Article));
    articleQueryRepository = getCustomRepository(ArticleQueryRepository);
  });

  beforeEach(async () => {
    await articleRepository.clear();
  });

  afterAll(async () => {
    await closeNestApp(module);
  });

  describe('findOfPage', () => {
    it.each([
      [
        '총 페이지 수를 넘어서는 페이지번호로 요청하면 빈배열을 반환한다',
        10, // insert 데이터 개수
        2, // offset
        10, // limit
        8, // 반환되는 article 개수
        10, // 반환되는 total 값
      ],
      ['조건에 해당하는 데이터가 없으면 빈배열을 반환한다', 0, 1, 5, 0, 0],
      ['첫 번째 페이지에 대한 데이터를 정상적으로 가져온다', 10, 0, 5, 5, 10],
      ['두 번째 페이지에 대한 데이터를 정상적으로 가져온다', 7, 2, 5, 5, 7],
    ] as const)(
      '%s',
      async (
        _,
        savedArticleCount: number,
        offset: number,
        limit: number,
        expectedArticleCount: number,
        expectedTotal: number,
      ) => {
        // given
        await createArticles(savedArticleCount);

        // when
        const [articles, total] = await articleQueryRepository.findOfPage(
          offset,
          limit,
        );

        // then
        expect(articles).toHaveLength(expectedArticleCount);
        expect(total).toBe(expectedTotal);
      },
    );
  });

  async function createArticles(count: number) {
    await Promise.all(
      Array.from({ length: count }).map(async (_, index) =>
        articleRepository.save(Article.create('title', `${index}`)),
      ),
    );
  }
});
