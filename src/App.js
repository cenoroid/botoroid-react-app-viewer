import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "./store/auth";
import { getSettings } from "./store/settings";
import Extension from "./components/extension";
import GrantAccess from "./components/grantAccess";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const settingsLoaded = useSelector((state) => state.settings.loaded);
  const [hovering, setHovering] = useState(false);
  const [show, setShow] = useState(false);
  const toggleButton = (
    <button className="grantAccessToggle" onClick={handleToggle}></button>
  );

  useEffect(() => {
    dispatch(getSettings());
    window.Twitch.ext.onAuthorized(async function (auth) {
      if (window.Twitch.ext.viewer.isLinked) {
        dispatch(loginRequest(auth));
      }
    });
    // eslint-disable-next-line
  }, []);

  function handleToggle() {
    setShow(!show);
  }

  window.Twitch.ext.onContext((object) => {
    if (object.arePlayerControlsVisible && !hovering) {
      setHovering(true);
    } else if (!object.arePlayerControlsVisible && hovering) {
      setHovering(false);
    }
  });

  return userData.linked && settingsLoaded ? (
    <div>
      <Extension hovering={hovering} />
    </div>
  ) : (
    <div>
      {hovering && <div>{toggleButton}</div>}
      {show && <GrantAccess />}
    </div>
  );
};
export default App;
