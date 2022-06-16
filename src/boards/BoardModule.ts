import { Module } from '@nestjs/common';
import { BoardController } from './BoardController';
import { BoardService } from './BoardService';
import { ArticleModule } from '@libs/entity/domain/article/ArticleModule';
import { ArticleQueryRepository } from '../article/ArticleQueryRepository';

@Module({
  imports: [ArticleModule],
  controllers: [BoardController],
  providers: [BoardService, ArticleQueryRepository],
})
export class BoardModule {}
