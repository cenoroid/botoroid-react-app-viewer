import React from "react";
import youtubeIconImport from "./youtubeicon.png";
import greyYoutubeIconImport from "./greyyoutubeicon.png";
import gameIconImport from "./xboxicon.png";

const Requests = (props) => {
  function defineIcon() {
    if (props.request.type === "game request") {
      return gameIconImport;
    } else if (props.request.type === "video request") {
      return youtubeIconImport;
    } else if (props.request.type === "short video request") {
      return greyYoutubeIconImport;
    }
  }
  return (
    <React.Fragment>
      <div className="request" id={"id" + props.request.id}>
        {props.request.id}.{" "}
        <img
          className="icon"
          id={"id" + props.request.id}
          src={defineIcon()}
          alt="its an icon"
        ></img>{" "}
        <div className="requestMessage">{props.request.message}</div> -{" "}
        <div className="requestName">{props.request.name}</div>
      </div>
    </React.Fragment>
  );
};

export default Requests;
