import React from "react";

const ToggleButton = ({ status, onToggle }) => {
  return (
    <button className="toggleButton" onClick={onToggle}>
      {status ? "_" : "🗖"}
    </button>
  );
};

export default ToggleButton;
