import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    currency: 0,
    linked: process.env.NODE_ENV === "development" ? true : false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      const { username, currency } = action.payload;
      state.username = username;
      state.currency = currency;
      state.linked = true;
    },
    currencyUpdated: (state, action) => {
      state.currency = state.currency + action.payload;
    },
  },
});

export const { loginRequest, loginSuccess, currencyUpdated, chestClicked } =
  slice.actions;
export default slice.reducer;
