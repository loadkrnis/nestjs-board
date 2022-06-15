import { Article } from '@libs/entity/domain/article/Article';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  exports: [TypeOrmModule],
  providers: [],
  controllers: [],
})
export class ArticleModule {}
