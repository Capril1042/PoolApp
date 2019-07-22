import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "../firebase.js";

import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerOne: "",
      playerTwo: "",
      winner: "",
      playersSelected: false,
      winnerDeclared: false
    };
  }
  resetForm = () => {
    this.setState({
      playerOne: "",
      playerTwo: "",
      winner: "",
      playersSelected: false,
      winnerDeclared: false
    });
  };
  
  selectPlayersForm = () => {
    const players = this.state.players;
    return !this.state.playersSelected ? (
      <form className="selectplayers--form" onSubmit={this.handlePlayerSubmit}>
        <label className="selectplayers--label">
          Player 1:
          <select
          className="selectplayers--form--select"
            type="select"
            name="playerOne"
            onChange={this.handleChangePlayerOne}
          >
            {players.map((player, i) => (
              <option key={i} value={player.data.name}>
                {player.data.name}
              </option>
            ))}
            ;
          </select>
        </label>
        <label className="selectplayers--label">
          Player 2:
          <select
          className="selectplayers--form--select"
            type="select"
            name="playerTwo"
            onChange={this.handleChangePlayerTwo}
          >
            {players
              .filter(player => player.data.name !== this.state.playerOne)
              .map((player, i) => (
                <option key={i} value={player.data.name}>
                  {player.data.name}
                </option>
              ))}
            ;
          </select>
        </label>
        <input className="selectplayers--input" type="submit" value="Submit" />
      </form>
    ) : null;
  };

  winnerAddForm = () => {
    return this.state.playersSelected ? (
      <form className="selectwinner--form"onSubmit={this.handleGameSubmit}>
        {" "}
        <label className="selectwinner--label">
          winner:
          <select
            type="select"
            name="winner"
            onChange={this.handleChangeWinner}
          >
            <option value={this.state.playerOne}>{this.state.playerOne}</option>
            <option value={this.state.playerTwo}>{this.state.playerTwo}</option>
          </select>
        </label>
        <input className="selectwinner--submit" type="submit" value="Submit" />{" "}
      </form>
    ) : null;
  };

  handleChangePlayerOne = e => {
    e.preventDefault();
    this.setState({ playerOne: e.target.value });
  };

  handleChangePlayerTwo = e => {
    e.preventDefault();
    this.setState({ playerTwo: e.target.value });
  };

  handleChangeWinner = e => {
    e.preventDefault();
    this.setState({ winner: e.target.value });
  };

  handlePlayerSubmit = e => {
    this.setState({ playersSelected: true });
    e.preventDefault();
  };

  winnerAlertMessage = () => {
    return this.state.winnerDeclared ? (
      <div className="winnerdeclared--alert">
        {this.state.winner} won the game
        <button>
          <Link to="/leaderboard">see leaderboard</Link>
        </button>
        <button className="winneradded--button--reset"onClick={this.resetForm}>add another game</button>
      </div>
    ) : null;
  };

  handleGameSubmit = e => {
    db.collection("games").add({
      player1: this.state.playerOne,
      player2: this.state.playerTwo,
      winner: this.state.winner
    });
    this.setState({ winnerDeclared: true });
    e.preventDefault();
  };
  componentDidMount() {
    db.collection("players")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.setState(({ players }) => ({
            players: [...players, { id: doc.id, data: doc.data() }]
          }));
        });
      })
      .catch(err => {
        console.log("Error getting documents", err);
      });
  }

  render() {
    console.log(this.state.playerOne);
    console.log(this.state.playerTwo);
    console.log(this.state.winner)
    return (
      <div className="creategame">
        <h2 className="creategame--heading">Create Game</h2>
        {this.selectPlayersForm()}
        {this.winnerAddForm()}
        {this.winnerAlertMessage()}
        <Link to="/">
          <i class="fa fa-arrow-left" />
        </Link>
      </div>
    );
  }
}

export default CreateGame;
