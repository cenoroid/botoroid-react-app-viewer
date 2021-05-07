import React, { useState, useEffect } from "react";
import GoalsHeader from "./goalsHeader";
import Goal from "./goal";
import ToggleButton from "./toggleButton";
import { useDragContainer } from "./useDragContainer";
import _ from "lodash";
const GoalsContainer = (props) => {
  const [goals, setGoals] = useState([]);
  const [show, setShow] = useState(true);

  const {
    pos,

    isDragging,
    bind,

    blockedArea,
    setBlockedArea,
    resetAttached,
    setSize,
    ownBlockedArea,
  } = useDragContainer({
    x: 0,
    y: 2,
    blockedArea: props.blockedArea,
    container: "goals",
  });

  useEffect(() => {
    if (
      !_.isEqual(props.blockedArea, blockedArea) &&
      props.blockedArea.hasOwnProperty("requests") &&
      props.blockedArea.hasOwnProperty("store")
    ) {
      setBlockedArea(props.blockedArea);
    }
    // eslint-disable-next-line
  }, [props.blockedArea]);

  useEffect(() => {
    if (!isDragging) {
      props.onDragging(false);
    }
    if (isDragging) {
      props.onDragging("goals");
    }
    // eslint-disable-next-line
  }, [isDragging]);
  useEffect(() => {
    if (props.dragging !== null) {
      resetAttached(props.dragging);
    }
    // eslint-disable-next-line
  }, [props.dragging]);
  useEffect(() => {
    props.onNewBlockedArea(ownBlockedArea);
    // eslint-disable-next-line
  }, [ownBlockedArea]);

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
  return (
    <div
      className="container"
      id="goals"
      style={{
        marginTop: pos.translateY + "vh",
        marginLeft: pos.translateX + "vw",
      }}
    >
      {renderPage()}
    </div>
  );
};

export default GoalsContainer;
