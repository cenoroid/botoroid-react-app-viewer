import React from "react";
import ToggleButton from "../common/toggleButton";

const StoreHeader = ({ show, bind, onToggle }) => {
  return (
    <div className="storeHeader" id="store" {...bind}>
      <ToggleButton status={show} onToggle={onToggle} />
      Store
    </div>
  );
};

export default StoreHeader;
