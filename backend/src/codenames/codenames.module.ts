import { Module } from '@nestjs/common';
import { CodenamesController } from './codenames.controller';
import { CodenamesGateway } from './codenames.gateway';
import { CodenamesService } from './codenames.service';

@Module({
  providers: [CodenamesGateway, CodenamesService],
  controllers: [CodenamesController],
})
export class CodenamesModule {}
