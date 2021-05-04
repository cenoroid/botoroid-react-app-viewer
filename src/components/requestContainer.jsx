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
  const [size, setSize] = useState();
  const {
    pos,
    setPos,
    isDragging,
    bind,
    collisionCheck,
    blockedArea,
    setBlockedArea,
    resetAttached,
  } = useDragContainer({
    x: 0,
    y: 0,
    blockedArea: props.blockedArea,
    container: "requests",
  });
  useEffect(() => {
    handleCollision();
    // eslint-disable-next-line
  }, [blockedArea]);
  useEffect(() => {
    if (!_.isEqual(props.blockedArea, blockedArea)) {
      setBlockedArea(props.blockedArea);
    }
    // eslint-disable-next-line
  }, [props.blockedArea]);

  useEffect(() => {
    if (!isDragging && size) {
      props.onDragging(false);
      props.onNewBlockedArea(
        pos.translateX,
        pos.translateY,
        size.width,
        size.height
      );
      handleCollision();
    }
    if (isDragging) {
      props.onDragging("requests");
    }
    // eslint-disable-next-line
  }, [isDragging, size]);
  useEffect(() => {
    if (props.dragging !== null) {
      resetAttached(props.dragging);
    }
    // eslint-disable-next-line
  }, [props.dragging]);
  useEffect(() => {
    setPos((prev) => ({ ...prev, size }));

    // eslint-disable-next-line
  }, [size]);
  function handleCollision() {
    let collisionArea = collisionCheck();
    if (collisionArea) {
      props.onNewBlockedArea(
        collisionArea.x,
        collisionArea.y,
        size.width,
        size.height
      );
    }
  }
  useEffect(() => {
    handleSize();
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

  const renderPage = () => {
    if (show) {
      return (
        <div
          className="container"
          id="requestList"
          style={{
            marginLeft: pos.translateX + "vw",
            marginTop: pos.translateY + "vh",
          }}
        >
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
  return <div>{renderPage()}</div>;
};

export default RequestContainer;
