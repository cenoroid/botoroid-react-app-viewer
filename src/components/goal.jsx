import React, { Component } from "react"

class Goal extends Component {
  render() {
    return (
      <div>
        <div className="goalBorder">{this.props.goal.goal}</div>
        <div
          style={{
            width: (this.props.goal.current / this.props.goal.end) * 80 + "%",
          }}
          className="goalFill"
        ></div>
        <div className="goalText">
          {this.props.goal.current} /{this.props.goal.end}
        </div>
        <button
          className="goalAdd"
          onClick={() => this.props.onCbucksAdd(this.props.goal)}
        >
          Add 1 cbuck
        </button>
      </div>
    )
  }
}

export default Goal
