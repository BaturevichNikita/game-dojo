import axios from "axios";

interface GamesResponse {
  data: {
    games: Game[];
  };
}

interface Game {
  id: string;
  name: string;
}

class GamesService {
  async getGames(): Promise<Game[]> {
    const response: GamesResponse = await axios({
      method: "GET",
      url: "http://localhost:3000/games",
    });
    return response.data.games;
  }
}

export default new GamesService();
