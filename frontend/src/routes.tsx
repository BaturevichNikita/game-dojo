import path from "path";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Codenames from "./components/Codenames/Game/Codenames";
import CodenamesStartPage from "./components/Codenames/Page/StartPage";
import GamesPage from "./components/Games/Page/GamesPage.component";

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/games">
      <Route index element={<GamesPage />}></Route>
      <Route path="/games/codenames" element={<CodenamesStartPage />} />
      <Route path="/games/codenames/:room" element={<Codenames />}></Route>
    </Route>
  )
);
