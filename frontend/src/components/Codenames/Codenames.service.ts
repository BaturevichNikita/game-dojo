import axios from "axios";
import { GameState, GameStateResponse } from "./models";

class CodenamesService {
  async getInitGameState(): Promise<GameState> {
    const response = await axios<GameStateResponse>({
      method: "GET",
      url: "http://localhost:3000/codenames/start",
    });
    return response.data.state;
  }
}

export default new CodenamesService();
