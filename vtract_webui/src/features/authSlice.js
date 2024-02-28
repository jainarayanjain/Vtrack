import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: 0,
  isApproved:null,
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
      state.isApproved = action.payload.isApproved;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
