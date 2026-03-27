// src/api/authApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Auth endpoints usually don't need Content-Type override or token for login/register
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Users"], // Using Users tag for profile

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),

    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),

    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: [{ type: "Users", id: "PROFILE" }],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = authApi;
