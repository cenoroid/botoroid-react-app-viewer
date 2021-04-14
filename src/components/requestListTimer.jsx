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
      setTimerRunning(false);
      setTimer(0);
    });
  }, [props.socket]);

  useEffect(() => {
    console.log(timerRunning);
    let timerInterval;
    let newTimer;
    if (timerRunning) {
      newTimer = timer;
      timerInterval = setInterval(() => {
        countdown();
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    function countdown() {
      console.log(newTimer);
      if (newTimer > 0) {
        newTimer = newTimer - 1;
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setTimerRunning(false);
      }
      console.log(newTimer);
    }
    return () => {
      clearInterval(timerInterval);
    };
  }, [timerRunning]);

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
