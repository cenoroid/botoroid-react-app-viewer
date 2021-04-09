import React, { Component } from "react";
import io from "socket.io-client";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";

//import dotenv from "dotenv";
import Login from "./login";
import Settings from "./settings";

const socket = io("https://botoroid-express-app.herokuapp.com/");
//const socket = io("http://localhost:4000/");
class Extention extends Component {
  handleNewbgColor = (newbgColor) => {
    if (!newbgColor.includes("rgb")) {
      newbgColor = "rgb" + newbgColor;
    }
    this.setState({ bgColor: newbgColor });
  };
  componentDidMount() {
    this.listenToServer();
  }

  listenToServer = () => {
    socket.on("updatecurrency", (data) => {
      this.setState({ currency: this.state.currency + data });
    });
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
  handleLoginSuccess = (data) => {
    this.setState({
      user: data.user,
      currency: data.currency,
      bgColor: data.bgColor,
      mainPosition: data.position,
    });
  };
  handleCurrencyUpdate = (value) => {
    this.setState({ currency: this.state.currency - value });
  };
  state = {
    user: "",
    currency: "",
    mainPosition: "right",
    bgColor: "rgb(47,79,79)",
    newbgColor: "",
  };
  render() {
    console.log(this.state);
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: this.state.bgColor,
        }}
      >
        <div className="loginContainer">
          <Login
            user={this.state.user}
            socket={socket}
            onLoginSuccess={(data) => this.handleLoginSuccess(data)}
          />
        </div>
        <div
          className="mainContainer"
          style={{ float: this.state.mainPosition, marginRight: 350 }}
        >
          <div className="container" id="requestList">
            <RequestContainer socket={socket} timer={this.state.timer} />
          </div>
          <div className="container" id="store">
            <StoreContainer
              socket={socket}
              onNewSubmit={this.handleSubmit}
              currency={this.state.currency}
              user={this.state.user}
              onCurrencyUpdate={(value) => this.handleCurrencyUpdate(value)}
            />
          </div>
          <div className="container" id="goals">
            <GoalsContainer
              user={this.state.user}
              socket={socket}
              currency={this.state.currency}
              onCurrencyUpdate={(value) => this.handleCurrencyUpdate(value)}
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

export default Extention;
