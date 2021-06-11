import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "../store/entities";
import GoalsHeader from "./goals/goalsHeader";
import Goal from "./goals/goal";
import ToggleButton from "./toggleButton";

const GoalsContainer = (props) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.entities.goals);
  const [show, setShow] = useState(
    useSelector((state) => state.settings.showContainer.goals)
  );
  let { hovering } = props;

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
    dispatch(getGoals());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleToggle() {
    setShow(!show);
  }

  useEffect(() => {
    handleSize();
    // eslint-disable-next-line
  }, [show, hovering, goals]);

  return (
    <div>
      {show ||
        (hovering && (
          <div>
            <ToggleButton status={show} onToggle={handleToggle} />
            <div {...props.bind}>
              <GoalsHeader />
            </div>
          </div>
        ))}
      {show && goals.map((goal) => <Goal key={goal.id} goal={goal} />)}
    </div>
  );
};

export default GoalsContainer;
