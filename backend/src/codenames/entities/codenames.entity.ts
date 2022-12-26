type Words = {
  color: string;
  name: string;
  isCovered: boolean;
};

export type CodenamesState = {
  players: {
    blueTeam: string[];
    redTeam: string[];
  };
  words: Words[];
};
