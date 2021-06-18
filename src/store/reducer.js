import { combineReducers } from "redux";
import entitiesReducer from "./entities";
import authReducer from "./auth";
import appConfigReducer from "./appConfig";

export default combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  appConfig: appConfigReducer,
});
