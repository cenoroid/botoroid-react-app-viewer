import React from "react";
import Request from "./request";

const RequestListBody = ({ requests, onHover, expand }) => {
  return requests.length !== 0 ? (
    <div className="requestListBody">
      <Request onHover={onHover} key={requests[0].id} request={requests[0]} />
      {expand && (
        <div className="requestsContainer">
          {requests.slice(1).map((request) => (
            <Request onHover={onHover} key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default RequestListBody;
