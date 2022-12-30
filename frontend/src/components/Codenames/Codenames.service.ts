import axios from 'axios';
import { StartedGameResponse } from './models';

class CodenamesService {
  async getInitGameState(): Promise<string> {
    const response = await axios<StartedGameResponse>({
      method: 'GET',
      url: 'http://localhost:3000/codenames/start',
    });
    console.log(response.data);
    return response.data.room;
  }
}

export default new CodenamesService();
