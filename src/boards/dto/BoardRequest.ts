import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@libs/entity/domain/article/Article';

export class BoardRequest {
  @ApiProperty({ name: '제목' })
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ name: '본문' })
  @MaxLength(100_000)
  @IsString()
  @IsNotEmpty()
  content: string;

  static of(title: string, content: string) {
    const boardRequest = new BoardRequest();
    boardRequest.title = title;
    boardRequest.content = content;

    return boardRequest;
  }

  toEntity(): Article {
    return Article.create(this.title, this.content);
  }
}
