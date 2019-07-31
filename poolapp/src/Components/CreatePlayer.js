import React, { useState, useEffect } from "react";

import AddedAlert from "./AddedAlert";
import BackArrow from "./BackArrow";
import db from "../firebase.js";

import exists from "../Utils/ValidatePlayer";
import "./CreatePlayerGame.css";
import getPlayers from "../Utils/GetPlayers.js";

function CreatePlayer() {
  const [name, setName] = useState("");
  const [playerAdded, setPlayerAdded] = useState(false);
  const [existingPlayers, setExisitingPlayers] = useState(null);

  useEffect(() => {
    let newPlayers = getPlayers();
    setExisitingPlayers({ existingPlayers: newPlayers });
  }, []);

  const resetForm = () => {
    setName({ name: "", playerAdded: false });
  };

  const playerAddedInfo = () => {
    return playerAdded ? (
      <AddedAlert
        className={"createplayer--playeradded"}
        message={`${name} was added!`}
        action={resetForm}
      />
    ) : null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    let newName = name;
    let playerExists = exists(existingPlayers.existingPlayers, newName);

    if (playerExists === true) {
      alert("already in db");
    } else {
      db.collection("players").add({
        name: newName
      });
      setPlayerAdded({ playerAdded: true });
    }
  };
  return (
    <div className="createplayer">
      <h2 className="createplayer--heading">Create Player</h2>
      <form className="createplayer--form" onSubmit={handleSubmit}>
        <label className="createplayer--form--label">
          Name:
          <input
            className="createplayer--form--input"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <input
          className="createplayer--form--submit"
          type="submit"
          value="Submit"
        />
      </form>
      {playerAddedInfo()}
      <BackArrow />
    </div>
  );
}

export default CreatePlayer;
