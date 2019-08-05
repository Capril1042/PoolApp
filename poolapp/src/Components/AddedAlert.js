import React from "react";
import Button from "./Button";
import LinkButton from "./LinkButton";
import "../App.css";

function AddedAlert(props) {
  return (
    <div className={props.className}>
      {props.message}
      <Button
        className={props.buttonClassName}
        clickAction={props.buttonAction}
        text={props.buttonText}
      />
      <LinkButton route={props.linkRoute} text={props.linkText} />
    </div>
  );
}

export default AddedAlert;
