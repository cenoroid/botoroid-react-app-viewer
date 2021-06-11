import React, { useState, useEffect } from "react";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";
import Chests from "./chests";
import { useDragContainer } from "./hooks/useDragContainer";

const Extension = (props) => {
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
    y: 0,
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
    y: 3,
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
    y: 6,
    container: "store",
  });
  const {
    pos: posChest,
    setBlockedArea: setBlockedAreaChests,
    chestCollission,
  } = useDragContainer({
    x: -4,
    y: 0,
    container: "chest",
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
    setBlockedAreaChests(blockedArea);
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

  return (
    <div>
      <div className="mainContainer">
        <div
          className="container"
          id="requestList"
          style={{
            marginLeft: posRequests.translateX + "vw",
            marginTop: posRequests.translateY + "vh",
          }}
        >
          <RequestContainer
            hovering={props.hovering}
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
            hovering={props.hovering}
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
            hovering={props.hovering}
            bind={bindStore}
            onSize={(width, height) => handleSizeStore(width, height)}
          />
        </div>
        <div
          className="chestContainer"
          style={{
            left: posChest.translateX + "vw",
            top: posChest.translateY + "vh",
          }}
        >
          <Chests pos={posChest} onChestCollission={chestCollission} />
        </div>
      </div>
    </div>
  );
};

export default Extension;
