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
                  user={"cenoroid"}
                  currency={100}
                  socket={socket}
                  API={API}
                />
              </div>
            );
          });
      } else {
        setPage(
          <div style={{ width: "50vw", textAlign: "center" }}>
            <div style={{ fontSize: 30 }}>
              In order to use this extention,{<br></br>} you first need to grant
              it access so it knows who you are
            </div>
            <button
              style={{
                height: 55,
                width: 100,
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
