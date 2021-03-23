import React, { Component } from "react"

class RequestListTimer extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="requestListTimer">
        {this.props.timer.minutes}m{this.props.timer.seconds}s
      </div>
    )
  }
}

export default RequestListTimer
