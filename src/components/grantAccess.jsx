import React from "react";

const GrantAccess = () => {
  return (
    <div className="grantAccessContainer">
      <div>
        In order to use this extension,{<br></br>} you first need to grant it
        access{<br></br>} so it knows who you are
      </div>
      <button
        className="grantAccessButton"
        onClick={() => window.Twitch.ext.actions.requestIdShare()}
      >
        OPEN DIALOGUE
      </button>
    </div>
  );
};
export default GrantAccess;
