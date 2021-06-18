import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToGoal } from "../../store/actions";
import { useNumberInput } from "../hooks/useNumberInput";

const Goal = ({ goal }) => {
  const dispatch = useDispatch();
  const { value, bind, reset } = useNumberInput("");
  const [{ button, width }, setButton] = useState({
    button: false,
    width: "1.5vw",
  });

  function handleCbucksAdd() {
    if (value > 0) {
      if (goal.current + Number(value) <= goal.end) {
        let data = {
          id: goal.id - 1,
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
          width: (goal.current / goal.end) * 97.5 + "%",
        }}
      ></div>
      <div className="goalTitle">{goal.goal}</div>
      <div className="goalNumbers" style={{ right: width }}>
        {goal.current} /{goal.end}
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
