import { configureStore } from "@reduxjs/toolkit";

import { queriesApi } from "@/api/queriesApi";
import { projectsApi } from "@/api/projectsApi";
import { applicationsApi } from "@/api/applicationsApi";
import { usersApi } from "@/api/usersApi";
import { authApi } from "@/api/authApi";
import { rolesApi } from "@/api/rolesApi";
import { jobsApi } from "@/api/jobsApi";

export const makeStore = () => {
  return configureStore({
    reducer: {
      [queriesApi.reducerPath]: queriesApi.reducer,
      [projectsApi.reducerPath]: projectsApi.reducer,
      [jobsApi.reducerPath]: jobsApi.reducer,
      [applicationsApi.reducerPath]: applicationsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [rolesApi.reducerPath]: rolesApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(queriesApi.middleware)
        .concat(projectsApi.middleware)
        .concat(jobsApi.middleware)
        .concat(applicationsApi.middleware)
        .concat(usersApi.middleware)
        .concat(rolesApi.middleware)
        .concat(authApi.middleware),

    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
