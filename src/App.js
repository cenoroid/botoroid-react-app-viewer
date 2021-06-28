import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initApp } from "./store/actions";
import { hoverUpdated, displayUpdated } from "./store/appConfig";
import Extension from "./components/extension";
import GrantAccess from "./components/grantAccess";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);
  const settingsLoaded = useSelector(
    (state) => state.appConfig.settings.loaded
  );
  useEffect(() => {
    dispatch(initApp());
    window.addEventListener("resize", windowResize);

    window.Twitch.ext.onContext(({ displayResolution }, update) => {
      if (update.includes("displayResolution"))
        dispatch(displayUpdated({ displayResolution }));
    });

    function windowResize() {
      window.removeEventListener("resize", windowResize);
      dispatch(displayUpdated({ screenInit: true }));
    }
  }, [dispatch]);

  return userData.linked && settingsLoaded ? (
    <div
      onMouseOver={(e) => {
        e.stopPropagation();
        if (e.target.className === "mainContainer")
          dispatch(hoverUpdated({ visible: true }));
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        dispatch(hoverUpdated({ visible: false }));
      }}
    >
      <Extension />
    </div>
  ) : (
    <GrantAccess />
  );
};
export default App;
