import React, { Component } from "react";
import Extention from "./components/extention";
import "./App.css";
import { TwitchEmbed } from "react-twitch-embed";
class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <TwitchEmbed
          channel="Cenoroid"
          theme="dark"
          allowFullscreen="false"
          style={{ position: "absolute", height: "100vh", width: "100vw" }}
        />
        <Extention />
      </div>
    );
  }
}

export default App;
