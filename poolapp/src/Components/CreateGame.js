import React, { Component } from "react";
import db from "../firebase.js";

import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerOne: "",
      playerTwo: "",
      winner: ""
    };
  }

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
    //save game document to firebase
    console.log(this.state.playerOne);
    console.log(this.state.playerTwo);

    alert(
      `${this.state.playerOne} and ${this.state.playerTwo} are playing a game`
    );
    e.preventDefault();
  };

  handleGameSubmit = e => {
    db.collection("games").add({
      player1: this.state.playerOne,
      player2: this.state.playerTwo,
      winner: this.state.winner
    });
    alert(`${this.state.winner} won the game`);
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
    const players = this.state.players;

    return (
      <div className="CreateGame">
        <h1>Create Game</h1>
        <form onSubmit={this.handlePlayerSubmit}>
          <label>
            Player 1:
            <select
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
          <label>
            Player 2:
            <select
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
          <input type="submit" value="Submit" />
        </form>
        <form onSubmit={this.handleGameSubmit}>
          {" "}
          <label>
            winner:
            <select
              type="select"
              name="winner"
              onChange={this.handleChangeWinner}
            >
              <option value={this.state.playerOne}>
                {this.state.playerOne}
              </option>
              <option value={this.state.playerTwo}>
                {this.state.playerTwo}
              </option>
            </select>
          </label>
          <input type="submit" value="Submit" />{" "}
        </form>
      </div>
    );
  }
}

export default CreateGame;
