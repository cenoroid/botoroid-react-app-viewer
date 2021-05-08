import React, { useState, useEffect } from "react";
import GoalsHeader from "./goalsHeader";
import Goal from "./goal";
import ToggleButton from "./toggleButton";

const GoalsContainer = (props) => {
  const [goals, setGoals] = useState([]);
  const [show, setShow] = useState(true);

  function handleSize() {
    props.onSize({
      width:
        (100 * document.getElementById("goals").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("goals").offsetHeight) /
        window.innerHeight,
    });
  }
  useEffect(() => {
    props.socket.emit("getgoals");
    props.socket.on("getgoals", (data) => {
      setGoals(data);
      handleSize();
    });
    // eslint-disable-next-line
  }, []);
  function handleToggle() {
    setShow(!show);
  }
  useEffect(() => {
    handleSize();
    // eslint-disable-next-line
  }, [show]);
  function handleGoalsUpdate(goalId, value) {
    let data = {
      idx: goalId - 1,
      username: props.user,
      value: value,
    };

    props.socket.emit("goalupdate", data);

    props.onCurrencyUpdate(value);
  }
  const renderPage = () => {
    if (show) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...props.bind}>
            <GoalsHeader />
          </div>
          {goals.map((goal) => (
            <Goal
              key={goal.id}
              goal={goal}
              onCbucksAdd={(value) => handleGoalsUpdate(goal.id, value)}
              currency={props.currency}
            />
          ))}
        </div>
      );
    } else if (props.hovering) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...props.bind}>
            <GoalsHeader />
          </div>
        </div>
      );
    }
    return null;
  };
  return <div>{renderPage()}</div>;
};

export default GoalsContainer;
