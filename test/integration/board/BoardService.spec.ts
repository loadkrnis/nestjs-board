import { BoardService } from '../../../src/boards/BoardService';
import { Test, TestingModule } from '@nestjs/testing';
import { LocalTypeOrmModule } from '../../../libs/entity/LocalTypeOrmModule';
import { Repository } from 'typeorm';
import { Article } from '@libs/entity/domain/article/Article';
import { BoardRequest } from '../../../src/boards/dto/BoardRequest';
import { BoardModule } from '../../../src/boards/BoardModule';
import { getRepositoryToken } from '@nestjs/typeorm';
import { LoggerModule } from '@libs/logger/LoggerModule';
import { closeNestApp } from '../../util/closeNestApp';
import { NotFoundException } from '@nestjs/common';
import { ArticleQueryRepository } from '../../../src/article/ArticleQueryRepository';

describe('BoardService', () => {
  let module: TestingModule;
  let boardService: BoardService;
  let articleRepository: Repository<Article>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        LocalTypeOrmModule,
        LoggerModule,
        BoardModule,
        ArticleQueryRepository,
      ],
    }).compile();

    boardService = module.get(BoardService);
    articleRepository = module.get(getRepositoryToken(Article));
  });

  beforeEach(async () => {
    await articleRepository.clear();
  });

  afterAll(async () => {
    await closeNestApp(module);
  });

  describe('create', () => {
    it('article 을 저장한다.', async () => {
      // given
      const title = '안녕하세요';
      const content = '내용입니다.';
      const boardRequest = BoardRequest.of(title, content);

      // when
      await boardService.create(boardRequest);

      // then
      const articles = await articleRepository.find();
      expect(articles).toHaveLength(1);
      expect(articles[0].content).toBe(content);
      expect(articles[0].title).toBe(title);
    });
  });

  describe('findOneById', () => {
    it('id 가 일치하는 article 이 존재하면 조회된다.', async () => {
      // given
      const article = await articleRepository.save(
        Article.create('제목', '내용'),
      );

      // when
      const result = await boardService.findOneById(article.id);

      // then
      expect(result.id).toBe(article.id);
    });

    it('id 가 일치하는 article 이 없으면 NotFoundException 을 던진다.', async () => {
      // given
      // when
      const t = async () => {
        await boardService.findOneById(1);
      };

      // then
      await expect(t()).rejects.toThrowError(NotFoundException);
    });
  });

  describe('deleteById', () => {
    it('id 가 일치하는 article 을 삭제한다.', async () => {
      // given
      const article = await articleRepository.save(
        Article.create('제목', '내용'),
      );

      // when
      await boardService.deleteById(article.id);

      // then
      const articles = await articleRepository.find();
      expect(articles).toHaveLength(0);
    });

    it('id 가 일치하는 article 이 없을 때 에러가 발생하지 않는다.', async () => {
      // given
      // when
      const t = async () => {
        await boardService.deleteById(1);
      };

      // then
      await expect(t()).resolves.toBeUndefined();
    });
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
        const [articles, total] = await boardService.findOfPage(offset, limit);

        // then
        expect(articles).toHaveLength(expectedArticleCount);
        expect(total).toBe(expectedTotal);
      },
    );
  });

  describe('findBoardCount', () => {
    it('저장되어 있는 article 수를 반환한다.', async () => {
      // given
      const count = 10;
      await createArticles(count);

      // when
      const result = await boardService.findBoardCount();

      // then
      expect(result).toBe(count);
    });
  });

  it('삭제된 article 이 있으면 count 에 포함되지 않는다.', async () => {
    // given
    const count = 10;
    await createArticles(count);
    const deletedArticle = await articleRepository.save(
      Article.create('제목', '내용'),
    );
    await articleRepository.softDelete(deletedArticle.id);

    // when
    const result = await boardService.findBoardCount();

    // then
    expect(result).toBe(count);
  });

  async function createArticles(count: number) {
    await Promise.all(
      Array.from({ length: count }).map(async (_, index) =>
        articleRepository.save(Article.create('title', `${index}`)),
      ),
    );
  }
});
