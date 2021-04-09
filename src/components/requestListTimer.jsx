import React, { Component } from "react";

class RequestListTimer extends Component {
  componentDidMount() {
    this.getTimer();
  }
  getTimer = () => {
    this.props.socket.emit("gettimer");
    this.props.socket.on("starttimer", (timer, timerRunning) => {
      if (timer > 0) {
        this.setState({ timer, timerRunning });
        if (timerRunning) {
          this.timerInterval = setInterval(this.timer, 1000);
        }
      }
    });
    this.props.socket.on("pausetimer", () => {
      if (this.state.timerRunning) {
        this.setState({ timerRunning: false });
        clearInterval(this.timerInterval);
      } else {
        this.setState({ timerRunning: true });
        this.timerInterval = setInterval(this.timer, 1000);
      }
    });
    this.props.socket.on("stoptimer", () => {
      this.setState({ timer: 0 });
    });
  };
  timerInterval;
  timer = () => {
    if (this.state.timer > 0) {
      this.setState((prevState) => {
        return { timer: prevState.timer - 1 };
      });
    } else {
      this.setState({ timerRunning: false });
      clearInterval(this.timerInterval);
      console.log("runs");
    }
  };
  timerConvert = () => {
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = Math.floor(this.state.timer % 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + "m" + seconds + "s";
  };
  state = { timer: 0, timerRunning: false };
  render() {
    return <div className="requestListTimer">{this.timerConvert()}</div>;
  }
}

export default RequestListTimer;
