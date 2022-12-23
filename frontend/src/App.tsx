import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Codenames from "./Components/Codenames/Codenames";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games/codenames" element={<Codenames />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
