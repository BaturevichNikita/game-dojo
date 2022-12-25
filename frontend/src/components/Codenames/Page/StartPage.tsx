import React, { Suspense, useContext, useState } from "react";
import {
  useNavigate,
  useLocation,
  Router,
  Route,
  Routes,
} from "react-router-dom";

import CodenamesServiceContext from "../Codenames.context";
import Codenames from "../Game/Codenames";
import { GameState } from "../Game/models/GameState";

const CodenamesStartPage = () => {
  const codenamesService = useContext(CodenamesServiceContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleStartClick = async (event: any) => {
    event.preventDefault();
    console.log("click");
    const state = await codenamesService.getInitGameState();

    navigate(`${location.pathname}/${state.room ? state.room : "error"}`);
  };

  return (
    <div>
      <button onClick={handleStartClick}>Start Game</button>
    </div>
  );
};

export default CodenamesStartPage;
