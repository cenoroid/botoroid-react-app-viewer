import React from "react";
import youtubeIconImport from "../media/youtubeicon.png";
import greyYoutubeIconImport from "../media/greyyoutubeicon.png";
import gameIconImport from "../media/xboxicon.png";

const Request = ({ request }) => {
  function defineIcon() {
    const { subtype } = request;
    if (subtype === "game request") {
      return gameIconImport;
    } else if (subtype === "video request") {
      return youtubeIconImport;
    } else if (subtype === "short video request") {
      return greyYoutubeIconImport;
    }
  }

  return (
    <div className="request" id={"id" + request.id}>
      <div className="requestMessage">
        {request.id}.{" "}
        <img
          className="icon"
          id={"id" + request.id}
          src={defineIcon()}
          alt="its an icon"
        ></img>{" "}
        {request.message}
      </div>
      <div className="requestName">{"- " + request.name}</div>
    </div>
  );
};

export default Request;
