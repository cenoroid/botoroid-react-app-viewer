import React, { useState, useEffect } from "react";
import GoalsHeader from "./goalsHeader";
import Goal from "./goal";
import ToggleButton from "./toggleButton";
import { useDragContainer } from "./useDragContainer";

const GoalsContainer = (props) => {
  const [goals, setGoals] = useState([]);
  const [show, setShow] = useState(true);
  const [size, setSize] = useState();
  const { pos, setPos, isDragging, bind } = useDragContainer({
    x: 21,
    y: 0,
    blockedArea: props.blockedArea,
    container: "goals",
  });

  useEffect(() => {
    setPos((prev) => ({ ...prev, blockedArea: props.blockedArea }));
    // eslint-disable-next-line
  }, [props.blockedArea]);
  useEffect(() => {
    if (!isDragging && size) {
      props.onNewBlockedArea(
        pos.translateX,
        pos.translateY,
        size.width,
        size.height
      );
    }
    // eslint-disable-next-line
  }, [isDragging, size]);
  useEffect(() => {
    setPos((prev) => ({ ...prev, size }));
    // eslint-disable-next-line
  }, [size]);
  function handleSize() {
    setSize({
      width:
        (100 * document.getElementById("goals").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("goals").offsetHeight) /
        window.innerHeight,
    });
  }
  useEffect(() => {
    handleSize();
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
        <div
          className="container"
          id="goals"
          style={{
            marginTop: pos.translateY + "vh",
            marginLeft: pos.translateX + "vw",
          }}
        >
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...bind}>
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
          <GoalsHeader />
        </div>
      );
    }
    return null;
  };
  return renderPage();
};

export default GoalsContainer;
