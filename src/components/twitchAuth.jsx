import React from "react";
import { useTwitchAuth } from "react-twitch-ext-onauthorized";
const TwitchAuth = () => {
  const twitchAuthentication = useTwitchAuth();
  return <div>TestElement {JSON.stringify(twitchAuthentication)}</div>;
};
export default TwitchAuth;
