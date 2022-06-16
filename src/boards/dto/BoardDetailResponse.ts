import { Article } from '@libs/entity/domain/article/Article';
import { DateTimeUtil } from '@libs/entity/util/DateTimeUtil';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BoardDetailResponse {
  @Expose()
  @ApiProperty({ example: 1 })
  private readonly id: number;

  @Expose()
  @ApiProperty({ example: '당근 흔드는 방법' })
  private readonly title: string;

  @Expose()
  @ApiProperty({ example: '흔들흔들!!!' })
  private readonly content: string;

  @Expose()
  @ApiProperty({
    example: '2021-09-12 13:10:30',
    description: 'yyyy-MM-dd HH:mm:ss',
  })
  private readonly createdAt: string;

  @Expose()
  @ApiProperty({
    example: '2021-10-12 15:13:42',
    description: 'yyyy-MM-dd HH:mm:ss',
  })
  private readonly updatedAt: string;

  @Expose()
  @ApiProperty({
    example: '2022-05-12 08:30:59',
    description: 'yyyy-MM-dd HH:mm:ss',
  })
  private readonly deletedAt: string;

  constructor(article: Article) {
    this.id = article.id;
    this.title = article.title;
    this.content = article.content;
    this.createdAt = DateTimeUtil.toString(article.createdAt);
    this.updatedAt = DateTimeUtil.toString(article.updatedAt);
    this.deletedAt = DateTimeUtil.toString(article.deletedAt);
  }
}
