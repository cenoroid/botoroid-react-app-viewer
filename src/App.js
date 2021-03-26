import React, { Component } from "react"
import Axios from "axios"

import RequestContainer from "./components/requestContainer"
import GoalsContainer from "./components/goalsContainer"
import StoreContainer from "./components/storeContainer"
import dotenv from "dotenv"
import Login from "./components/login"
import "./App.css"

const API = process.env.REACT_APP_API
//const API = "http://localhost:4000"
class App extends Component {
  componentDidMount() {
    dotenv.config()
    this.getRequests()
    this.getGoals()
    this.getRedemptions()
  }

  getRequests = () => {
    //Axios({
    //   method: "get",
    //   url: "http://localhost:4000/requestListTimer",
    // }).then((res) => {
    //  let timer = res.data
    //  this.setState({ timer: timer })
    // })
    Axios({
      method: "get",
      url:
        "https://botoroid-viewer-ui.netlify.app/.netlify/functions/getRequests",
    }).then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].id = index + 1
      }

      this.setState({ requests: res.data })
    })
  }

  getGoals = () => {
    Axios({
      method: "get",
      url: API + "/goals",
    }).then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].id = index + 1
      }
      this.setState({ goals: res.data })
    })
  }
  getRedemptions = () => {
    Axios({
      method: "get",
      url: API + "/redemptions",
    }).then((res) => {
      for (let index = 0; index < res.data.length; index++) {
        res.data[index].id = index + 1
      }
      this.setState({ redemptions: res.data })
    })
  }
  handleGoalsUpdate = (goalObject) => {
    this.setState((prevState) => {
      let goals = [...prevState.goals]
      let updateGoal = goals.find(({ goal }) => goal === goalObject.goal)
      updateGoal.current = updateGoal.current + 1
      return { goals }
    })
    this.setState({ currency: this.state.currency - 1 })
    Axios({
      method: "post",
      url: API + "/goals/update",
      data: [{ goal: goalObject.goal }, { username: this.state.user }],
    })
  }
  handleSubmit = (message, type, cost) => {
    this.setState((prevState) => {
      let requests = [...prevState.requests]
      requests.push({
        name: this.state.user,
        type: type,
        message: message,
        id: requests.length + 1,
      })
      return {
        requests,
      }
    })
    this.setState({ currency: this.state.currency - cost })
    Axios({
      method: "post",
      url: API + "/requests/add",
      data: [
        { name: this.state.user, type: type, message: message },
        { user: this.state.user, value: cost },
      ],
    })
  }
  copyToClipboard = (e) => {
    this.textArea.select()
    document.execCommand("copy")
    e.target.focus()
  }
  handleSignup = (username, password) => {
    let number = Math.random() * (100000000000000000 - 0)
    Axios({
      method: "post",
      url: API + "/users/add",
      data: {
        username: username,
        password: password,
        status: "pending",
        string: number,
      },
    }).then((res) => {
      if (res.data === "sign up success") {
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
                value={"!verify " + number}
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
        })
      } else {
        this.setState({ signupString: "name already exists" })
      }
    })
  }
  handleLogin = (username, password) => {
    Axios({
      method: "post",
      url: API + "/users",
      data: { username: username, password: password },
    }).then((res) => {
      if (res.data !== null) {
        if (res.data === "wrong password") {
          this.setState({ signupString: "wrong password buddy" })
        } else if (res.data.status === "verified") {
          this.setState({ user: username, currency: res.data.currency })
        } else {
          this.setState({
            signupString:
              "user not verified, sign up and use code to verify your account",
          })
        }
      } else {
        this.setState({ signupString: "user not found, just sign up" })
      }
    })
  }
  handleForgotPassword = (username, password) => {
    Axios({
      method: "post",
      url: API + "/users/forgotpassword",
      data: { username: username, password: password },
    }).then((res) => {
      this.setState({ signupString: res.data })
    })
  }

  handleChangeSides = () => {
    if (this.state.mainPosition === "left") {
      this.setState({ mainPosition: "right" })
    } else {
      this.setState({ mainPosition: "left" })
    }
  }
  state = {
    requests: [],
    goals: [],
    redemptions: [],
    user: "",
    currency: "",
    signupString: "",
    mainPosition: "left",
  }
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
        )
      }
    }
    return (
      <div
        style={{
          height: "100vw",
          width: "100vw",
          backgroundColor: "rgb(47,79,79)",
        }}
      >
        {renderLogin()}
        <div
          className="mainContainer"
          style={{ float: this.state.mainPosition }}
        >
          <div className="container" id="requestList">
            <RequestContainer requests={this.state.requests} />
          </div>
          <div className="container" id="goals">
            <GoalsContainer
              goals={this.state.goals}
              onCbucksAdd={this.handleGoalsUpdate}
              currency={this.state.currency}
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
          <button
            onClick={this.handleChangeSides}
            style={{ height: 30, width: 30, float: this.state.mainPosition }}
          >
            ↔
          </button>
        </div>
      </div>
    )
  }
}

export default App
