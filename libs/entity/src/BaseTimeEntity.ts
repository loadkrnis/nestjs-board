import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { LocalDateTime } from '@js-joda/core';
import { LocalDateTimeTransformer } from '@libs/entity/transformer/LocalDateTimeTransformer';

export abstract class BaseTimeEntity {
  @Generated('increment')
  @PrimaryColumn()
  id: number;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
    update: false,
    comment: '생성 시각',
  })
  createdAt: LocalDateTime;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
    comment: '수정 시각',
  })
  updatedAt: LocalDateTime;

  @Column({
    type: 'timestamp',
    transformer: new LocalDateTimeTransformer(),
    nullable: true,
    comment: '삭제 시각',
  })
  deletedAt: LocalDateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
