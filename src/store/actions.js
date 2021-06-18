import { createAction } from "@reduxjs/toolkit";

export const getTimer = createAction("appConfig/getTimer");
export const getSettings = createAction("appConfig/getSettings");
export const addRequest = createAction("entities/addRequest");
export const getRequests = createAction("entities/getRequests");
export const getRedemptions = createAction("entities/getRedemptions");
export const getGoals = createAction("entities/getGoals");
export const addToGoal = createAction("entities/addToGoal");
export const loginRequest = createAction("auth/loginRequest");
export const chestClicked = createAction("chestClicked");
export const initApp = createAction("initApp");
