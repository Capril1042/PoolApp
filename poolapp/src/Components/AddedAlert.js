import React from "react";
import Button from "./Button"
import LinkButton from "./LinkButton"
import "../App.css";

function AddedAlert(props) {
  return (
    <div className={props.className}>
    {props.message}
    <Button className={"playeradded--button--reset"} 
            clickAction={props.action} 
            text={"add another player"}/>
    <LinkButton route={"/creategame"} text={"start a new game"} />
  </div>
  );
}

export default AddedAlert;