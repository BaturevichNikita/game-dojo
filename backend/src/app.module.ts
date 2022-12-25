import { Module } from '@nestjs/common';
import { CodenamesModule } from './codenames/codenames.module';
import { GamesModule } from './games/games.module';
import { initCustomArrayMethods } from './utils/arrays';

@Module({
  imports: [CodenamesModule, GamesModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    initCustomArrayMethods();
  }
}
