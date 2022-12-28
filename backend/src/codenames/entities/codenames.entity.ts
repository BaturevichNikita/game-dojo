export enum CodenamesTeams {
  blue = 'blue',
  red = 'red',
}

export type Words = {
  color: string;
  name: string;
  isCovered: boolean;
};

type Player = {
  id: string;
  nickname: string;
  team: CodenamesTeams;
};

export type CodenamesState = {
  players: Player[];
  words: Words[];
};

export type CodenamesGame = {
  name: string;
  room: string;
  state: CodenamesState;
};
