import axios from "axios";

class CodenamesService {
  async getInitGameState(): Promise<any> {
    const response: any = await axios({
      method: "GET",
      url: "http://localhost:3000/codenames/start",
    });
    return response.data.state;
  }
}

export default new CodenamesService();
