import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { HttpStatus } from '@nestjs/common';

export class ResponseEntity<T> {
  @Exclude() private readonly _statusCode: HttpStatus;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  private constructor(status: HttpStatus, message: string, data: T) {
    this._statusCode = status;
    this._message = message;
    this._data = data;
  }

  @ApiProperty()
  @Expose()
  get statusCode(): HttpStatus {
    return this._statusCode;
  }

  @ApiProperty()
  @Expose()
  get message(): string {
    return this._message;
  }

  @ApiProperty()
  @Expose()
  get data(): T {
    return this._data;
  }

  static OK(httpStatus: HttpStatus = HttpStatus.OK): ResponseEntity<string> {
    return new ResponseEntity<string>(httpStatus, '', '');
  }

  static OK_WITH<T>(data: T): ResponseEntity<T> {
    return new ResponseEntity<T>(HttpStatus.OK, '', data);
  }

  static ERROR(): ResponseEntity<string> {
    return new ResponseEntity<string>(
      HttpStatus.INTERNAL_SERVER_ERROR,
      '서버 에러가 발생했습니다.',
      '',
    );
  }

  static ERROR_WITH(
    message: string,
    code: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
  ): ResponseEntity<string> {
    return new ResponseEntity<string>(code, message, '');
  }
}
