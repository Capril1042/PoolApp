import React, { Component } from "react";
import { Link } from "react-router-dom";
import AddedAlert from "./AddedAlert";
import BackArrow from "./BackArrow";
import db from "../firebase.js";

import exists from "../Utils/ValidatePlayer";
import "./CreatePlayerGame.css";
import getPlayers from "../Utils/GetPlayers.js";

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      playerAdded: false,
      existingplayers: []
    };
  }
  componentDidMount() {
    let newPlayers = getPlayers();
    this.setState({ existingplayers: newPlayers });
  }

  resetForm = () => {
    this.setState({ name: "", playerAdded: false });
  };

  playerAddedInfo = () => {
    return this.state.playerAdded ? (
      <AddedAlert className={"createplayer--playeradded"}
      message={`${this.state.name} was added!`}
      action={this.resetForm}/>
    ) : null;
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newName = this.state.name;
    let playerExists = exists(this.state.existingplayers, newName);

    if (playerExists === true) {
      alert("already in db");
    } else {
      db.collection("players").add({
        name: newName
      });
      this.setState({ playerAdded: true });
    }
  };

  render() {
    console.log(this.state.existingplayers);
    return (
      <div className="createplayer">
        <h2 className="createplayer--heading">Create Player</h2>
        <form className="createplayer--form" onSubmit={this.handleSubmit}>
          <label className="createplayer--form--label">
            Name:
            <input
              className="createplayer--form--input"
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            />
          </label>
          <input
            className="createplayer--form--submit"
            type="submit"
            value="Submit"
          />
        </form>
        {this.playerAddedInfo()}
        <BackArrow/>
      </div>
    );
  }
}

export default CreatePlayer;
