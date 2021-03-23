import React, { Component } from "react"
import Axios from "axios"
import RequestContainer from "./components/requestContainer"
import GoalsContainer from "./components/goalsContainer"
import StoreContainer from "./components/storeContainer"
import "./App.css"

class App extends Component {
  componentDidMount() {
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
      url: "https://botoroid-express-app.herokuapp.com/requests",
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
      url: "https://botoroid-express-app.herokuapp.com/goals",
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
      url: "https://botoroid-express-app.herokuapp.com/redemptions",
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
      url: "https://botoroid-express-app.herokuapp.com/goals/update",
      data: { goal: goal.goal },
    }).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        this.getGoals()
      }
    })
  }
  handleSubmit = (value, type) => {
    Axios({
      method: "post",
      url: "https://botoroid-express-app.herokuapp.com/requests/add",
      data: { name: "me", type: type, message: value },
    }).then((res) => {
      console.log(res)
      if (res.statusText === "OK") {
        this.getRequests()
      }
    })
  }

  state = {
    requests: [],
    goals: [],
    redemptions: [],
  }
  render() {
    console.log(this.state)
    return (
      <div className="mainContainer">
        <div className="container" id="requestList">
          <RequestContainer requests={this.state.requests} />
        </div>
        <div className="container" id="goals">
          <GoalsContainer
            goals={this.state.goals}
            onCbucksAdd={this.handleGoalsUpdate}
          />
        </div>
        <div className="container" id="store">
          <StoreContainer
            redemptions={this.state.redemptions}
            onNewSubmit={this.handleSubmit}
          />
        </div>
      </div>
    )
  }
}

export default App
