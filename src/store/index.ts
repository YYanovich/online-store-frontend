import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import deviceReducer from "./deviceSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    device: deviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
