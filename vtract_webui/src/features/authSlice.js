import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: 0,
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
