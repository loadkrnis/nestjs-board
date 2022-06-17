import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/AppModule';
import { setNestApp } from '@libs/web-common/app/setNestApp';
import { closeNestApp } from '../../util/closeNestApp';
import { Repository } from 'typeorm';
import { Article } from '@libs/entity/domain/article/Article';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BoardController', () => {
  let app: INestApplication;
  let articleRepository: Repository<Article>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    articleRepository = app.get(getRepositoryToken(Article));
    setNestApp(app);
    await app.init();
  });

  beforeEach(async () => {
    await articleRepository.clear();
  });

  afterAll(async () => closeNestApp(app));

  describe('[POST] /boards', () => {
    it('article 을 저장한다.', async () => {
      // given
      const title = '안녕하세요';
      const content = '내용입니다.';

      // when
      const response = await request(app.getHttpServer())
        .post(`/boards`)
        .send({ title, content });

      // then
      expect(response.body.statusCode).toBe(HttpStatus.CREATED);
      const articles = await articleRepository.find();
      expect(articles).toHaveLength(1);
      expect(articles[0].id).toBeDefined();
      expect(articles[0].content).toBe(content);
      expect(articles[0].title).toBe(title);
      expect(articles[0].createdAt).toBeDefined();
      expect(articles[0].updatedAt).toBeDefined();
      expect(articles[0].deletedAt).toBeNull();
    });
  });

  describe('[GET] /boards/:id', () => {
    it('id 가 일치하는 article 을 응답한다.', async () => {
      // given
      const article = await articleRepository.save(
        Article.create('글 제목', '내용입니당.'),
      );

      // when
      const response = await request(app.getHttpServer()).get(
        `/boards/${article.id}`,
      );

      // then
      expect(response.body.statusCode).toBe(HttpStatus.OK);
      expect(response.body.data.title).toBe(article.title);
      expect(response.body.data.content).toBe(article.content);
      expect(response.body.data.createdAt).toBeDefined();
      expect(response.body.data.updatedAt).toBeDefined();
      expect(response.body.data.deletedAt).toBeDefined();
    });

    it('id 가 일치하는 article 이 없을 때 NotFound 를 응답한다.', async () => {
      // given
      // when
      const response = await request(app.getHttpServer()).get(`/boards/1`);

      // then
      expect(response.body.statusCode).toBe(HttpStatus.NOT_FOUND);
      expect(response.body.message).toBe('존재하지 않습니다.');
    });
  });

  describe('[DELETE] /boards/:id', () => {
    it('id 가 일치하는 article 을 삭제한다.', async () => {
      // given
      const article = await articleRepository.save(
        Article.create('글 제목', '내용입니당.'),
      );

      // when
      const response = await request(app.getHttpServer()).delete(
        `/boards/${article.id}`,
      );

      // then
      expect(response.body.statusCode).toBe(HttpStatus.OK);
      const articles = await articleRepository.find();
      expect(articles).toHaveLength(0);
    });
  });

  describe('[GET] /boards', () => {
    it('페이지로 article 을 조회한다.', async () => {
      // given
      await createArticles(10);
      const pageNumber = 2;
      const pageSize = 7;

      // when
      const response = await request(app.getHttpServer()).get(
        `/boards?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      );

      // then
      expect(response.body.statusCode).toBe(HttpStatus.OK);
      expect(response.body.data.items).toHaveLength(3);
    });
  });

  async function createArticles(count: number) {
    await Promise.all(
      Array.from({ length: count }).map(async (_, index) =>
        articleRepository.save(Article.create('title', `${index}`)),
      ),
    );
  }
});
