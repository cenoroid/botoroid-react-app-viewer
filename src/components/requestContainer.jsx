import React, { Component } from "react";

import Requests from "./requests";

import RequestListHeader from "./requestListHeader";
import RequestListFooter from "./requestListFooter";
import RequestListTimer from "./requestListTimer";
import ToggleButton from "./toggleButton";

class RequestContainer extends Component {
  componentDidMount() {
    this.getRequests();
  }
  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 });
    } else {
      this.setState({ show: 0 });
    }
  };
  getRequests = () => {
    this.props.socket.emit("getrequests");
    this.props.socket.on("getrequests", (data) => {
      this.setState({ requests: data });
    });
  };

  state = {
    requests: [],
    show: 1,
  };
  render() {
    const renderPage = () => {
      if (this.state.show === 1) {
        return (
          <div>
            <RequestListTimer socket={this.props.socket} />

            {this.state.requests.map((request) => (
              <Requests key={request.id} request={request} />
            ))}
            <RequestListFooter requests={this.state.requests} />
          </div>
        );
      }
    };
    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        <RequestListHeader />
        {renderPage()}
      </div>
    );
  }
}

export default RequestContainer;
