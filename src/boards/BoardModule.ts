import { Module } from '@nestjs/common';
import { BoardController } from './BoardController';
import { BoardService } from './BoardService';
import { ArticleModule } from '@libs/entity/domain/article/ArticleModule';

@Module({
  imports: [ArticleModule],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
