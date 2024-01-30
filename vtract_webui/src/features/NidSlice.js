import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NidData: {
    nidType: null,
    nidImage: null,
  },
};

const NidSlice = createSlice({
  name: "nid",
  initialState,
  reducers: {
    setNID: (state, action) => {
      state.NidData.nidType = action.payload.nidtype;
      state.NidData.nidImage = action.payload.nidImage;
    },
    resetNID: (state) => initialState.NidData,
  },
});

export const { setNID, resetNID } = NidSlice.actions;
export default NidSlice.reducer;
