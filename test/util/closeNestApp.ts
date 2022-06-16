import { INestApplication } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TestingModule } from '@nestjs/testing';

export async function closeNestApp(app: INestApplication | TestingModule) {
  const entityManager = app.get(EntityManager);
  await Promise.all([entityManager.connection.close(), app.close()]);
}
