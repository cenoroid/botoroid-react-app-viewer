import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "timer",
  initialState: { timer: 0, timerRunning: false },
  reducers: {
    getTimer: () => {},
    setTimer: (state, action) => {
      console.log(action.payload);
      state.timer = state.timer - action.payload / 1000;
      if (state.timer < 0) state.timer = 0;
    },
    initTimer: (state, action) => {
      state.timer = action.payload;
    },
    setTimerRunning: (state, action) => {
      if (action.payload === "toggle") {
        state.timerRunning = !state.timerRunning;
      } else state.timerRunning = action.payload;
    },
  },
});

export const { initTimer, getTimer, setTimer, setTimerRunning } = slice.actions;
export default slice.reducer;
