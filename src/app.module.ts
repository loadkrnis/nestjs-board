import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from '@libs/logger/LoggerModule';
import { LocalTypeOrmModule } from '../libs/entity/LocalTypeOrmModule';

@Module({
  imports: [LoggerModule, LocalTypeOrmModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
