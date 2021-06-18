import React from "react";
import ToggleButton from "../common/toggleButton";
import RequestListTimer from "./requestListTimer";

const RequestListHeader = ({ show, onToggle, bind }) => {
  return (
    <div className="requestListHeader" id="requestList" {...bind}>
      <RequestListTimer show={show} />
      <ToggleButton status={show} onToggle={onToggle} />
      <div className="requestListHeaderTitle">Request List</div>
    </div>
  );
};

export default RequestListHeader;
