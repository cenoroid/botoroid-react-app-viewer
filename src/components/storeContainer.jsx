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
    user: "Cenoroid",
    currency: 1000000,
  }
  render() {
    if (this.state.newRedemption !== null) {
      return (
        <NewRedemption
          newRedemption={this.state.newRedemption}
          onNewSubmit={(value) =>
            this.props.onNewSubmit(value, this.state.newRedemption.type)
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
              user={this.state.user}
              currency={this.state.currency}
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
