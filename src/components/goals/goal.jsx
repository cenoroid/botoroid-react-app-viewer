import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToGoal } from "../../store/entities";
import { useNumberInput } from "../hooks/useNumberInput";

const Goal = (props) => {
  const dispatch = useDispatch();
  const { value, bind, reset } = useNumberInput("");
  const [{ button, width }, setButton] = useState({
    button: false,
    width: "1.5vw",
  });

  function handleCbucksAdd() {
    if (value > 0) {
      if (props.goal.current + Number(value) <= props.goal.end) {
        let data = {
          id: props.goal.id - 1,
          value,
        };
        dispatch(addToGoal(data));
        reset();
      }
    }
    setButton({ button: false, width: "1.5vw" });
  }

  return (
    <div className="goal">
      <div className="goalBorder"></div>

      <div
        className="goalFill"
        style={{
          width: (props.goal.current / props.goal.end) * 97.5 + "%",
        }}
      ></div>
      <div className="goalTitle">{props.goal.goal}</div>
      <div className="goalNumbers" style={{ right: width }}>
        {props.goal.current} /{props.goal.end}
      </div>
      {button ? (
        <div className="goalAdd">
          <input
            autoComplete="off"
            {...bind}
            className="goalAddInput"
            placeholder="cbucks"
          ></input>
          <button className="goalAddButton" onClick={handleCbucksAdd}>
            ➞
          </button>
        </div>
      ) : (
        <button
          className="goalAddButton"
          onClick={() => {
            setButton({ button: true, width: "4.5vw" });
          }}
        >
          +
        </button>
      )}
    </div>
  );
};
export default Goal;
