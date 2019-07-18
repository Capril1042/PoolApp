import React from "react";
import { Switch, Route } from "react-router-dom";

import Landing from "./Components/Landing.js";
import CreatePlayer from "./Components/CreatePlayer.js";
import Leaderboard from "./Components/Leaderboard.js";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Landing} />
      <Route path="/create" component={CreatePlayer} />
      <Route path="/leaderboard" component={Leaderboard} />
    </Switch>
  );
};

export default Routes;
