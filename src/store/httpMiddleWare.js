import axios from "axios";
import { loginSuccess } from "./auth";

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === "auth/loginRequest") {
      const { socket, url } = action.payload;

      window.Twitch.ext.onAuthorized(async function (auth) {
        if (window.Twitch.ext.viewer.isLinked) {
          const data = { userToken: auth.token };
          try {
            const { data: res } = await axios.post(url + "/getuser", data);
            dispatch(loginSuccess(res));
            socket.emit("join", {
              name: res.username,
              version: process.env.REACT_APP_VERSION,
            });
          } catch (error) {}
        }
      });
    }
    return next(action);
  };

export default api;
