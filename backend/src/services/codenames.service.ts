import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class CodenamesService {
  async getInitState() {
    const state = {
      words: await this._generateWordsFromDictionary(),
    };
    return state;
  }

  async _generateWordsFromDictionary(): Promise<string[]> {
    const dictionaryPath = join(__dirname, 'dictionary.txt');
    const dictionaryBuffer = await readFile(dictionaryPath);
    const dictionary = dictionaryBuffer.toString().replace(/\s/g, '').split(',');

    const wordsSet = new Set();
    while (wordsSet.size < 25) {
      const word = dictionary[Math.floor(Math.random() * dictionary.length)];
      wordsSet.add(word);
    }
    return Array.from(wordsSet) as string[];
  }
}
