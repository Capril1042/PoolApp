import React, { Component } from "react";
import { Link } from 'react-router-dom';
import "./Landing.css";

class Landing extends Component {
  render() {
    return (
      <div className="Landing">
        <h1 className="Landing__Header">Pool App</h1>
        <Link to="/createplayer">create player</Link>
        <Link to="creategame"> create game</Link>
        <Link to="leaderboard"> leaderboard </Link>
      </div>
    );
  }
}

export default Landing;
