import React, { Component } from "react";
import { Link } from "react-router-dom";
import db from "../firebase.js";

import "./CreatePlayer.css";

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      playerAdded: false
    };
  }

  resetForm = () => {
    this.setState({ name: "", playerAdded: false });
  };
  playerAddedInfo = () => {
    return this.state.playerAdded ? (
      <div className="createplayer--playeradded">
        {this.state.name} was added!
        <button className="playeradded--button--reset" onClick={this.resetForm}>
          add another player
        </button>
        <button className="playeradded--button">
          <Link to="/creategame">start a new game</Link>{" "}
        </button>
      </div>
    ) : null;
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newName = this.state.name;

    db.collection("players").add({
      name: newName
    });
    this.setState({ playerAdded: true });
  };

  render() {
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
        <Link to="/">
          <i class="fa fa-arrow-left" />
        </Link>
      </div>
    );
  }
}

export default CreatePlayer;
