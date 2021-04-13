import React, { useState } from "react";

import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";

//import dotenv from "dotenv";

import Settings from "./settings";

const Extention = (props) => {
  const [currency, setCurrency] = useState(props.currency);
  const [position, setPosition] = useState("left");

  props.socket.on("updatecurrency", (data) => {
    setCurrency(currency + data);
  });
  function handleChangeSides() {
    if (position === "left") {
      setPosition("right");
    } else {
      setPosition("left");
    }
  }

  function handleCurrencyUpdate(value) {
    setCurrency(currency - value);
  }

  return (
    <div style={{ height: "100vh", backgroundColor: "transparent" }}>
      <button
        style={{ height: 30, width: 30 }}
        onClick={() => window.Twitch.ext.actions.requestIdShare()}
      >
        {props.user}
      </button>
      <div
        className="mainContainer"
        style={{ float: position, marginRight: 350 }}
      >
        <div className="container" id="requestList">
          <RequestContainer socket={props.socket} API={props.API} />
        </div>
        <div className="container" id="store">
          <StoreContainer
            socket={props.socket}
            currency={currency}
            user={props.user}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
            API={props.API}
          />
        </div>
        <div className="container" id="goals">
          <GoalsContainer
            user={props.user}
            API={props.API}
            socket={props.socket}
            currency={currency}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
          />
        </div>

        <Settings onChangeSides={handleChangeSides} />
      </div>
    </div>
  );
};

export default Extention;
