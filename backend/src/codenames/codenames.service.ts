import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';
import * as crypto from 'crypto';
import { generateRandomWord } from 'src/utils/strings';

type Words = {
  color: string;
  name: string;
  isCovered: boolean;
};

type State = {
  room: string;
  players: string[];
  words: Words[];
};
@Injectable()
export class CodenamesService {
  private state: State;
  private words: string[];

  constructor() {
    this.init();
  }

  async init() {
    this.words = await this.generateWordsFromDictionary();
    this.state = {
      players: [],
      room: generateRandomWord(4),
      words: [],
    };
    this.fillStateWords();
  }

  private async generateWordsFromDictionary(): Promise<string[]> {
    console.log('generateWordsFromDictionary');
    const dictionaryPath = join(__dirname, '../assets/dictionary.txt');
    const dictionaryBuffer = await readFile(dictionaryPath);
    const dictionary = dictionaryBuffer.toString().replace(/\s/g, '').split(',');
    return dictionary.shuffle().slice(0, 25);
  }

  private fillStateWords(): void {
    const sides = ['blue', 'red'];
    const firstStep = sides[Math.floor(Math.random() * 2)];
    const secondStep = sides.find((side) => side !== firstStep);

    let [firstStepCount, secondStepCount, grayCount] = [0, 0, 0];

    for (const word of this.words) {
      if (firstStepCount < 9) {
        this.state.words.push({ color: firstStep, isCovered: false, name: word });
        firstStepCount++;
        continue;
      }
      if (secondStepCount < 8) {
        this.state.words.push({ color: secondStep, isCovered: false, name: word });
        secondStepCount++;
        continue;
      }
      if (grayCount < 7) {
        this.state.words.push({ color: 'gray', isCovered: false, name: word });
        grayCount++;
        continue;
      }
      this.state.words.push({ color: 'black', isCovered: false, name: word });
    }
  }

  generateRandomLetter() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    return alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  getState(): State {
    return this.state;
  }

  openWord(wordName: string) {
    for (const word of this.state.words) {
      if (word.name === wordName) {
        word.isCovered = true;
      }
    }
  }
}
