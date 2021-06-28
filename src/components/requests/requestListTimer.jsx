import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimerRunning } from "../../store/appConfig";
import { getTimer } from "./../../store/actions";

const RequestListTimer = ({ show }) => {
  const dispatch = useDispatch();
  const { remaining, running: timerRunning } = useSelector(
    (state) => state.appConfig.timer
  );
  const [timer, setCurrentTimer] = useState();
  const timeout = useRef();

  useEffect(() => {
    dispatch(getTimer());
  }, [dispatch]);

  useEffect(() => {
    setCurrentTimer(remaining);
  }, [remaining]);

  useEffect(() => {
    if (!timerRunning || timer <= 0) return;

    let lastUpdate = Date.now();
    timeout.current = setTimeout(() => {
      const now = Date.now();
      const deltaTime = now - lastUpdate;
      let newTime = timer - deltaTime / 1000;
      if (newTime <= 0) {
        newTime = 0;
        return dispatch(setTimerRunning(false));
      }
      setCurrentTimer(newTime);
    }, 200);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [timer, timerRunning, dispatch]);

  function timerConvert() {
    let minutes = Math.floor(timer / 60);
    let seconds = Math.floor(timer % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + "m" + seconds + "s";
  }

  return show ? <div className="requestListTimer">{timerConvert()}</div> : null;
};

export default RequestListTimer;
