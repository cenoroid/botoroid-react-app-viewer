import React, { useState } from "react";
import { useNumberInput } from "./useNumberInput";
const Goal = (props) => {
  const {
    value: amount,
    bind: bindAmount,
    reset: resetAmount,
  } = useNumberInput("");
  const [{ button, width }, setButton] = useState({
    button: false,
    width: 18 + "vw",
  });
  function handleCbucksAdd() {
    if (amount > 0) {
      if (props.goal.current + Number(amount) <= props.goal.end) {
        if (props.currency >= amount) {
          props.onCbucksAdd(amount);
          resetAmount();
        }
      }
    }
    setButton({ button: false, width: 18 + "vw" });
  }
  const renderAddCbucksButton = () => {
    if (button) {
      return (
        <div className="goalAdd">
          <input
            autoComplete="off"
            {...bindAmount}
            className="goalAddInput"
            placeholder="cbucks"
          ></input>
          <button className="goalAddButton" onClick={handleCbucksAdd}>
            ➞
          </button>
        </div>
      );
    }
    return (
      <button
        className="goalAddButton"
        onClick={() => {
          setButton({ button: true, width: 15 + "vw" });
        }}
      >
        +
      </button>
    );
  };
  return (
    <div className="goal">
      <div className="goalBorder"></div>

      <div
        style={{
          width: (props.goal.current / props.goal.end) * 97.5 + "%",
        }}
        className="goalFill"
      ></div>

      <div className="goalTitle">{props.goal.goal}</div>

      <div className="goalNumbers" style={{ width: width }}>
        {props.goal.current} /{props.goal.end}
      </div>
      {renderAddCbucksButton()}
    </div>
  );
};
export default Goal;
