import React, { Component } from "react"

class ToggleButton extends Component {
  defineButtonClass = () => {
    if (this.props.status === 0) {
      return "toggleButtonOff"
    }
    return "toggleButtonOn"
  }
  render() {
    return (
      <button
        className={this.defineButtonClass()}
        onClick={this.props.onToggle}
      />
    )
  }
}

export default ToggleButton
