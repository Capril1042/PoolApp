import React, { Component } from "react";
import db from "../firebase.js";

import "./CreatePlayer.css";

class CreatePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    let newName = this.state.name;

    db.collection("players").add({
      name: newName
    });
    alert(`${this.state.name} was added`);
    this.setState({ name: "" });
  };

  render() {
    return (
      <div className="CreatePlayer">
        <h1>Create Player</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={event => this.handleChange(event)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default CreatePlayer;
