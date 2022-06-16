import { Test, TestingModule } from '@nestjs/testing';
import { LocalTypeOrmModule } from '../LocalTypeOrmModule';
import { EntityManager } from 'typeorm';

describe('LocalTypeOrmModule', () => {
  let entityManager: EntityManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [LocalTypeOrmModule],
    }).compile();
    entityManager = module.get(EntityManager);
  });

  afterAll(async () => {
    await entityManager.connection.close();
  });

  it('DB 연결 테스트', async () => {
    const result = await entityManager.connection.query('select 1');
    expect(result).toStrictEqual([{ 1: '1' }]);
  });
});
