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

  handleSubmit = e => {
    //save game document to firebase
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
    console.log(this.state.playerOne);
    console.log(this.state.playerTwo);
    console.log(this.state.winner);
    return (
      <div className="CreateGame">
        <h1>Create Game</h1>
        <form onSubmit={this.handleSubmit}>
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
          <label>
            winner:
            <select type="select" name="winner" onChange={this.handleWinner}>
              <option value={this.state.playerOne}>
                {this.state.playerOne}
              </option>
              <option value={this.state.playerTwo}>
                {this.state.playerTwo}
              </option>
            </select>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreateGame;
