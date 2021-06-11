import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "auth",
  initialState: {
    username: "",
    currency: 0,
    linked: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.username = action.payload.username;
      state.currency = action.payload.currency;
      state.linked = true;
    },
    updatedCurrency: (state, action) => {
      state.currency = state.currency + action.payload;
    },
    chestClicked: () => {},
    loginRequest: () => {},
  },
});

export const { loginRequest, loginSuccess, updatedCurrency, chestClicked } =
  slice.actions;
export default slice.reducer;
