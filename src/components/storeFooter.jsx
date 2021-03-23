import React, { Component } from "react"

class StoreCurrency extends Component {
  render() {
    return (
      <div className="storeFooter">You have {this.props.currency} cbucks</div>
    )
  }
}

export default StoreCurrency
