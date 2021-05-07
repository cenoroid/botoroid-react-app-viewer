import React, { useState, useEffect } from "react";
import _ from "lodash";
import Requests from "./requests";
import RequestListHeader from "./requestListHeader";
import RequestListFooter from "./requestListFooter";
import RequestListTimer from "./requestListTimer";
import ToggleButton from "./toggleButton";
import { useDragContainer } from "./useDragContainer";
const RequestContainer = (props) => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(true);

  const {
    pos,

    isDragging,
    bind,

    blockedArea,
    setBlockedArea,
    resetAttached,
    setSize,
    ownBlockedArea,
  } = useDragContainer({
    x: 0,
    y: 0,
    blockedArea: props.blockedArea,
    container: "requests",
  });

  useEffect(() => {
    if (
      !_.isEqual(props.blockedArea, blockedArea) &&
      props.blockedArea.hasOwnProperty("store") &&
      props.blockedArea.hasOwnProperty("goals")
    ) {
      setBlockedArea(props.blockedArea);
    }
    // eslint-disable-next-line
  }, [props.blockedArea]);

  useEffect(() => {
    if (!isDragging) {
      props.onDragging(false);
    }
    if (isDragging) {
      props.onDragging("requests");
    }
    // eslint-disable-next-line
  }, [isDragging]);
  useEffect(() => {
    if (props.dragging !== null) {
      resetAttached(props.dragging);
    }
    // eslint-disable-next-line
  }, [props.dragging]);

  useEffect(() => {
    props.onNewBlockedArea(ownBlockedArea);
    // eslint-disable-next-line
  }, [ownBlockedArea]);
  useEffect(() => {
    props.socket.emit("getrequests");
    props.socket.on("getrequests", (data) => {
      setRequests(data);
      handleSize();
    });
    // eslint-disable-next-line
  }, []);
  function handleSize() {
    setSize({
      width:
        (100 * document.getElementById("requestList").offsetWidth) /
        window.innerWidth,
      height:
        (100 * document.getElementById("requestList").offsetHeight) /
        window.innerHeight,
    });
  }
  function handleToggle() {
    setShow(!show);
  }
  useEffect(() => {
    handleSize();
    // eslint-disable-next-line
  }, [show]);
  const renderPage = () => {
    if (show) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <div {...bind}>
            <RequestListHeader />
          </div>
          <RequestListTimer socket={props.socket} />

          {requests.map((request) => (
            <Requests key={request.id} request={request} />
          ))}
          <RequestListFooter requests={requests} />
        </div>
      );
    } else if (props.hovering) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <RequestListHeader />
        </div>
      );
    }
    return null;
  };
  return (
    <div
      className="container"
      id="requestList"
      style={{
        marginLeft: pos.translateX + "vw",
        marginTop: pos.translateY + "vh",
      }}
    >
      {renderPage()}
    </div>
  );
};

export default RequestContainer;
