import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class CodenamesService {
  async getInitState() {
    const state = {
      words: await this._generateWordsFromDictionary(),
    };
    return state;
  }

  async _generateWordsFromDictionary(): Promise<string[]> {
    const buffer = fs
      .readFileSync('/Users/Uladzislau_Malakhau/Desktop/game-dojo/backend/src/services/dictionary.txt')
      .toString();

    const dictionary = buffer.replace(/\s/g, '').split(',');

    const wordsSet = new Set();
    while (wordsSet.size < 25) {
      const word = dictionary[Math.floor(Math.random() * dictionary.length)];
      wordsSet.add(word);
    }
    return Array.from(wordsSet) as string[];
  }
}
