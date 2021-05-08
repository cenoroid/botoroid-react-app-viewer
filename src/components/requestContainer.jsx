import React, { useState, useEffect } from "react";

import Requests from "./requests";
import RequestListHeader from "./requestListHeader";
import RequestListFooter from "./requestListFooter";
import RequestListTimer from "./requestListTimer";
import ToggleButton from "./toggleButton";

const RequestContainer = (props) => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    props.socket.emit("getrequests");
    props.socket.on("getrequests", (data) => {
      setRequests(data);
      handleSize();
    });
    // eslint-disable-next-line
  }, []);
  function handleSize() {
    props.onSize({
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
          <div {...props.bind}>
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
          <div {...props.bind}>
            <RequestListHeader />
          </div>
        </div>
      );
    }
    return null;
  };
  return <div>{renderPage()}</div>;
};

export default RequestContainer;
