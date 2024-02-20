import { configureStore } from "@reduxjs/toolkit";
import { authSlice, VisitorSlice, userMediaSlice } from "../features";

const store = configureStore({
  reducer: {
    auth: authSlice,
    media: userMediaSlice,
    visitor: VisitorSlice,
  },
});
export default store;
