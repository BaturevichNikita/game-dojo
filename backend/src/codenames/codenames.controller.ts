import { Controller, Get, Header } from '@nestjs/common';
import { CodenamesService } from '../services/codenames.service';

@Controller('codenames')
export class Codenamesontroller {
  constructor(private readonly codenamesService: CodenamesService) {}

  @Get('start')
  @Header('Access-Control-Allow-Origin', '*')
  async getInitialState() {
    const state = await this.codenamesService.getInitState();
    return { state };
  }
}
