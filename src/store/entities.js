import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "entities",
  initialState: {
    requests: [],
    redemptions: [],
    goals: [],
  },
  reducers: {
    requestsUpdated: (state, action) => {
      state.requests = action.payload;
    },
    redemptionsUpdated: (state, action) => {
      state.redemptions = action.payload;
    },
    goalsUpdated: (state, action) => {
      state.goals = action.payload;
    },
  },
});

export const { requestsUpdated, redemptionsUpdated, goalsUpdated } =
  slice.actions;

export default slice.reducer;
