import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitorData: {
    visitorType: null,
    visitorId: null,
  },
};

const VisitorSlice = createSlice({
  name: "visitor",
  initialState,
  reducers: {
    setVisitorType: (state, action) => {
      state.visitorData.visitorType = action.payload.visitorType;
      state.visitorData.visitorId = action.payload.visitorId;
    },
    ressetVisitorType: (state) => initialState.visitorType,
  },
});

export const { setVisitorType, ressetVisitorType } = VisitorSlice.actions;
export default VisitorSlice.reducer;
