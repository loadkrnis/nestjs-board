import { BoardRequest } from '../../../../src/boards/dto/BoardRequest';
import { validate } from 'class-validator';

describe('BoardRequest', () => {
  it('content 와 title 이 있으면 에러가 발생하지 않는다.', async () => {
    // given
    const boardRequest = BoardRequest.of('title', 'content');

    // when
    const validationErrors = await validate(boardRequest);

    // then
    expect(validationErrors).toHaveLength(0);
  });

  it('title 이 없으면 에러가 발생한다.', async () => {
    // given
    const boardRequest = BoardRequest.of(undefined as any, 'content');

    // when
    const validationErrors = await validate(boardRequest);

    // then
    expect(validationErrors).toHaveLength(1);
  });

  it('title 의 길이가 100이 넘으면 에러가 발생한다.', async () => {
    // given
    const boardRequest = BoardRequest.of('A'.repeat(101), 'content');

    // when
    const validationErrors = await validate(boardRequest);

    // then
    expect(validationErrors).toHaveLength(1);
  });

  it('content 이 없으면 에러가 발생한다.', async () => {
    // given
    const boardRequest = BoardRequest.of('title', undefined as any);

    // when
    const validationErrors = await validate(boardRequest);

    // then
    expect(validationErrors).toHaveLength(1);
  });

  it('content 의 길이가 100,000이 넘으면 에러가 발생한다.', async () => {
    // given
    const boardRequest = BoardRequest.of('title', 'A'.repeat(100_001));

    // when
    const validationErrors = await validate(boardRequest);

    // then
    expect(validationErrors).toHaveLength(1);
  });
});
