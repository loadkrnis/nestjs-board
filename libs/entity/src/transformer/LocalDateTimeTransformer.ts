import { convert, LocalDateTime, nativeJs } from '@js-joda/core';
import { ValueTransformer } from 'typeorm';

export class LocalDateTimeTransformer implements ValueTransformer {
  to(entityValue: LocalDateTime): Date | null {
    if (!entityValue) {
      return null;
    }

    return convert(entityValue).toDate();
  }

  from(databaseValue: Date): LocalDateTime | null {
    if (!databaseValue) {
      return null;
    }
    return LocalDateTime.from(nativeJs(databaseValue));
  }
}
