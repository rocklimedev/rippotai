// src/api/usersApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────

export interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string | Record<string, unknown>;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface CreateUserRequest {
  name?: string;
  email: string;
  password?: string;
  role?: string;
  roles?: string[];

  [key: string]: unknown;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  roles?: string[];

  [key: string]: unknown;
}

export interface AssignRolesRequest {
  id: string;
  roles: string[];
}

// ────────────────────────────────────────────────
// API
// ────────────────────────────────────────────────

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // GET ALL USERS
    // ────────────────────────────────────────────────

    getAllUsers: builder.query<User[], void>({
      query: () => "/users",

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "Users" as const,
                id: _id,
              })),
              {
                type: "Users" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Users" as const,
                id: "LIST",
              },
            ],
    }),

    // ────────────────────────────────────────────────
    // GET USER BY ID
    // ────────────────────────────────────────────────

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Users",
          id,
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // CREATE USER
    // ────────────────────────────────────────────────

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (userData) => ({
        url: "/users",
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

    // ────────────────────────────────────────────────
    // UPDATE USER
    // ────────────────────────────────────────────────

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Users",
          id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // DELETE USER
    // ────────────────────────────────────────────────

    deleteUser: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "Users",
          id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // ASSIGN ROLES
    // ────────────────────────────────────────────────

    assignRoles: builder.mutation<User, AssignRolesRequest>({
      query: ({ id, roles }) => ({
        url: `/users/${id}/roles`,
        method: "PATCH",
        body: {
          roles,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Users",
          id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),
  }),
});

// ────────────────────────────────────────────────
// HOOKS
// ────────────────────────────────────────────────

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRolesMutation,
} = usersApi;
