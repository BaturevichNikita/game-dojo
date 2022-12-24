import { Injectable } from '@nestjs/common';

@Injectable()
export class GamesService {
  private readonly games = [{ id: 'codenames', name: 'Codenames' }];

  getGames() {
    return this.games;
  }
}
