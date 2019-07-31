import React from "react";
import { Link } from "react-router-dom";
import "../App.css";


function LinkButton(props) {
  return (
    <div className="linkbutton">
      <button className="button-big">
          <Link to={props.route}>{props.text}</Link>
        </button>
    </div>
  );
}

export default LinkButton;