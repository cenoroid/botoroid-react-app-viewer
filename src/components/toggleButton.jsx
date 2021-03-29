import React, { Component } from "react"

class ToggleButton extends Component {
  buttonText = () => {
    if (this.props.status === 0) {
      return "🗖"
    }
    return "🗕"
  }
  render() {
    return (
      <button className="toggleButton" onClick={this.props.onToggle}>
        {this.buttonText()}
      </button>
    )
  }
}

export default ToggleButton
