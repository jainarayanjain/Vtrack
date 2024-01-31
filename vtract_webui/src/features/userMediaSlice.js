import { createSlice } from "@reduxjs/toolkit";


// Initial state
const initialState = {
  userData: {
    userPhoto: null,
    userSignature: null,
  },
};

// Create the slice
const userMediaSlice = createSlice(
    {
  name: 'userMedia',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { userPhoto, userSignature } = action.payload;
      state.userData = { userPhoto, userSignature };
    },
    clearUserMedia: (state) => {
      state.userData = {
        userPhoto: null,
        userSignature: null,
      };
    },
  },
});

// Export actions and reducer
export const { setUserData, clearUserMedia } = userMediaSlice.actions;
export default userMediaSlice.reducer;
