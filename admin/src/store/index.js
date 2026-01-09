import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { rippotaiApi } from "../api/rippotaiApi";
export const store = configureStore({
  reducer: {
    [rippotaiApi.reducerPath]: rippotaiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rippotaiApi.middleware),
});

// Enable refetching and other listeners
setupListeners(store.dispatch);
