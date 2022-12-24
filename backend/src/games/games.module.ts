import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from '../services/games.service';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
