import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Article } from '@libs/entity/article/Article';

export const LocalTypeOrmModule = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: 'root',
  database: 'board',
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
  autoLoadEntities: true,
  entities: [Article],
});
