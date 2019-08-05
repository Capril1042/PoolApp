import React from "react";

function WinnerAddForm(props) {
  return (
    <form className="selectwinner--form" onSubmit={props.submit}>
      {" "}
      <label className="selectwinner--label">
        winner:
        <select type="select" name="winner" onChange={props.change}>
          <option selected disabled hidden>
            Choose here
          </option>
          <option value={props.playerOne}>{props.playerOne}</option>
          <option value={props.playerTwo}>{props.playerTwo}</option>
        </select>
      </label>
      <input className="selectwinner--submit" type="submit" value="Submit" />{" "}
    </form>
  );
}
export default WinnerAddForm;
