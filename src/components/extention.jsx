import React, { useState, useEffect } from "react";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";
import Chests from "./chests";
import Settings from "./settings";

const Extention = (props) => {
  const [currency, setCurrency] = useState(props.currency);
  const [position, setPosition] = useState("left");
  const [showChests, setShowChests] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [blockedArea, setBlockedArea] = useState({});
  useEffect(() => {
    console.log("render");
  });
  function handleNewBlockedAreaRequests(x, y, width, height) {
    setBlockedArea((prev) => ({
      ...prev,
      requestsStartX: x,
      requestsEndX: x + width,
      requestsStartY: y,
      requestsEndY: y + height,
    }));
  }

  function handleNewBlockedAreaStore(x, y, width, height) {
    setBlockedArea((prev) => ({
      ...prev,
      storeStartX: x,
      storeEndX: x + width,
      storeStartY: y,
      storeEndY: y + height,
    }));
  }

  function handleNewBlockedAreaGoals(x, y, width, height) {
    setBlockedArea((prev) => ({
      ...prev,
      goalsStartX: x,
      goalsEndX: x + width,
      goalsStartY: y,
      goalsEndY: y + height,
    }));
  }

  useEffect(() => {
    props.socket.on("updatecurrency", (data) => {
      setCurrency(currency + data);
    });
    // eslint-disable-next-line
  }, []);

  window.Twitch.ext.onContext((object) => {
    if (object.arePlayerControlsVisible && !hovering) {
      setHovering(true);
    } else if (!object.arePlayerControlsVisible && hovering) {
      setHovering(false);
    }
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
    props.socket.emit("updatecurrency", {
      username: props.user,
      value: 1,
    });
  }
  function handleToggleChests() {
    setShowChests((prevState) => !prevState);
  }
  return (
    <div>
      <div className="mainContainer" style={{ float: position }}>
        <RequestContainer
          socket={props.socket}
          API={props.API}
          hovering={hovering}
          blockedArea={blockedArea}
          onNewBlockedArea={(x, y, width, height) => {
            handleNewBlockedAreaRequests(x, y, width, height);
          }}
        />
        <StoreContainer
          hovering={hovering}
          socket={props.socket}
          currency={currency}
          user={props.user}
          onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
          API={props.API}
          onNewBlockedArea={(x, y, width, height) =>
            handleNewBlockedAreaStore(x, y, width, height)
          }
          blockedArea={blockedArea}
        />

        <GoalsContainer
          hovering={hovering}
          user={props.user}
          API={props.API}
          socket={props.socket}
          currency={currency}
          onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
          onNewBlockedArea={(x, y, width, height) =>
            handleNewBlockedAreaGoals(x, y, width, height)
          }
          blockedArea={blockedArea}
        />

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
