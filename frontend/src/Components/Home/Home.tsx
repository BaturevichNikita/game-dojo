import React from "react";
import Games from "../Games/Games";

import GamesServiceContext from "../../services/games.context";
import GamesService from "../../services/games.service";

const Home = () => {
  return (
    <div>
      <div>
        <h2>Home Page</h2>
      </div>
      <div>
        <GamesServiceContext.Provider value={GamesService}>
          <Games />
        </GamesServiceContext.Provider>
      </div>
    </div>
  );
};

export default Home;
