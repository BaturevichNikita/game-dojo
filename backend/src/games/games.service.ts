import { Injectable } from '@nestjs/common';
import { generateRandomWord } from 'src/utils/strings';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  private readonly availiableGames = [{ id: 'codenames', name: 'Codenames' }];
  private launchedGames: Game[] = [];

  private createGameRoom() {
    return generateRandomWord(4);
  }

  private addLaunchedGame(name: string, room: string, state: any) {
    this.launchedGames.push({ name, room, state });
  }

  getAvailableGames() {
    return this.availiableGames;
  }

  launchGame(name: string, state: any): string {
    const room = this.createGameRoom();

    console.log(`Room ${room} has been created for ${name} game.`);

    this.addLaunchedGame(name, room, state);
    return room;
  }

  getStateByRoomCode<T>(room: string): T {
    const game = this.launchedGames.find((game) => game.room === room);
    if (!game) {
      console.error(`There are no game with ${room} room!`);
      return null;
    }
    return game.state;
  }
}
