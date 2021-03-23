import React, { Component } from "react"

class Footer extends Component {
  defineText = () => {
    let text = "No requests ResidentSleeper"
    if (this.props.requests.length !== 0) {
      text = "--Some more requests--"
    }
    return text
  }
  render() {
    return (
      <React.Fragment>
        <div className="footer">{this.defineText()}</div>
      </React.Fragment>
    )
  }
}

export default Footer
