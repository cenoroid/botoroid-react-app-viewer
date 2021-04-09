import React, { Component } from "react";

import StoreRedemption from "./storeRedemption";
import StoreFooter from "./storeFooter";
import NewRedemption from "./newRedemption";
import ToggleButton from "./toggleButton";
import StoreHeader from "./storeHeader";

class StoreContainer extends Component {
  componentDidMount() {
    this.getRedemptions();
  }
  getRedemptions = () => {
    this.props.socket.emit("get", "redemptions");
    this.props.socket.on("getredemptions", (data) => {
      for (let index = 0; index < data.length; index++) {
        data[index].id = index + 1;
      }
      this.setState({ redemptions: data });
    });
  };

  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 });
    } else {
      this.setState({ show: 0 });
    }
  };

  handleRedeem = (redemption) => {
    this.setState({ newRedemption: redemption });
  };

  state = {
    redemptions: [],
    show: 1,
    newRedemption: null,
  };
  render() {
    const renderPage = () => {
      if (this.state.newRedemption !== null) {
        return (
          <NewRedemption
            onCurrencyUpdate={(value) => this.props.onCurrencyUpdate(value)}
            socket={this.props.socket}
            currency={this.props.currency}
            user={this.props.user}
            newRedemption={this.state.newRedemption}
            onRedeem={this.handleRedeem}
          />
        );
      }
      if (this.state.show === 1) {
        return (
          <div className="storeContainer">
            {this.state.redemptions.map((redemption) => (
              <StoreRedemption
                key={redemption.id}
                redemption={redemption}
                onRedeem={this.handleRedeem}
              />
            ))}
          </div>
        );
      }
    };
    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        <StoreHeader />
        {renderPage()}
        <StoreFooter user={this.props.user} currency={this.props.currency} />
      </div>
    );
  }
}

export default StoreContainer;
