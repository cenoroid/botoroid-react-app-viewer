import React, { useState, useEffect } from "react";
import GoalsHeader from "./goalsHeader";
import Goal from "./goal";
import ToggleButton from "./toggleButton";
import axios from "axios";
const GoalsContainer = (props) => {
  const [goals, setGoals] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const getGoals = async () => {
      axios.get(props.API + "/getgoals").then((res) => {
        setGoals(res.data);
      });
    };
    getGoals();
  }, [props.API, props.socket]);

  props.socket.on("getgoals", (data) => {
    setGoals(data);
  });
  function handleToggle() {
    setShow(!show);
  }
  function handleGoalsUpdate(goalId, value) {
    let data = {
      idx: goalId - 1,
      username: props.user,
      value: value,
    };

    axios
      .post(props.API + "/goalupdate", data)
      .catch((err) => console.log(err));

    props.onCurrencyUpdate(value);
  }
  const renderPage = () => {
    if (show) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <GoalsHeader />
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
