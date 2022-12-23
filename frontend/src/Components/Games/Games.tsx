import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const [games, setGames] = React.useState([
    { id: "codenames", name: "codenames" },
  ]);

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

export default Games;
