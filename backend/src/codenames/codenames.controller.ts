import { Controller, Get, Header } from '@nestjs/common';
import { CodenamesService } from './codenames.service';

@Controller('codenames')
export class CodenamesController {
  constructor(private readonly codenamesService: CodenamesService) {}

  @Get('start')
  @Header('Access-Control-Allow-Origin', '*')
  async getInitialState() {
    const state = this.codenamesService.getState();
    return { state };
  }
}
