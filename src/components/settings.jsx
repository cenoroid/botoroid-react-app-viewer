import React, { Component } from "react";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleChange(event) {
    this.setState({ newbgColor: event.target.value });
  }
  handleType(event) {
    event.preventDefault();
  }
  handleSettings = () => {
    this.setState({ show: !this.state.show });
  };
  handleSaveDefaults = () => {
    this.setState({ show: !this.state.show });
    this.props.onSaveDefaults();
  };
  state = { show: false, newbgColor: "" };
  render() {
    console.log(this.state);
    const renderSettings = () => {
      if (this.state.show) {
        return (
          <div>
            <div>
              Change Sides
              <button
                onClick={this.props.onChangeSides}
                style={{ height: 30, width: 30 }}
              >
                ↔
              </button>
            </div>
            <div>
              <input
                placeholder="bg color: (255,99,71)"
                onChange={this.handleChange}
              />
              <button
                onClick={() => this.props.onNewbgColor(this.state.newbgColor)}
                style={{
                  height: 30,
                  width: 45,
                }}
              >
                Apply
              </button>
            </div>
            <div>
              <button onClick={this.handleSaveDefaults}>
                Save as defaults
              </button>
            </div>
          </div>
        );
      }
    };
    return (
      <div>
        {renderSettings()}
        <button
          style={{ background: "none", border: "none" }}
          onClick={this.handleSettings}
        >
          ⚙️
        </button>
      </div>
    );
  }
}

export default Settings;
