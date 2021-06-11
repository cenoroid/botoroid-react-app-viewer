import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTimer, getTimer, setTimerRunning } from "../../store/timer";

const RequestListTimer = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.timer.timer);
  const timerRunning = useSelector((state) => state.timer.timerRunning);

  useEffect(() => {
    dispatch(getTimer());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timer > 0) {
      if (timerRunning) {
        let lastUpdate = Date.now();
        setTimeout(() => {
          let now = Date.now();
          let deltaTime = now - lastUpdate;
          console.log(deltaTime);
          dispatch(setTimer(deltaTime));
        }, 200);
      }
    } else dispatch(setTimerRunning(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer, timerRunning]);

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

  return <div className="requestListTimer">{timerConvert()}</div>;
};

export default RequestListTimer;
