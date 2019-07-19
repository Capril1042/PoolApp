import React, { Component } from "react";
import db from "../firebase.js";

import "./CreateGame.css";

class CreateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      playerOne: "",
      playerTwo: ""
    };
  }

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
    console.log(players);
    return (
      <div className="CreateGame">
        <h1>Create Game</h1>
        <form>
          <label>
            Player 1:
            <select>
              {players.map((player, i) => (
                <option key={i} value={player.data.name}>
                  {player.data.name}
                </option>
              ))};
            </select>
          </label>
          <label>
            Player 2:<select />
          </label>
          <label>
            winner:
            <select>
              <option>{this.state.player1}</option>
              <option>{this.state.player2}</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default CreateGame;
