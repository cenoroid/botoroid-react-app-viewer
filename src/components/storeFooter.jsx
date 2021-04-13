import React from "react";

const StoreCurrency = (props) => {
  if (props.user === "") {
    return <div className="storeFooter">Log in to buy stuff</div>;
  }
  return <div className="storeFooter">You have {props.currency} cbucks</div>;
};

export default StoreCurrency;
