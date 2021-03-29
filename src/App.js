import React, { Component } from "react";
import io from "socket.io-client";
import RequestContainer from "./components/requestContainer";
import GoalsContainer from "./components/goalsContainer";
import StoreContainer from "./components/storeContainer";
import dotenv from "dotenv";
import Login from "./components/login";
import Settings from "./components/settings";
import "./App.css";
const socket = io("https://botoroid-express-app.herokuapp.com/");
class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleChange(event) {
    this.setState({ newbgColor: event.target.value });
  }
  handleType(event) {
    event.preventDefault();
  }
  handleNewbgColor = (newbgColor) => {
    if (!newbgColor.includes("rgb")) {
      newbgColor = "rgb" + newbgColor;
    }
    this.setState({ bgColor: newbgColor });
  };
  componentDidMount() {
    dotenv.config();
    this.getRequests();
    this.getGoals();
    this.getRedemptions();
    this.connectToServer();
    this.listenToServer();
  }
  connectToServer = () => {
    socket.on("connection");
  };

  emitToServer = (type, data) => {
    socket.emit(type, data);
  };
  listenToServer = () => {
    socket.on("getrequests", (data) => {
      console.log(data);
      this.setState({ requests: data });
    });
    socket.on("getgoals", (data) => {
      for (let index = 0; index < data.length; index++) {
        data[index].id = index + 1;
      }
      this.setState({ goals: data });
    });
    socket.on("getredemptions", (data) => {
      for (let index = 0; index < data.length; index++) {
        data[index].id = index + 1;
      }
      this.setState({ redemptions: data });
    });
    socket.on("signup", (res) => {
      if (res.text === "sign up success") {
        this.setState({
          signupString: (
            <div>
              <textarea
                style={{
                  marginTop: 10,
                  resize: "none",
                  border: "none",
                  width: "35%",
                }}
                readOnly
                type="text"
                ref={(textarea) => (this.textArea = textarea)}
                value={"!verify " + res.number}
              />

              <button
                style={{ position: "absolute", width: 30, height: 30 }}
                onClick={this.copyToClipboard}
              >
                Copy
              </button>
              <p>paste this in chat</p>
            </div>
          ),
        });
      } else {
        this.setState({ signupString: "name already exists" });
      }
    });
    socket.on("login", (res) => {
      if (res !== null) {
        if (res === "wrong password") {
          this.setState({ signupString: "wrong password buddy" });
        } else if (res.status === "verified") {
          if (res.hasOwnProperty("bgColor"))
            this.setState({
              user: res.username,
              currency: res.currency,
              bgColor: res.pref.bg,
            });
          else {
            this.setState({
              user: res.username,
              currency: res.currency,
            });
          }
        } else {
          this.setState({
            signupString:
              "user not verified, sign up and use code to verify your account",
          });
        }
      } else {
        this.setState({ signupString: "user not found, just sign up" });
      }
    });
    socket.on("forgotpassword", (res) => {
      this.setState({ signupString: res });
    });
    socket.on("starttimer", (timer) => {
      this.setState({ timer, timerRunning: true });

      this.timerInterval = setInterval(this.timer, 1000);
    });
    socket.on("pausetimer", () => {
      if (this.state.timerRunning) {
        this.setState({ timerRunning: false });
        clearInterval(this.timerInterval);
      } else {
        this.setState({ timerRunning: true });
        this.timerInterval = setInterval(this.timer, 1000);
      }
    });
    socket.on("stoptimer", () => {
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
      clearInterval(this.timerInterval);
    }
  };
  getRequests = () => {
    socket.emit("getrequests");
  };

  getGoals = () => {
    socket.emit("get", "goals");
  };
  getRedemptions = () => {
    socket.emit("get", "redemptions");
  };
  handleGoalsUpdate = (goalObject, value) => {
    let goals = [...this.state.goals];
    let updateGoal = goals.find(({ goal }) => goal === goalObject.goal);
    updateGoal.current = updateGoal.current + value;
    this.setState({ goals, currency: this.state.currency - value });
    let data = {
      goal: goalObject.goal,
      username: this.state.user,
      value: value,
      state: goals,
    };
    socket.emit("goalupdate", data);
  };
  handleSubmit = (message, type, cost) => {
    this.setState({ currency: this.state.currency - cost });
    let data = {
      username: this.state.user,
      type: type,
      message: message,
      value: cost,
    };
    socket.emit("requestsupdate", data);
  };
  copyToClipboard = (e) => {
    this.textArea.select();
    document.execCommand("copy");
    e.target.focus();
  };
  handleSignup = (username, password) => {
    let number = Math.random() * (100000000000000000 - 0);
    let data = {
      username: username,
      password: password,
      status: "pending",
      string: number,
    };
    socket.emit("signup", data);
  };
  handleLogin = (username, password) => {
    let data = { username: username, password: password };
    socket.emit("login", data);
  };
  handleForgotPassword = (username, password) => {
    let data = { username: username, password: password };
    socket.emit("forgotpassword", data);
  };

  handleChangeSides = () => {
    if (this.state.mainPosition === "left") {
      this.setState({ mainPosition: "right" });
    } else {
      this.setState({ mainPosition: "left" });
    }
  };
  handleSaveDefaults = () => {
    socket.emit("updatepref", {
      username: this.state.user,
      position: this.state.mainPosition,
      bgColor: this.state.bgColor,
    });
  };
  state = {
    requests: [],
    goals: [],
    redemptions: [],
    user: "",
    currency: "",
    signupString: "",
    mainPosition: "left",
    bgColor: "rgb(47,79,79)",
    newbgColor: "",
    timer: 0,
    timerRunning: false,
  };
  render() {
    const renderLogin = () => {
      if (this.state.user === "") {
        return (
          <div className="loginContainer">
            <Login
              onSignup={this.handleSignup}
              onLogin={this.handleLogin}
              onForgotPassword={this.handleForgotPassword}
            />
            {this.state.signupString}
          </div>
        );
      }
    };
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: this.state.bgColor,
        }}
      >
        {renderLogin()}
        <div
          className="mainContainer"
          style={{ float: this.state.mainPosition }}
        >
          <div className="container" id="requestList">
            <RequestContainer
              requests={this.state.requests}
              timer={this.state.timer}
            />
          </div>
          <div className="container" id="store">
            <StoreContainer
              redemptions={this.state.redemptions}
              onNewSubmit={this.handleSubmit}
              currency={this.state.currency}
              user={this.state.user}
            />
          </div>
          <div className="container" id="goals">
            <GoalsContainer
              goals={this.state.goals}
              onCbucksAdd={this.handleGoalsUpdate}
              currency={this.state.currency}
            />
          </div>

          <Settings
            onNewbgColor={this.handleNewbgColor}
            onChangeSides={this.handleChangeSides}
            onSaveDefaults={this.handleSaveDefaults}
          />
        </div>
      </div>
    );
  }
}

export default App;
