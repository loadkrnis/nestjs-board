import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';
import { Expose, Transform } from 'class-transformer';

export class PageRequest {
  private static DEFAULT_PAGE_NUMBER = 1;
  private static DEFAULT_PAGE_SIZE = 10;

  @ApiProperty({ default: PageRequest.DEFAULT_PAGE_NUMBER })
  @Expose()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  @IsOptional()
  pageNumber: number;

  @ApiProperty({ default: PageRequest.DEFAULT_PAGE_SIZE })
  @Expose()
  @Min(1)
  @IsNumber()
  @Transform(({ value }) => (typeof value === 'string' ? Number(value) : value))
  @IsOptional()
  pageSize: number;

  get offset(): number {
    const pageNumber = this.pageNumber || PageRequest.DEFAULT_PAGE_NUMBER;
    return (pageNumber - 1) * this.limit;
  }

  get limit(): number {
    if (!this.pageSize) {
      return PageRequest.DEFAULT_PAGE_SIZE;
    }
    return this.pageSize;
  }
}
