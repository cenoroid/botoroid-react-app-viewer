import React, { Component } from "react"

class StoreRedemption extends Component {
  render() {
    return (
      <div>
        <button
          className="redemption"
          onClick={() => this.props.onRedeem(this.props.redemption)}
        >
          {this.props.redemption.type} : {this.props.redemption.cost}
        </button>
      </div>
    )
  }
}

export default StoreRedemption
