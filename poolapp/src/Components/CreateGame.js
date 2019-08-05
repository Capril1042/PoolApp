import React, { Component } from "react";
import { Link } from "react-router-dom";
import BackArrow from "./BackArrow";
import SelectPlayersForm from "./SelectPlayers";
import WinnerAddForm from "./WinnerAdd";
import db from "../firebase.js";

import "./CreatePlayerGame.css";
import AddedAlert from "./AddedAlert";

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
      <SelectPlayersForm
        players={players}
        submit={this.handlePlayerSubmit}
        changePlayerOne={this.handleChangePlayerOne}
        playerOne={this.state.playerOne}
        changePlayerTwo={this.handleChangePlayerTwo}
        playerTwo={this.state.playerTwo}
      />
    ) : null;
  };

  winnerAddForm = () => {
    return this.state.playersSelected ? (
      <WinnerAddForm
        submit={this.handleGameSubmit}
        change={this.handleChangeWinner}
        playerOne={this.state.playerOne}
        playerTwo={this.state.playerTwo}
      />
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
    if (this.state.playerOne !== "" && this.state.playerTwo !== "") {
      this.setState({ playersSelected: true });
    } else {
      alert(`players weren't properly added try again`);
    }

    e.preventDefault();
  };

  winnerAlertMessage = () => {
    return this.state.winnerDeclared ? (
      <AddedAlert
        className={"winnerdeclared--alert"}
        message={`${this.state.winner} won the game`}
        buttonClassName={"winneradded--button--reset"}
        buttonAction={this.resetForm}
        buttonText={"add another game"}
        linkRoute={"/leaderboard"}
        linkText={"see leaderboard"}
      />
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
    return (
      <div className="creategame">
        <h2 className="creategame--heading">Create Game</h2>
        {this.selectPlayersForm()}
        {this.winnerAddForm()}
        {this.winnerAlertMessage()}
        <BackArrow />
      </div>
    );
  }
}

export default CreateGame;
