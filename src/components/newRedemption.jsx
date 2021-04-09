import React, { Component } from "react";
class NewRedemption extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleType = this.handleType.bind(this);
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleType(event) {
    event.preventDefault();
  }

  defineText = () => {
    let label, info;
    let redemptionText = [];
    if (this.props.newRedemption.type === "game request") {
      label = "which game?";
      info = (
        <p>
          get me to play any game that is free or I already own <br />
          for 30 minutes (or you could gift it)
        </p>
      );
    } else if (this.props.newRedemption.type === "video request") {
      label = "your link here";
      info = (
        <p>
          I'll watch youtube videos only,aprox 30 minutes, <br />
          ask if video is somewhere else
        </p>
      );
    } else if (this.props.newRedemption.type === "short video request") {
      label = "your link here";
      info = (
        <p>
          I'll watch youtube videos only,aprox 10 minutes, <br />
          ask if video is somewhere else
        </p>
      );
    }

    redemptionText.push(label, info);

    return redemptionText;
  };

  redemptionText = this.defineText();

  handleSubmit = () => {
    if (this.props.currency >= this.props.newRedemption.cost) {
      this.props.onCurrencyUpdate(this.props.newRedemption.cost);
      let data = {
        username: this.props.user,
        type: this.props.newRedemption.type,
        message: this.state.value,
        value: -this.props.newRedemption.cost,
      };
      this.props.socket.emit("requestsupdate", data);
      this.props.onRedeem(null);
    }
  };
  render() {
    return (
      <div>
        <button
          className="backButton"
          onClick={() => this.props.onRedeem(null)}
        >
          <div className="backButtonText">⇽</div>
        </button>

        <div className="redemptionLabel">{this.redemptionText[0]}</div>
        <input
          className="redemptionInput"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div className="redemptionInfo">{this.redemptionText[1]}</div>
        <button className="redemptionButton" onClick={this.handleSubmit}>
          <p>redeem for {this.props.newRedemption.cost}</p>
        </button>
      </div>
    );
  }
}

export default NewRedemption;
