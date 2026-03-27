import { configureStore } from "@reduxjs/toolkit";

import { queriesApi } from "@/api/queriesApi";
import { projectsApi } from "@/api/projectsApi";
import { applicationsApi } from "@/api/applicationsApi";
import { usersApi } from "@/api/usersApi";
import { authApi } from "@/api/authApi";
import { rolesApi } from "@/api/rolesApi";
import { jobsApi } from "@/api/jobsApi";
const apis = [
  queriesApi,
  projectsApi,
  jobsApi,
  applicationsApi,
  usersApi,
  rolesApi,
  authApi,
];

export const makeStore = () => {
  const store = configureStore({
    reducer: Object.fromEntries(
      apis.map((api) => [api.reducerPath, api.reducer]),
    ),

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apis.map((api) => api.middleware)),

    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
};
