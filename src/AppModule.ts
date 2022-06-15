import { Module } from '@nestjs/common';
import { LoggerModule } from '@libs/logger/LoggerModule';
import { LocalTypeOrmModule } from '../libs/entity/LocalTypeOrmModule';
import { BoardModule } from './boards/BoardModule';

@Module({
  imports: [LoggerModule, LocalTypeOrmModule, BoardModule],
})
export class AppModule {}
