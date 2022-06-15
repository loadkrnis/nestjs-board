import { Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class Article {
  @Generated('increment')
  @PrimaryColumn()
  id: number;
}
