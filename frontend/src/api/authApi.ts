// src/api/authApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  [key: string]: unknown;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  message?: string;
  [key: string]: unknown;
}

export interface RegisterResponse {
  message?: string;
  user?: User;
  token?: string;
  accessToken?: string;
  [key: string]: unknown;
}

export interface RefreshTokenResponse {
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  message?: string;
  [key: string]: unknown;
}

export interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string | Record<string, unknown>;
  [key: string]: unknown;
}

export interface LogoutResponse {
  message?: string;
  [key: string]: unknown;
}

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      // Auth endpoints usually don't need a Content-Type override.
      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),

      invalidatesTags: [
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, string>({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: {
          refreshToken,
        },
      }),
    }),

    getProfile: builder.query<User, void>({
      query: () => "/auth/profile",

      providesTags: [
        {
          type: "Users",
          id: "PROFILE",
        },
      ],
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshTokenMutation, useGetProfileQuery, useLogoutMutation } =
  authApi;
