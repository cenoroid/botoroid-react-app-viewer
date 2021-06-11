import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "entities",
  initialState: {
    requests: [],
    redemptions: [],
    goals: [],
  },
  reducers: {
    addRequest: () => {},
    getRequests: () => {},
    requestsUpdated: (state, action) => {
      state.requests = action.payload;
    },
    getRedemptions: () => {},
    redemptionsUpdated: (state, action) => {
      state.redemptions = action.payload;
    },
    getGoals: () => {},
    addToGoal: () => {},
    goalsUpdated: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const {
  getRequests,
  requestsUpdated,
  getRedemptions,
  redemptionsUpdated,
  getGoals,
  goalsUpdated,
  addToGoal,
  currencyUpdated,
  settingsUpdated,
  addRequest,
} = slice.actions;

export default slice.reducer;
