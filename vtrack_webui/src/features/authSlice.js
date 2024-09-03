import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userId: 0,
  isApproved:null,
  adminUserId:0,
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.userId = action.payload.userId;
      state.adminUserId = action.payload.adminUserId;
      state.isApproved = action.payload.isApproved;
    },
  },
});

export const { setLoggedIn, setLoggedOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
