import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitorData: {
    visitorType: null,
    visitorId: null,
    visitorName:null,
  },
  AccessCardId: null,
  CategoryId: null,
  ApprovalId: null,
  HostData: {
    hostName: null,
  },
};

const VisitorSlice = createSlice(
  {
    name: "visitor",
    initialState,
    reducers: {
      setVisitorType: (state, action) => {
        state.visitorData.visitorType = action.payload.visitorType;
        state.visitorData.visitorId = action.payload.visitorId;
        state.visitorData.visitorName = action.payload.visitorName;
      },
      setAccessCardId: (state, action) => {
        state.AccessCardId = action.payload.accessCardId;
        state.CategoryId = action.payload.categoryId;
        state.ApprovalId = action.payload.approvalId;
      },
      setHostDetails: (state, action) => {
        state.HostData.hostName = action.payload.hostName;
      },
      ressetVisitorType: (state) => initialState.visitorType,
    },
  },
);

export const { setVisitorType, ressetVisitorType, setAccessCardId,setHostDetails } = VisitorSlice.actions;
export default VisitorSlice.reducer;
