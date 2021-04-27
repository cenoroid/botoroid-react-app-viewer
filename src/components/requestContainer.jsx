import React, { useState, useEffect } from "react";

import Requests from "./requests";
import RequestListHeader from "./requestListHeader";
import RequestListFooter from "./requestListFooter";
import RequestListTimer from "./requestListTimer";
import ToggleButton from "./toggleButton";

const RequestContainer = (props) => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    props.socket.emit("getrequests");
    props.socket.on("getrequests", (data) => {
      console.log(data);
      setRequests(data);
    });
    // eslint-disable-next-line
  }, []);
  function handleToggle() {
    setShow(!show);
  }

  const renderPage = () => {
    if (show) {
      return (
        <div>
          <ToggleButton status={show} onToggle={handleToggle} />
          <RequestListHeader />
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
