import React from "react";

const ToggleButton = (props) => {
  return (
    <button className="toggleButton" onClick={props.onToggle}>
      {props.status ? "_" : "🗖"}
    </button>
  );
};

export default ToggleButton;
