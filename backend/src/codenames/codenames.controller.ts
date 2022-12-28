import { Controller, Get, Header } from '@nestjs/common';
import { CodenamesService } from './codenames.service';

@Controller('codenames')
export class CodenamesController {
  constructor(private readonly codenamesService: CodenamesService) {}

  @Get('start')
  @Header('Access-Control-Allow-Origin', '*')
  startGame() {
    const state = this.codenamesService.startNewGame();
    return { state };
  }
}
