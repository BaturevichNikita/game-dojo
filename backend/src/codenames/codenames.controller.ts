import { Controller, Get, Header } from '@nestjs/common';
import { GamesService } from 'src/games/games.service';
import { CodenamesEventList, CodenamesEvents } from './codenames.events';

@Controller('codenames')
export class CodenamesController {
  constructor(private readonly gamesService: GamesService, private readonly codenamesEvents: CodenamesEvents) {}

  @Get('start')
  @Header('Access-Control-Allow-Origin', '*')
  startGame() {
    const room = this.gamesService.getNewRoom();
    const event = this.codenamesEvents.createNewEvent(CodenamesEventList.START_GAME, { room });
    this.codenamesEvents.handleEvent(event);
    return { room };
  }
}
