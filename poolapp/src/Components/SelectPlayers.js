import React from "react";

function SelectPlayersForm(props) {
  return (
    <form className="selectplayers--form" onSubmit={props.submit}>
      <label className="selectplayers--label">
        Player 1:
        <select
          className="selectplayers--form--select"
          type="select"
          name="playerOne"
          onChange={props.changePlayerOne}
          selected={props.playerOne}
        >
          <option selected disabled hidden>
            Choose here
          </option>
          {props.players.map((player, i) => (
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
          onChange={props.changePlayerTwo}
          selected={props.playerTwo}
        >
          <option selected disabled hidden>
            Choose here
          </option>
          {props.players
            .filter(player => player.data.name !== props.playerOne)
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
  );
}
export default SelectPlayersForm;
