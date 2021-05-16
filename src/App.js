import React, { useState, useEffect } from "react";
import Extention from "./components/extention";
import "./App.css";
import axios from "axios";
import io from "socket.io-client";
//const API = "http://localhost:4000";
const API = "https://botoroid.xyz";
const socket = io(API);
const App = () => {
  const [page, setPage] = useState(<div></div>);
  useEffect(() => {
    window.Twitch.ext.onAuthorized(async function (auth) {
      if (window.Twitch.ext.viewer.isLinked) {
        await axios
          .post(API + "/getuser", { userToken: auth.token })
          .then((res) => {
            socket.emit("join", res.data.username);
            setPage(
              <div>
                <Extention
                  user={res.data.username}
                  currency={res.data.currency}
                  socket={socket}
                  API={API}
                />
              </div>
            );
          });
      } else {
        setPage(
          <div className="grantAccess">
            <div style={{ color: "white", marginTop: "1vh" }}>
              In order to use this extension,{<br></br>} you first need to grant
              it access{<br></br>} so it knows who you are
            </div>
            <button
              style={{
                height: "4vh",
                width: "5vw",
              }}
              onClick={() => window.Twitch.ext.actions.requestIdShare()}
            >
              OPEN DIALOGUE
            </button>
          </div>
        );
      }
    });
  }, []);
  return page;
};
export default App;
