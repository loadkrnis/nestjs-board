import { Column, Entity } from 'typeorm';
import { BaseTimeEntity } from '@libs/entity/BaseTimeEntity';

@Entity()
export class Article extends BaseTimeEntity {
  @Column({
    comment: '제목',
  })
  title: string;

  @Column({
    comment: '본문',
  })
  content: string;
}
