import React from "react";
import Request from "./request";
import { useSelector } from "react-redux";

const RequestListBody = ({ expand }) => {
  const requests = useSelector((state) => state.entities.requests);

  return requests.length !== 0 ? (
    <div className="requestListBody">
      <Request key={requests[0].id} request={requests[0]} />
      {expand && (
        <div className="requestsContainer">
          {requests.slice(1).map((request) => (
            <Request key={request.id} request={request} />
          ))}
        </div>
      )}
    </div>
  ) : null;
};

export default RequestListBody;
