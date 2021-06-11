import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer from "./auth";
import settingsReducer from "./settings";
import timerReducer from "./timer";

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  settings: settingsReducer,
  timer: timerReducer,
});
