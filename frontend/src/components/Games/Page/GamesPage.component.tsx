import GamesServiceContext from "../Games.context";
import GamesService from "../Games.service";
import GamesList from "../List/GamesList.component";

const GamesPage = () => {
  return (
    <div>
      <div>
        <h2>Games Page</h2>
      </div>
      <div>
        <GamesServiceContext.Provider value={GamesService}>
          <GamesList />
        </GamesServiceContext.Provider>
      </div>
    </div>
  );
};

export default GamesPage;
