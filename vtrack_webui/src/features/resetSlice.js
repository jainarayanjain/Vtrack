// resetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const resetSlice = createSlice({
  name: 'reset',
  initialState: false,
  reducers: {
    resetState: (state) => true,
  },
});

export const { resetState } = resetSlice.actions;
export default resetSlice.reducer;
// export const resetReducer = resetSlice.reducer; // Named export

