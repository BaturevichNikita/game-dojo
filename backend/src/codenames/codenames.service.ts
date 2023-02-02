import { Injectable, OnModuleInit } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { GamesService } from 'src/games/games.service';
import { CodenamesGame, CodenamesState, CodenamesTeams, Words } from './entities/codenames.entity';

const MAX_WORDS_COUNT = 25;
const FIRST_TURN_WORDS_COUNT = 9;
const SECOND_TURN_WORDS_COUNT = 8;
const PACIFIC_WORDS_COUNT = 7;

@Injectable()
export class CodenamesService implements OnModuleInit {
  private readonly name: string = 'Codenames';
  private words: string[];
  private launchedGames: CodenamesGame[] = [];

  constructor(private readonly gamesService: GamesService) {}

  async onModuleInit() {
    await this.loadWordsFromDictionary();
  }

  private async loadWordsFromDictionary(): Promise<void> {
    const dictionaryPath = join(__dirname, '../codenames/assets/dictionary.txt');
    const dictionaryBuffer = await readFile(dictionaryPath);
    this.words = dictionaryBuffer.toString().replace(/\s/g, '').split(',');
  }

  private getStateWords(): Words[] {
    const sides = ['blue', 'red'];
    const firstTurn = sides[Math.floor(Math.random() * 2)];
    const secondTurn = sides.find((side) => side !== firstTurn);

    let [firstTurnCount, secondTurnCount, grayCount] = [0, 0, 0];
    const randomWordsSet = this.words.shuffle().slice(0, MAX_WORDS_COUNT);

    const stateWords: Words[] = [];

    for (const word of randomWordsSet) {
      if (firstTurnCount < FIRST_TURN_WORDS_COUNT) {
        stateWords.push({ color: firstTurn, isCovered: false, name: word });
        firstTurnCount++;
        continue;
      }
      if (secondTurnCount < SECOND_TURN_WORDS_COUNT) {
        stateWords.push({ color: secondTurn, isCovered: false, name: word });
        secondTurnCount++;
        continue;
      }
      if (grayCount < PACIFIC_WORDS_COUNT) {
        stateWords.push({ color: 'gray', isCovered: false, name: word });
        grayCount++;
        continue;
      }
      stateWords.push({ color: 'black', isCovered: false, name: word });
    }
    return stateWords.shuffle();
  }

  startNewGame(room: string): void {
    const state: CodenamesState = {
      players: [],
      words: this.getStateWords(),
    };
    this.launchedGames.push({ name: this.name, room, state });
    console.log('Launched games:', this.launchedGames);
  }

  getStateForRoom(room: string): CodenamesState {
    const game = this.launchedGames.find((game) => game.room === room);
    if (!game) {
      throw new WsException(`There is no game for ${room} room!`);
    }
    return game.state;
  }

  openCardInRoom(room: string, card: string): void {
    const state = this.getStateForRoom(room);
    for (const word of state.words) {
      if (word.name === card) {
        console.log(`Oppening card ${card}...`);

        word.isCovered = true;
      }
    }
  }

  joinPlayerToRoom(room: string, id: string, nickname: string, team: CodenamesTeams): CodenamesState {
    const state = this.getStateForRoom(room);
    if (!state) {
      throw new WsException(`There is no state for ${room} room!`);
    }

    const isNicknameAlreadyTaken = state.players.find((player) => player.nickname === nickname);
    if (isNicknameAlreadyTaken) {
      throw new WsException(`Nickname ${nickname} has been already taken`);
    }

    const isNewPlayer = !state.players.find((player) => player.id === id);
    if (isNewPlayer) {
      state.players.push({ id, nickname, team });
    }
    console.log({ state });
    return state;
  }

  leavePlayerFromRoom(id: string) {
    for (const { state } of this.launchedGames) {
      const isPlayerExists = state.players.find((player) => player.id === id);
      if (isPlayerExists) {
        state.players = state.players.filter((player) => player.id !== id);
      }
    }
  }

  printLaunchedGames() {
    for (const game of this.launchedGames) {
      console.log(game);
    }
  }
}
