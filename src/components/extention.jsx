import React, { useState, useEffect } from "react";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";
import Chests from "./chests";
import Settings from "./settings";
import { useDragContainer } from "./useDragContainer";
const Extention = (props) => {
  const [currency, setCurrency] = useState(props.currency);
  const [position, setPosition] = useState("left");
  const [showChests, setShowChests] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [blockedArea, setBlockedArea] = useState({
    screen: { topY: 0, bottomY: 88, leftX: 0, rightX: 98 },
  });
  const {
    pos: posRequests,
    isDragging: isDraggingRequests,
    bind: bindRequests,
    setBlockedArea: setBlockedAreaRequests,
    resetAttached: resetAttachedRequests,
    setSize: setSizeRequests,
    ownBlockedArea: ownBlockedAreaRequests,
  } = useDragContainer({
    x: 0,
    y: 2,
    container: "requests",
  });
  const {
    pos: posGoals,
    isDragging: isDraggingGoals,
    bind: bindGoals,
    setBlockedArea: setBlockedAreaGoals,
    resetAttached: resetAttachedGoals,
    setSize: setSizeGoals,
    ownBlockedArea: ownBlockedAreaGoals,
  } = useDragContainer({
    x: 0,
    y: 2,
    container: "goals",
  });
  const {
    pos: posStore,
    isDragging: isDraggingStore,
    bind: bindStore,
    setBlockedArea: setBlockedAreaStore,
    resetAttached: resetAttachedStore,
    setSize: setSizeStore,
    ownBlockedArea: ownBlockedAreaStore,
  } = useDragContainer({
    x: 0,
    y: 2,
    container: "store",
  });

  useEffect(() => {
    if (isDraggingRequests) {
      resetAttachedGoals("requests");
      resetAttachedStore("requests");
    }
    if (isDraggingGoals) {
      resetAttachedRequests("goals");
      resetAttachedStore("goals");
    }
    if (isDraggingStore) {
      resetAttachedGoals("store");
      resetAttachedRequests("store");
    }
    // eslint-disable-next-line
  }, [isDraggingRequests, isDraggingGoals, isDraggingStore]);

  useEffect(() => {
    setBlockedArea((prev) => ({
      ...prev,
      requests: ownBlockedAreaRequests,
      goals: ownBlockedAreaGoals,
      store: ownBlockedAreaStore,
    }));
  }, [ownBlockedAreaRequests, ownBlockedAreaGoals, ownBlockedAreaStore]);

  useEffect(() => {
    setBlockedAreaRequests({
      screen: blockedArea.screen,
      store: blockedArea.store,
      goals: blockedArea.goals,
    });
    setBlockedAreaGoals({
      screen: blockedArea.screen,
      requests: blockedArea.requests,
      store: blockedArea.store,
    });
    setBlockedAreaStore({
      screen: blockedArea.screen,
      requests: blockedArea.requests,
      goals: blockedArea.goals,
    });
    // eslint-disable-next-line
  }, [blockedArea]);
  function handleSizeRequests(width, height) {
    setSizeRequests(width, height);
  }
  function handleSizeGoals(width, height) {
    setSizeGoals(width, height);
  }
  function handleSizeStore(width, height) {
    setSizeStore(width, height);
  }

  function handleNewBlockedAreaRequests(zone) {
    if (zone === undefined || zone === 0) {
      return;
    }
    setBlockedArea((prev) => ({
      ...prev,
      requests: zone,
    }));
  }

  function handleNewBlockedAreaStore(zone) {
    if (zone === undefined || zone === 0) {
      return;
    }
    setBlockedArea((prev) => ({
      ...prev,
      store: zone,
    }));
  }

  function handleNewBlockedAreaGoals(zone) {
    if (zone === undefined || zone === 0) {
      return;
    }
    setBlockedArea((prev) => ({
      ...prev,
      goals: zone,
    }));
  }
  // useEffect(() => {
  //   console.log("yesmany");
  // });

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
        <div
          className="container"
          id="requestList"
          style={{
            marginLeft: posRequests.translateX + "vw",
            marginTop: posRequests.translateY + "vh",
          }}
        >
          <RequestContainer
            socket={props.socket}
            API={props.API}
            hovering={hovering}
            blockedArea={{
              screen: blockedArea.screen,
              store: blockedArea.store,
              goals: blockedArea.goals,
            }}
            onNewBlockedArea={(zone) => {
              handleNewBlockedAreaRequests(zone);
            }}
            bind={bindRequests}
            onSize={(width, height) => handleSizeRequests(width, height)}
          />
        </div>
        <div
          className="container"
          id="goals"
          style={{
            marginTop: posGoals.translateY + "vh",
            marginLeft: posGoals.translateX + "vw",
          }}
        >
          <GoalsContainer
            hovering={hovering}
            user={props.user}
            API={props.API}
            socket={props.socket}
            currency={currency}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
            onNewBlockedArea={(zone) => handleNewBlockedAreaGoals(zone)}
            blockedArea={{
              screen: blockedArea.screen,
              requests: blockedArea.requests,
              store: blockedArea.store,
            }}
            bind={bindGoals}
            onSize={(width, height) => handleSizeGoals(width, height)}
          />
        </div>
        <div
          className="container"
          id="store"
          style={{
            marginLeft: posStore.translateX + "vw",
            marginTop: posStore.translateY + "vh",
          }}
        >
          <StoreContainer
            hovering={hovering}
            socket={props.socket}
            currency={currency}
            user={props.user}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
            API={props.API}
            onNewBlockedArea={(zone) => handleNewBlockedAreaStore(zone)}
            blockedArea={{
              screen: blockedArea.screen,
              requests: blockedArea.requests,
              goals: blockedArea.goals,
            }}
            bind={bindStore}
            onSize={(width, height) => handleSizeStore(width, height)}
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
