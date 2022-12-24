import { Module } from '@nestjs/common';
import { CodenamesModule } from './codenames/codenames.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [CodenamesModule, GamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
