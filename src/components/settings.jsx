import React, { useState } from "react";

const Settings = (props) => {
  const [show, setShow] = useState(false);
  function handleSettings() {
    setShow(!show);
  }

  const renderSettings = () => {
    if (show) {
      return (
        <div style={{ backgroundColor: "grey", borderRadius: 5 }}>
          <div>
            Change Sides
            <button
              onClick={props.onChangeSides}
              style={{ height: 30, width: 30 }}
            >
              ↔
            </button>
          </div>
          <div>
            Disable Chests
            <input
              className="chestCheckBox"
              type="checkbox"
              onClick={props.onToggleChests}
            ></input>
          </div>
        </div>
      );
    }
  };
  if (props.hovering) {
    return (
      <div>
        {renderSettings()}
        <button
          style={{ background: "none", border: "none" }}
          onClick={handleSettings}
        >
          ⚙️
        </button>
      </div>
    );
  }
  return null;
};

export default Settings;
