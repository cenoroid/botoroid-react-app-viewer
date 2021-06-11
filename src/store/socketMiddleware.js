import io from "socket.io-client";
import axios from "axios";
import { requestsUpdated, redemptionsUpdated, goalsUpdated } from "./entities";
import { loginSuccess, updatedCurrency } from "./auth";
import { settingsUpdated } from "./settings";
import { initTimer, setTimerRunning } from "./timer";
const API = "https://second.botoroid.xyz";
const socket = io(API);
const version = "v0.0.2";
const listener = {};
const websocket = (store) => (next) => async (action) => {
  console.log(listener);
  if (action.type === "auth/loginRequest") {
    try {
      const response = await axios.post(API + "/getuser", {
        userToken: action.payload.token,
      });
      store.dispatch(loginSuccess(response.data));
      socket.emit("join", { name: response.data.username, version });
      if (!listener.updatecurrency) {
        listener.updatecurrency = true;
        socket.on("updatecurrency", (data) => {
          store.dispatch(updatedCurrency(data));
        });
      }
    } catch (error) {}
  }
  if (action.type === "entities/getRequests") {
    socket.emit("getrequests");
    if (!listener.getrequests) {
      listener.getrequests = true;
      socket.on("getrequests", (data) => {
        store.dispatch(requestsUpdated(data));
      });
    }
  }
  if (action.type === "entities/getGoals") {
    socket.emit("getgoals");
    if (!listener.getgoals) {
      listener.getgoals = true;
      socket.on("getgoals", (data) => {
        store.dispatch(goalsUpdated(data));
      });
    }
  }
  if (action.type === "entities/getRedemptions") {
    socket.emit("getredemptions");
    if (!listener.getredemptions) {
      listener.getredemptions = true;
      socket.on("getredemptions", (data) => {
        store.dispatch(redemptionsUpdated(data));
      });
    }
  }
  if (action.type === "entities/addRequest") {
    console.log(action);
    let { username, currency } = store.getState().auth;
    if (action.payload.cost <= currency) {
      let data = {
        username,
        id: action.payload.id,
        message: action.payload.message,
      };
      console.log(data);
      socket.emit("redemption", data);
    }
  }
  if (action.type === "entities/addToGoal") {
    let { username, currency } = store.getState().auth;
    if (action.payload.value <= currency) {
      let data = { ...action.payload, username };
      socket.emit("goalupdate", data);
    }
  }
  if (action.type === "settings/getSettings") {
    console.log(action.type);
    socket.emit("getsettings");
    if (!listener.getsettings) {
      listener.getsettings = true;
      socket.on("getsettings", (data) => {
        console.log(data);
        store.dispatch(settingsUpdated(data));
      });
    }
  }

  if (action.type === "timer/getTimer") {
    socket.emit("gettimer");
    if (!listener.gettimer) {
      listener.gettimer = true;
      socket.on("starttimer", (resTimer, resTimerRunning) => {
        if (resTimer > 0) {
          store.dispatch(initTimer(resTimer));
          store.dispatch(setTimerRunning(resTimerRunning));
        }
      });
      socket.on("pausetimer", () => {
        store.dispatch(setTimerRunning("toggle"));
      });
      socket.on("stoptimer", () => {
        store.dispatch(initTimer(0));
      });
    }
  }
  if (action.type === "auth/chestClicked") {
    let { username } = store.getState().auth;
    let { reward } = store.getState().settings.chests;
    socket.emit("updatecurrency", { username, value: reward });
  }
  return next(action);
};
export default websocket;
