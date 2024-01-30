import { configureStore } from "@reduxjs/toolkit";
import {authSlice, NidSlice, userMediaSlice} from "../features"


const store = configureStore({
  reducer: {
    auth: authSlice,
    media: userMediaSlice,
    nid: NidSlice,

  },
});
export default store;


