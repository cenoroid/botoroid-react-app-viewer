import React from "react";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";
import Chests from "./chests";
import { useGetBlockedArea } from "./hooks/useGetBlockedArea";

const Extension = () => {
  const { setSize, bind, isDragging, chestPos } = useGetBlockedArea();

  return (
    <div className="mainContainer">
      <div
        className="container"
        id="requestList"
        style={{
          pointerEvents: isDragging ? "none" : "all",
        }}
      >
        <RequestContainer bind={bind} onSize={setSize} />
      </div>
      <div
        className="container"
        id="goals"
        style={{
          pointerEvents: isDragging ? "none" : "all",
        }}
      >
        <GoalsContainer bind={bind} onSize={setSize} />
      </div>
      <div
        className="container"
        id="store"
        style={{
          pointerEvents: isDragging ? "none" : "all",
        }}
      >
        <StoreContainer bind={bind} onSize={setSize} />
      </div>
      <Chests chestPos={chestPos} />
    </div>
  );
};

export default Extension;
