import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const userAuthSlice = createSlice(
  {
    name: "auth",
    initialState,
    reducers: {
      setLoggedIn: (state, action) => {
        state.isLoggedIn = action.payload;
      },
      setLoggedOut: (state, action) => {
        state.isLoggedIn = action.payload;
      },
    },
  },
  console.log("this is being called----> slice features")
);

export const { setLoggedIn, setLoggedOut } = userAuthSlice.actions;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export default userAuthSlice.reducer;
