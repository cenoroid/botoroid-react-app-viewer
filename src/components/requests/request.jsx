import React from "react";
import youtubeIconImport from "../media/youtubeicon.png";
import greyYoutubeIconImport from "../media/greyyoutubeicon.png";
import gameIconImport from "../media/xboxicon.png";

const Request = (props) => {
  function defineIcon() {
    if (props.request.subtype === "game request") {
      return gameIconImport;
    } else if (props.request.subtype === "video request") {
      return youtubeIconImport;
    } else if (props.request.subtype === "short video request") {
      return greyYoutubeIconImport;
    }
  }

  return (
    <div
      className="request"
      id={"id" + props.request.id}
      onMouseOver={props.onHover}
      onMouseOut={props.onHover}
    >
      <div className="requestMessage">
        {props.request.id}.{" "}
        <img
          className="icon"
          id={"id" + props.request.id}
          src={defineIcon()}
          alt="its an icon"
        ></img>{" "}
        {props.request.message}
      </div>
      <div className="requestName">{"- " + props.request.name}</div>
    </div>
  );
};

export default Request;
