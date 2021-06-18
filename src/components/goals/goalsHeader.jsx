import React from "react";
import ToggleButton from "../common/toggleButton";

const GoalsHeader = ({ show, onToggle, bind }) => {
  return (
    <div className="goalsHeader" id="goals" {...bind}>
      <ToggleButton status={show} onToggle={onToggle} />
      Community Goals
    </div>
  );
};

export default GoalsHeader;
