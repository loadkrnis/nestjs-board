import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { PageRequest } from '@libs/web-common/req/PageRequest';

describe('PageRequest', () => {
  it('pageNumber 에 1 이상을 넣으면 정상적으로 숫자값이 반환된다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageNumber: 1,
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageNumber).toBe(1);
    expect(validationErrors).toHaveLength(0);
  });

  it('pageNumber 에 0 이하 값을 넣으면, 에러가 발생한다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageNumber: 0,
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageNumber).toBe(0);
    expect(validationErrors).toHaveLength(1);
  });

  it('pageNumber 에 숫자형 문자열을 넣으면 숫자로 반환된다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageNumber: '123',
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageNumber).toBe(123);
    expect(validationErrors).toHaveLength(0);
  });

  it('pageNumber 에 글자 문자열을 넣으면 에러가 발생한다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageNumber: '1asd12ads',
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageNumber).toBeNaN();
    expect(validationErrors).toHaveLength(1);
  });

  it('pageSize 에 1 이상을 넣으면 숫자값이 반환된다', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageSize: 1,
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageSize).toBe(1);
    expect(validationErrors).toHaveLength(0);
  });

  it('pageSize 에 0 이하 값을 넣으면, 에러가 발생한다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageSize: 0,
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(validationErrors).toHaveLength(1);
  });

  it('pageSize 에 숫자형 문자열을 넣으면 숫자로 반환된다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageSize: '123',
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageSize).toBe(123);
    expect(validationErrors).toHaveLength(0);
  });

  it('pageSize 에 문자열을 넣으면 에러가 발생한다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {
      pageSize: '1asd12ads',
    });

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.pageSize).toBeNaN();
    expect(validationErrors).toHaveLength(1);
  });

  it('pageSize 와 pageNumber 가 없을 때 offset 과 limit 은 기본값으로 설정된다.', async () => {
    // given
    const pageRequest = plainToClass(PageRequest, {});

    // when
    const validationErrors = await validate(pageRequest);

    // then
    expect(pageRequest.offset).toBe(0);
    expect(pageRequest.limit).toBe(10);
    expect(validationErrors).toHaveLength(0);
  });
});
