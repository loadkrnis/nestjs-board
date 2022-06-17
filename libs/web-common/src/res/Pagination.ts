import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class Pagination<T> {
  @ApiProperty()
  @Expose()
  private readonly pageNumber: number;

  @ApiProperty()
  @Expose()
  private readonly pageSize: number;

  @ApiProperty()
  @Expose()
  private readonly totalCount: number;

  @ApiProperty()
  @Expose()
  private readonly totalPage: number;

  @ApiProperty()
  @Expose()
  private readonly items: T[];

  constructor(
    pageNumber: number,
    totalCount: number,
    pageSize: number,
    items: T[],
  ) {
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    this.totalPage = Math.ceil(totalCount / pageSize);
    this.items = items;
  }
}
