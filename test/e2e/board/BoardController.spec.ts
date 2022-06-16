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
      expect(response.body.statusCode).toBe(HttpStatus.OK);
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
});
