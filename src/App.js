import React, { Component } from "react"
import Axios from "axios"
import RequestContainer from "./components/requestContainer"
import GoalsContainer from "./components/goalsContainer"
import StoreContainer from "./components/storeContainer"
import dotenv from "dotenv"
import Login from "./components/login"
import "./App.css"
//const API = process.env.REACT_APP_API
const API = "http://localhost:4000"
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
      url: API + "/requests",
    }).then((res) => {
      console.log("get requests")

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
  handleGoalsUpdate = (goal) => {
    Axios({
      method: "post",
      url: API + "/goals/update",
      data: [{ goal: goal.goal }, { username: this.state.user }],
    }).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        this.setState({ currency: this.state.currency - 1 })
        this.getGoals()
      }
    })
  }
  handleSubmit = (message, type, cost) => {
    Axios({
      method: "post",
      url: API + "/requests/add",
      data: [
        { name: this.state.user, type: type, message: message },
        { user: this.state.user, value: cost },
      ],
    }).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        this.setState({ currency: this.state.currency - cost })
        this.getRequests()
      }
    })
  }
  copyToClipboard = (e) => {
    this.textArea.select()
    document.execCommand("copy")
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus()
    this.setState({ copySuccess: "Copied!" })
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
      if (res.data === "success") {
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
      console.log(res.data[0].cbucks)
      if (res.data.length === 1) {
        this.setState({ user: username, currency: res.data[0].currency })
      }
    })
  }

  state = {
    requests: [],
    goals: [],
    redemptions: [],
    user: "",
    currency: "",
    signupString: "",
  }
  render() {
    console.log(this.state)
    const renderLogin = () => {
      if (this.state.user === "") {
        return (
          <div className="loginContainer">
            <Login onSignup={this.handleSignup} onLogin={this.handleLogin} />
            <p>{this.state.signupString}</p>
          </div>
        )
      }
    }
    return (
      <div>
        {renderLogin()}
        <div className="mainContainer">
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
        </div>
      </div>
    )
  }
}

export default App
