// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// import authSlice from "../features/authSlice";
// import userMediaSlice from "../features/userMediaSlice";
// import VisitorSlice from "../features/VisitorSlice";
// import { resetSlice } from "../features";
import { authSlice, userMediaSlice, VisitorSlice, resetSlice } from "../features";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  media: userMediaSlice,
  visitor: VisitorSlice,
  reset: resetSlice, // Include the reset slice in the root reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
