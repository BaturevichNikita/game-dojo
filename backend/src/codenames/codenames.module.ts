import { Module } from '@nestjs/common';
import { CodenamesService } from 'src/services/codenames.service';
import { Codenamesontroller } from './codenames.controller';
import { GameModule } from './game/game.module';

@Module({
  imports: [GameModule],
  controllers: [Codenamesontroller],
  providers: [CodenamesService],
})
export class CodenamesModule {}
