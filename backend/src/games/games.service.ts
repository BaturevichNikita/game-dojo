import { Injectable } from '@nestjs/common';
import { generateRandomWord } from 'src/utils/strings';

@Injectable()
export class GamesService {
  private readonly availiableGames = [{ id: 'codenames', name: 'Codenames' }];
  private launchedRooms: string[] = [];

  getNewRoom(): string {
    const room = generateRandomWord(4);
    if (this.launchedRooms.includes(room)) {
      return this.getNewRoom();
    }
    this.launchedRooms.push(room);
    return room;
  }

  getAvailableGames() {
    return this.availiableGames;
  }
}
