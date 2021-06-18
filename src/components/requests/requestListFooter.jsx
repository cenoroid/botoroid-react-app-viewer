import React from "react";
import { useSelector } from "react-redux";

const RequestListFooter = ({ expand, onExpand }) => {
  const requests = useSelector((state) => state.entities.requests);

  return (
    requests.length > 1 && (
      <div className="requestListFooter" onClick={onExpand}>
        {expand ? "--Show only main request--" : "--Show all requests--"}
      </div>
    )
  );
};

export default RequestListFooter;
