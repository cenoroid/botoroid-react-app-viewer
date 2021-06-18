import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {
    settings: {
      showContainer: {},
      chests: { width: 2, height: 3.5 },
      loaded: false,
    },
    timer: { remaining: 0, running: false, initialized: false, paused: 0 },
    player: {
      hovering: true,
      displayResolution: "0x0",
      screenBlockedArea: { top: 10, left: 0, right: 98, bottom: 98 },
    },
  },
  reducers: {
    initTimer: (state, action) => {
      if (!state.timer.initialized) {
        state.timer.initialized = true;
      }
      const { timer, timerRunning } = action.payload;
      state.timer.remaining = timer;
      state.timer.running = timerRunning;
    },
    setTimer: (state, action) => {
      if (action.payload.resumed) {
        const { resumed } = action.payload;
        let deltaTime = (resumed - state.timer.paused) / 1000;
        state.timer.remaining = state.timer.remaining - deltaTime;
      } else {
        state.timer.remaining = action.payload;

        state.timer.paused = Date.now();
      }
      if (state.timer.remaining < 0) state.timer.remaining = 0;
    },

    setTimerRunning: (state, action) => {
      if (action.payload === "toggle") {
        state.timer.running = !state.timer.running;
      } else state.timer.running = action.payload;
    },
    settingsUpdated: (state, action) => {
      const { chests, showContainer } = action.payload;

      state.settings.chests = { ...state.settings.chests, ...chests };
      state.settings.showContainer = showContainer;
      state.settings.loaded = true;
    },

    hoverUpdated: (state, action) => {
      const { visible } = action.payload;
      if (visible && !state.player.hovering) {
        console.log("I changed");
        state.player.hovering = true;
      } else if (!visible && state.player.hovering) {
        state.player.hovering = false;
      }
    },
    displayUpdated: (state, action) => {
      const { displayResolution } = action.payload;
      if (displayResolution !== state.player.displayResolution) {
        state.player.displayResolution = displayResolution;
        const parts = displayResolution.split("x");
        const player = { width: Number(parts[0]), height: Number(parts[1]) };
        const { innerWidth, innerHeight } = window;
        const screen = { width: innerWidth, height: innerHeight };
        const widthDist = player.width - screen.width;
        const heightDist = player.height - screen.height;
        console.log("height", screen.height);
        console.log(heightDist);
        state.player.screenBlockedArea.top =
          heightDist > player.height / 10
            ? 0
            : (100 * (player.height / 10 - heightDist)) / player.height;
        state.player.screenBlockedArea.bottom =
          99 - state.player.screenBlockedArea.top;
        state.player.screenBlockedArea.right =
          widthDist < 160
            ? 99 - (100 * (160 - widthDist)) / (screen.width * 2)
            : 99;

        console.log("right", state.player.screenBlockedArea.right);
        console.log("widthDist", widthDist);
        console.log("player", player.width);
      }
    },
  },
});

export const {
  setTimer,
  initTimer,
  setTimerRunning,
  settingsUpdated,
  hoverUpdated,
  displayUpdated,
} = slice.actions;
export default slice.reducer;
