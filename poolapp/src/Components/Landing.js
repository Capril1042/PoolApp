import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <h1 className="landing--header">Pool App</h1>
        <div className="landing--buttons">
          <button className="button-big">
            <Link to="/createplayer">ADD PLAYER</Link>
          </button>
          <button className="button--big">
            <Link to="/creategame"> ADD GAME</Link>
          </button>
          <button className="button--big">
            <Link to="/leaderboard"> LEADERBOARD </Link>
          </button>
        </div>
      </div>
    );
  }
}

export default Landing;
