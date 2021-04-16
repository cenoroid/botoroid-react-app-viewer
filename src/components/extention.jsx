import React, { useState } from "react";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";
import Chests from "./chests";
import Settings from "./settings";
import axios from "axios";
const Extention = (props) => {
  const [currency, setCurrency] = useState(props.currency);
  const [position, setPosition] = useState("left");
  const [showChests, setShowChests] = useState(true);
  const [hovering, setHovering] = useState();
  window.Twitch.ext.onContext((object) => {
    console.log("ofc");
    if (object.arePlayerControlsVisible && !hovering) {
      setHovering(true);
    } else if (!object.arePlayerControlsVisible && hovering) {
      setHovering(false);
    }
  });

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
  function handleChestPlus() {
    axios.post(props.API + "/updatecurrency", {
      username: props.user,
      value: 1,
    });
    setCurrency(currency + 1);
  }
  function handleToggleChests() {
    setShowChests((prevState) => !prevState);
  }
  return (
    <div>
      <div className="mainContainer" style={{ float: position }}>
        <div className="container" id="requestList">
          <RequestContainer
            socket={props.socket}
            API={props.API}
            hovering={hovering}
          />
        </div>
        <div className="container" id="store">
          <StoreContainer
            hovering={hovering}
            socket={props.socket}
            currency={currency}
            user={props.user}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
            API={props.API}
          />
        </div>
        <div className="container" id="goals">
          <GoalsContainer
            hovering={hovering}
            user={props.user}
            API={props.API}
            socket={props.socket}
            currency={currency}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
          />
        </div>
        <Settings
          hovering={hovering}
          onChangeSides={handleChangeSides}
          onToggleChests={handleToggleChests}
        />
      </div>
      <div>
        <Chests onCurrencyUpdate={handleChestPlus} showChests={showChests} />
      </div>
    </div>
  );
};

export default Extention;
