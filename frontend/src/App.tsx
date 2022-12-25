import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Codenames from "./components/Codenames/Codenames";
import Home from "./components/Home/Home";
import CodenamesServiceContext from "./services/codenames.context";
import CodenamesService from "./services/codenames.service";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/games/codenames"
            element={
              <CodenamesServiceContext.Provider value={CodenamesService}>
                <Codenames />
              </CodenamesServiceContext.Provider>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
