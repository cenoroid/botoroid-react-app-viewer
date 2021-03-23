import React, { Component } from "react"
import youtubeIconImport from "./youtubeicon.png"
import greyYoutubeIconImport from "./greyyoutubeicon.png"
import gameIconImport from "./xboxicon.png"

class Requests extends Component {
  defineIcon = () => {
    if (this.props.request.type === "game request") {
      return gameIconImport
    } else if (this.props.request.type === "video request") {
      return youtubeIconImport
    } else if (this.props.request.type === "short video request") {
      return greyYoutubeIconImport
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="request" id={"id" + this.props.request.id}>
          {this.props.request.id}.{" "}
          <img className="icon" src={this.defineIcon()} alt="its an icon"></img>{" "}
          {this.props.request.message} - {this.props.request.name}
        </div>
      </React.Fragment>
    )
  }
}

export default Requests
