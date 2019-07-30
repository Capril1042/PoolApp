import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function BackArrow() {
  return (
    <div className="backarrow">
      <Link to="/">
          <i className="fa fa-arrow-left" />
        </Link>
    </div>
  );
}

export default BackArrow;