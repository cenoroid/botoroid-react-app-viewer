import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";

const GrantAccess = () => {
  const [show, setShow] = useState(false);
  const hovering = useSelector((state) => state.appConfig.player.hovering);
  return (
    <Fragment>
      {show && (
        <div className="grantAccessContainer">
          <div>
            In order to use this extension,{<br></br>} you first need to grant
            it access{<br></br>} so it knows who you are
          </div>
          <button
            className="grantAccessButton"
            onClick={() => window.Twitch.ext.actions.requestIdShare()}
          >
            OPEN DIALOGUE
          </button>
        </div>
      )}
      {hovering && (
        <button
          className="grantAccessToggle"
          onClick={() => setShow(!show)}
        ></button>
      )}
    </Fragment>
  );
};
export default GrantAccess;
