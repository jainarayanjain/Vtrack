import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visitorData: {
    visitorType: null,
    visitorId: null,
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
  console.log("this is being called-->")
);

export const { setVisitorType, ressetVisitorType, setAccessCardId,setHostDetails } = VisitorSlice.actions;
export default VisitorSlice.reducer;
