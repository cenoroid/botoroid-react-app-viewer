import React, { Component } from "react"

import Requests from "./requests"

import RequestListHeader from "./requestListHeader"
import RequestListFooter from "./requestListFooter"
import RequestListTimer from "./requestListTimer"
import ToggleButton from "./toggleButton"

class RequestContainer extends Component {
  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 })
    } else {
      this.setState({ show: 0 })
    }
  }

  state = {
    show: 1,
    timer: { minutes: 0, seconds: 0 },
  }

  render() {
    const renderPage = () => {
      if (this.state.show === 1) {
        return (
          <div>
            <RequestListTimer
              timer={this.state.timer}
              request={this.state.mainRequest}
            />
            <RequestListHeader />
            {this.props.requests.map((request) => (
              <Requests key={request.id} request={request} />
            ))}
            <RequestListFooter requests={this.props.requests} />
          </div>
        )
      }
    }
    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        {renderPage()}
      </div>
    )
  }
}

export default RequestContainer
