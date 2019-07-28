import React from "react";
import LinkButton from "./LinkButton";
import "./Landing.css";

function Landing() {
  return (
    <div className="landing">
      <h1 className="landing--header">Pool App</h1>
      <div className="landing--buttons">
        <LinkButton route={"/createplayer"} text={"ADD PLAYER"} />
        <LinkButton route={"/creategame"} text={"ADD Game"} />
        <LinkButton route={"/leaderboard"} text={"LEADERBOARD"} />
      </div>
    </div>
  );
}

export default Landing;
