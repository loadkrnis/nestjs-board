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

describe('BoardService', () => {
  let module: TestingModule;
  let boardService: BoardService;
  let articleRepository: Repository<Article>;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [LocalTypeOrmModule, LoggerModule, BoardModule],
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
});
