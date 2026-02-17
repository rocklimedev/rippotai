// src/lib/store.js
import { configureStore } from "@reduxjs/toolkit";
import { rippotaiApi } from "../api/rippotaiApi"; // adjust path

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [rippotaiApi.reducerPath]: rippotaiApi.reducer,
      // add other reducers here later
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(rippotaiApi.middleware),
    // Optional: better dev experience
    devTools: process.env.NODE_ENV !== "production",
  });

  // Do NOT call setupListeners here — move it to client component
  return store;
};

// Optional: Type exports (even in JS, helpful for IDE/intellisense)
export const getStateType =
  /** @type {ReturnType<typeof makeStore>['getState']} */ (state) => state;
export const getDispatchType =
  /** @type {ReturnType<typeof makeStore>['dispatch']} */ (dispatch) =>
    dispatch;
