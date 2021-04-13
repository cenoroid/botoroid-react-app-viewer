import React, { useState, useEffect } from "react";
import axios from "axios";
import Requests from "./requests";
import RequestListHeader from "./requestListHeader";
import RequestListFooter from "./requestListFooter";
import RequestListTimer from "./requestListTimer";
import ToggleButton from "./toggleButton";

const RequestContainer = (props) => {
  const [requests, setRequests] = useState([]);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const getRequests = async () => {
      axios.get(props.API + "/getrequests").then((res) => {
        setRequests(res.data);
      });
    };
    getRequests();
  }, [props.API, props.socket]);
  function handleToggle() {
    setShow(!show);
  }
  props.socket.on("getrequests", (data) => {
    setRequests(data);
  });
  const renderPage = () => {
    if (show) {
      return (
        <div>
          <RequestListTimer socket={props.socket} />

          {requests.map((request) => (
            <Requests key={request.id} request={request} />
          ))}
          <RequestListFooter requests={requests} />
        </div>
      );
    }
  };
  return (
    <div>
      <ToggleButton status={show} onToggle={handleToggle} />
      <RequestListHeader />
      {renderPage()}
    </div>
  );
};

export default RequestContainer;
