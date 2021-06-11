import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "settings",
  initialState: {
    showContainer: {},
    chests: {},
    loaded: false,
  },
  reducers: {
    getSettings: () => {},
    settingsUpdated: (state, action) => {
      state.chests = action.payload.chests;
      state.showContainer = action.payload.showContainer;
      state.loaded = true;
    },
  },
});

export const { getSettings, settingsUpdated } = slice.actions;
export default slice.reducer;
