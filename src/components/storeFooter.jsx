import React, { Component } from "react"

class StoreCurrency extends Component {
  render() {
    if (this.props.user === "") {
      return <div className="storeFooter">Log in to buy stuff</div>
    }
    return (
      <div className="storeFooter">You have {this.props.currency} cbucks</div>
    )
  }
}

export default StoreCurrency
