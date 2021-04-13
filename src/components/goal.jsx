import React, { useState } from "react";
import { useNumberInput } from "./useNumberInput";
const Goal = (props) => {
  const [value, handleChange] = useNumberInput({ cbucks: 0 });
  const [{ button, width }, setButton] = useState({
    button: false,
    width: 330,
  });
  function handleCbucksAdd() {
    if (value.value !== "" && value.cbucks > 0) {
      if (props.goal.current + Number(value.cbucks) <= props.goal.end) {
        if (props.currency >= value.cbucks) {
          props.onCbucksAdd(value.cbucks);
        }
      }
    }
    setButton({ button: false, width: 330 });
  }
  const renderAddCbucksButton = () => {
    if (button) {
      return (
        <div style={{ position: "absolute", marginTop: -33, right: 0 }}>
          <input
            name="cbucks"
            style={{ width: 60, height: 30.5, marginTop: 2 }}
            value={value.cbucks}
            onChange={handleChange}
            className="goalAddInput"
            placeholder="cbucks"
          ></input>
          <button style={{ height: 30, width: 30 }} onClick={handleCbucksAdd}>
            ➞
          </button>
        </div>
      );
    }
    return (
      <button
        className="goalAdd"
        onClick={() => {
          setButton({ button: true, width: 200 });
        }}
      >
        +
      </button>
    );
  };
  return (
    <div>
      <div className="goalBorder">{props.goal.goal}</div>
      {renderAddCbucksButton()}
      <div
        style={{
          width: (props.goal.current / props.goal.end) * 340,
        }}
        className="goalFill"
      ></div>
      <div className="goalText" style={{ width: width }}>
        {props.goal.current} /{props.goal.end}
      </div>
    </div>
  );
};
export default Goal;
