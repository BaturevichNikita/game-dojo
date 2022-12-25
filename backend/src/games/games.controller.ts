import { Controller, Get, Header } from '@nestjs/common';
import { GamesService } from '../services/games.service';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @Header('Access-Control-Allow-Origin', '*')
  async getGames() {
    const games = await this.gamesService.getGames();
    return { games };
  }
}
