import { Injectable, OnModuleInit } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { GamesService } from 'src/games/games.service';
import { CodenamesState } from './entities/codenames.entity';

const MAX_WORDS_COUNT = 25;
const FIRST_TURN_WORDS_COUNT = 9;
const SECOND_TURN_WORDS_COUNT = 8;
const PACIFIC_WORDS_COUNT = 7;

@Injectable()
export class CodenamesService implements OnModuleInit {
  private readonly name: string = 'Codenames';
  private state: CodenamesState;
  private words: string[];

  constructor(private readonly gamesService: GamesService) {}

  async onModuleInit() {
    await this.loadWordsFromDictionary();
  }

  private async loadWordsFromDictionary(): Promise<void> {
    const dictionaryPath = join(__dirname, '../codenames/assets/dictionary.txt');
    const dictionaryBuffer = await readFile(dictionaryPath);
    this.words = dictionaryBuffer.toString().replace(/\s/g, '').split(',');
  }

  private fillStateWords(): void {
    const sides = ['blue', 'red'];
    const firstTurn = sides[Math.floor(Math.random() * 2)];
    const secondTurn = sides.find((side) => side !== firstTurn);

    let [firstTurnCount, secondTurnCount, grayCount] = [0, 0, 0];
    const randomWordsSet = this.words.shuffle().slice(0, MAX_WORDS_COUNT);

    for (const word of randomWordsSet) {
      if (firstTurnCount < FIRST_TURN_WORDS_COUNT) {
        this.state.words.push({ color: firstTurn, isCovered: false, name: word });
        firstTurnCount++;
        continue;
      }
      if (secondTurnCount < SECOND_TURN_WORDS_COUNT) {
        this.state.words.push({ color: secondTurn, isCovered: false, name: word });
        secondTurnCount++;
        continue;
      }
      if (grayCount < PACIFIC_WORDS_COUNT) {
        this.state.words.push({ color: 'gray', isCovered: false, name: word });
        grayCount++;
        continue;
      }
      this.state.words.push({ color: 'black', isCovered: false, name: word });
    }
  }

  startNewGame() {
    this.loadWordsFromDictionary();
    this.state = {
      players: {
        blueTeam: [],
        redTeam: [],
      },
      words: [],
    };
    this.fillStateWords();

    const room = this.gamesService.launchGame(this.name, this.state);

    //TODO: return just room when frontend webhook is done
    return { room, ...this.state };
  }

  getState(roomCode: string): CodenamesState {
    return this.gamesService.getStateByRoomCode<CodenamesState>(roomCode);
  }

  openWord(wordName: string) {
    for (const word of this.state.words) {
      if (word.name === wordName) {
        word.isCovered = true;
      }
    }
  }
}
