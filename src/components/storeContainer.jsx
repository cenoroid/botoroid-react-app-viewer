import React, { Component } from "react"

import StoreRedemption from "./storeRedemption"
import StoreFooter from "./storeFooter"
import NewRedemption from "./newRedemption"
import ToggleButton from "./toggleButton"
import StoreHeader from "./storeHeader"
class StoreContainer extends Component {
  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 })
    } else {
      this.setState({ show: 0 })
    }
  }

  handleRedeem = (redemption) => {
    this.setState({ newRedemption: redemption })
  }

  state = {
    show: 1,
    newRedemption: null,
  }
  render() {
    if (this.state.newRedemption !== null) {
      return (
        <NewRedemption
          currency={this.props.currency}
          newRedemption={this.state.newRedemption}
          onNewSubmit={(message) =>
            this.props.onNewSubmit(
              message,
              this.state.newRedemption.type,
              this.state.newRedemption.cost
            )
          }
          onRedeem={this.handleRedeem}
        />
      )
    }
    const renderPage = () => {
      if (this.state.show === 1) {
        return (
          <div className="storeContainer">
            <StoreHeader />
            {this.props.redemptions.map((redemption) => (
              <StoreRedemption
                key={redemption.id}
                redemption={redemption}
                onRedeem={this.handleRedeem}
              />
            ))}
            <StoreFooter
              user={this.props.user}
              currency={this.props.currency}
            />
          </div>
        )
      }
    }
    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        {renderPage()}
      </div>
    )
  }
}

export default StoreContainer
