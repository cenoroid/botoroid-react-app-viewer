import React from "react";

const ToggleButton = (props) => {
  function buttonText() {
    if (!props.status) {
      return "🗖";
    }
    return "🗕";
  }

  return (
    <button className="toggleButton" onClick={() => props.onToggle()}>
      {buttonText()}
    </button>
  );
};

export default ToggleButton;
