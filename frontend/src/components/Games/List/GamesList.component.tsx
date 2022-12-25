import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GamesServiceContext from "../Games.context";

const GamesList = () => {
  const [games, setGames] = React.useState([] as any[]);
  const gamesService = useContext(GamesServiceContext);

  useEffect(() => {
    const loadGames = async () => {
      const games = await gamesService.getGames();
      setGames(games);
    };
    loadGames();
  }, []);
  return (
    <ul>
      {games.map((game: any) => (
        <li key={game.id}>
          {game.name}
          <Link to={`/games/${game.id}`}>
            <button>Play game</button>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GamesList;
