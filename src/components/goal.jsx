import React, { Component } from "react";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "", addCbucksButtonClicked: false, width: 485 };

    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleChange(event) {
    if (isNaN(event.target.value)) {
      return;
    }
    this.setState({ value: Number(event.target.value) });
  }
  handleType(event) {
    event.preventDefault();
  }
  handleCbucksAdd = () => {
    if (this.props.goal.current + this.state.value <= this.props.goal.end) {
      if (this.props.currency >= this.state.value) {
        this.props.onCbucksAdd(this.state.value);
      }
    }
    this.setState({ addCbucksButtonClicked: false, width: 485 });
  };
  handleCbucksAddClick = () => {
    this.setState({ addCbucksButtonClicked: true, width: 300 });
  };

  render() {
    console.log();
    const renderAddCbucksButton = () => {
      if (this.props.currency !== "") {
        if (this.state.addCbucksButtonClicked) {
          return (
            <div style={{ position: "absolute", marginTop: -32, right: 20 }}>
              <input
                style={{ width: 60, height: 29.5, marginTop: 2 }}
                value={this.state.value}
                onChange={this.handleChange}
                className="goalAddInput"
                placeholder="cbucks"
              ></input>
              <button
                style={{ height: 29, width: 29 }}
                onClick={this.handleCbucksAdd}
              >
                ➞
              </button>
            </div>
          );
        }
        return (
          <button className="goalAdd" onClick={this.handleCbucksAddClick}>
            +
          </button>
        );
      }
    };

    return (
      <div>
        <div className="goalBorder">{this.props.goal.goal}</div>
        {renderAddCbucksButton()}
        <div
          style={{
            width: (this.props.goal.current / this.props.goal.end) * 500,
          }}
          className="goalFill"
        ></div>
        <div className="goalText" style={{ width: this.state.width }}>
          {this.props.goal.current} /{this.props.goal.end}
        </div>
      </div>
    );
  }
}

export default Goal;
