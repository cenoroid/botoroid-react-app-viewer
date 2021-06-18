import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "../store/actions";
import GoalsHeader from "./goals/goalsHeader";
import GoalsBody from "./goals/goalsBody";

const GoalsContainer = ({ bind, onSize }) => {
  const dispatch = useDispatch();
  const goals = useSelector((state) => state.entities.goals);
  const hovering = useSelector((state) => state.appConfig.player.hovering);
  const [show, setShow] = useState(
    useSelector((state) => state.appConfig.settings.showContainer.goals)
  );

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  useEffect(() => {
    onSize("goals");
  }, [show, hovering, goals, onSize]);

  return show || hovering ? (
    <Fragment>
      <GoalsHeader show={show} onToggle={() => setShow(!show)} bind={bind} />
      {show && <GoalsBody />}
    </Fragment>
  ) : null;
};

export default GoalsContainer;
