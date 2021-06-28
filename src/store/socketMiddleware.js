import io from "socket.io-client";
import { requestsUpdated, redemptionsUpdated, goalsUpdated } from "./entities";
import { currencyUpdated } from "./auth";
import { settingsUpdated } from "./appConfig";
import { initTimer, setTimerRunning } from "./appConfig";
import { loginRequest } from "./actions";

const api = process.env.REACT_APP_API;
const socket = io(api);
const listener = {};

const websocket =
  ({ dispatch, getState }) =>
  (next) =>
  async (action) => {
    if (action.type === "initApp") {
      socket.emit("getsettings");
      dispatch(loginRequest({ socket, url: api }));
      if (!listener.getsettings) {
        listener.getsettings = true;
        socket.on("getsettings", (data) => dispatch(settingsUpdated(data)));
      }
      if (!listener.updatecurrency) {
        listener.updatecurrency = true;
        socket.on("updatecurrency", (data) => dispatch(currencyUpdated(data)));
      }
    }
    if (action.type === "entities/getRequests") {
      socket.emit("getrequests");
      if (!listener.getrequests) {
        listener.getrequests = true;
        socket.on("getrequests", (data) => dispatch(requestsUpdated(data)));
      }
    }
    if (action.type === "entities/getGoals") {
      socket.emit("getgoals");
      if (!listener.getgoals) {
        listener.getgoals = true;
        socket.on("getgoals", (data) => dispatch(goalsUpdated(data)));
      }
    }
    if (action.type === "entities/getRedemptions") {
      socket.emit("getredemptions");
      if (!listener.getredemptions) {
        listener.getredemptions = true;
        socket.on("getredemptions", (data) =>
          dispatch(redemptionsUpdated(data))
        );
      }
    }
    if (action.type === "entities/addRequest") {
      const { cost, id, message } = action.payload;
      const { username, currency } = getState().auth;
      if (cost <= currency) {
        const data = { username, id, message };
        socket.emit("redemption", data);
      }
    }
    if (action.type === "entities/addToGoal") {
      const { username, currency } = getState().auth;
      if (action.payload.value <= currency) {
        const data = { ...action.payload, username };
        socket.emit("goalupdate", data);
      }
    }
    if (action.type === "appConfig/getTimer") {
      socket.emit("gettimer");
      if (!listener.gettimer) {
        listener.gettimer = true;
        socket.on("starttimer", (timer, timerRunning) => {
          if (timer > 0) dispatch(initTimer({ timer, timerRunning }));
        });
        socket.on("pausetimer", () => dispatch(setTimerRunning("toggle")));
        socket.on("stoptimer", () =>
          dispatch(initTimer({ timer: 0, timerRunning: false }))
        );
      }
    }
    if (action.type === "chestClicked") {
      const { username } = getState().auth;
      const { reward } = getState().appConfig.settings.chests;
      socket.emit("updatecurrency", { username, value: reward });
    }
    return next(action);
  };
export default websocket;
