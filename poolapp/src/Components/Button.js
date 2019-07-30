import React from "react";
import "../App.css";

function Button(props) {
  return (
    <div className="button">
      <button className={props.className} onClick={props.clickAction}>
        {props.text}
      </button>
    </div>
  );
}

export default Button;
