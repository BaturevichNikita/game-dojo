import { Word } from "./Word";

export interface GameState {
  room: string;
  words: Word[];
  players: any[];
}
