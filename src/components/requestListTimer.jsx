import React, { Component } from "react"

class RequestListTimer extends Component {
  componentDidMount() {}
  timerConvert = () => {
    let minutes = Math.floor(this.props.timer / 60)
    let seconds = Math.floor(this.props.timer % 60)
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    if (seconds < 10) {
      seconds = "0" + seconds
    }
    return minutes + "m" + seconds + "s"
  }

  render() {
    return <div className="requestListTimer">{this.timerConvert()}</div>
  }
}

export default RequestListTimer
