import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Landing from "./Components/Landing.js";
import CreatePlayer from "./Components/CreatePlayer.js";
import Leaderboard from "./Components/Leaderboard.js";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route path="/create" component={CreatePlayer} />
          <Route path="/leaderboard" component={Leaderboard} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
