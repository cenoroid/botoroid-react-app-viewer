import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "config",
  initialState: {
    settings: {
      showContainer: {},
      chests: { width: 2, height: 3.5 },
      loaded: false,
    },
    timer: { remaining: 0, running: false, initialized: false, paused: null },
    player: {
      hovering: false,
      displayResolution: null,
      screenBlockedArea: { top: 10, left: 0, right: 98, bottom: 98 },
    },
    screenInit: false,
  },
  reducers: {
    initTimer: (state, action) => {
      if (!state.timer.initialized) state.timer.initialized = true;

      const { timer, timerRunning } = action.payload;
      state.timer.remaining = timer;
      state.timer.running = timerRunning;
    },
    setTimerRunning: (state, action) => {
      if (action.payload === "toggle") {
        if (state.timer.paused) {
          if (state.timer.running) {
            state.timer.remaining =
              state.timer.remaining - (Date.now() - state.timer.paused) / 1000;
          } else {
            state.timer.paused = Date.now();
          }
        }
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
      if (visible && !state.player.hovering) state.player.hovering = true;
      else if (!visible && state.player.hovering) state.player.hovering = false;
    },
    displayUpdated: (state, action) => {
      const { displayResolution, screenInit } = action.payload;

      if (screenInit) {
        if (state.screenInit) return;
        state.screenInit = true;
      }

      if (displayResolution) {
        state.player.displayResolution = displayResolution;
      }

      if (state.player.displayResolution && state.screenInit) {
        const parts = state.player.displayResolution.split("x");
        const player = { width: Number(parts[0]), height: Number(parts[1]) };
        const screen = { width: window.innerWidth, height: window.innerHeight };
        const widthDist = player.width - screen.width;
        const heightDist = player.height - screen.height;

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
