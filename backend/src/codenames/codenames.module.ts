import { Module } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { CodenamesController } from './codenames.controller';
import { CodenamesGateway } from './codenames.gateway';
import { CodenamesService } from './codenames.service';

@Module({
  providers: [CodenamesGateway, CodenamesService, GamesService],
  controllers: [CodenamesController],
})
export class CodenamesModule {}
