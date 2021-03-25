import React, { Component } from "react"

class Goal extends Component {
  handleCbucksAdd = () => {
    if (this.props.goal.current < this.props.goal.end) {
      if (this.props.currency > 0) {
        this.props.onCbucksAdd(this.props.goal)
      }
    }
  }

  render() {
    const renderAddCbucksButton = () => {
      if (this.props.currency !== "") {
        return (
          <button className="goalAdd" onClick={this.handleCbucksAdd}>
            Add 1 cbuck
          </button>
        )
      }
    }

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

        {renderAddCbucksButton()}
      </div>
    )
  }
}

export default Goal
