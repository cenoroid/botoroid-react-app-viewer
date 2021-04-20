import React, { useState, useEffect } from "react";

const RequestListTimer = (props) => {
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    props.socket.emit("gettimer");
    props.socket.on("starttimer", (resTimer, resTimerRunning) => {
      console.log("yes");
      if (resTimer > 0) {
        setTimer(resTimer);
        setTimerRunning(resTimerRunning);
      }
    });
    props.socket.on("pausetimer", () => {
      console.log("ok");
      setTimerRunning((prevState) => !prevState);
    });
    props.socket.on("stoptimer", () => {
      setTimer(0);
    });
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (timer > 0) {
      if (timerRunning) {
        setTimeout(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
      }
    } else setTimerRunning(false);
  }, [timer, timerRunning]);

  function timerConvert() {
    if (timer < 0) {
      setTimer(0);
    }
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
