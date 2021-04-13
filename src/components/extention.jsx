import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import RequestContainer from "./requestContainer";
import GoalsContainer from "./goalsContainer";
import StoreContainer from "./storeContainer";

//import dotenv from "dotenv";
import axios from "axios";
import Settings from "./settings";

//const API = "http://localhost:4000";
const API = "https://botoroid-express-app.herokuapp.com";
const socket = io(API);
const Extention = () => {
  const [user, setUser] = useState("cenoroid");
  const [currency, setCurrency] = useState(300);
  const [position, setPosition] = useState("left");
  const [twitchThing, setTwitchThing] = useState(0);
  useEffect(() => {
    window.Twitch.ext.onAuthorized(async function (auth) {
      await axios
        .post(API + "/getuser", { userId: auth.userId })
        .then((res) => {
          socket.emit("join", res.data.username);
          setUser(res.data.username);
          setTwitchThing(res.data.username);
          setCurrency(res.data.currency);
        });
    });
  }, []);

  socket.on("updatecurrency", (data) => {
    setCurrency(currency + data);
  });

  function handleChangeSides() {
    if (position === "left") {
      setPosition("right");
    } else {
      setPosition("left");
    }
  }
  function handleSaveDefaults() {
    socket.emit("updatepref", {
      username: user,
      position: position,
    });
  }

  function handleCurrencyUpdate(value) {
    setCurrency(currency - value);
  }
  return (
    <div style={{ height: "100vh", backgroundColor: "transparent" }}>
      <div
        className="mainContainer"
        style={{ float: position, marginRight: 350 }}
      >
        <div className="container" id="requestList">
          <RequestContainer socket={socket} API={API} />
        </div>
        <div className="container" id="store">
          <StoreContainer
            socket={socket}
            currency={currency}
            user={user}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
            API={API}
          />
        </div>
        <div className="container" id="goals">
          <GoalsContainer
            user={user}
            API={API}
            socket={socket}
            currency={currency}
            onCurrencyUpdate={(value) => handleCurrencyUpdate(value)}
          />
        </div>

        <Settings
          onChangeSides={handleChangeSides}
          onSaveDefaults={handleSaveDefaults}
        />
      </div>
      <div>{twitchThing}</div>
    </div>
  );
};

export default Extention;
