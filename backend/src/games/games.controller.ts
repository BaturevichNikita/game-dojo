import { Controller, Get, Header } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getGames() {
    const games = this.gamesService.getAvailableGames();
    return { games };
  }
}
