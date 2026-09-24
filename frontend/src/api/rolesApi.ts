// src/api/rolesApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────

export interface Role {
  _id: string;
  name: string;
  description?: string;
  permissions: string[] | Permission[];
  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface Permission {
  _id?: string;
  name: string;
  description?: string;
  resource?: string;
  action?: string;

  [key: string]: unknown;
}

export interface CreateRoleRequest {
  name: string;
  description?: string;
  permissions: string[] | Permission[];
}

export interface UpdateRoleRequest {
  id: string;
  name: string;
  description?: string;
  permissions: string[] | Permission[];
}

// ────────────────────────────────────────────────
// API
// ────────────────────────────────────────────────

export const rolesApi = createApi({
  reducerPath: "rolesApi",

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

  tagTypes: ["Roles"],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // GET ALL ROLES
    // ────────────────────────────────────────────────

    getAllRoles: builder.query<Role[], void>({
      query: () => "/roles",

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "Roles" as const,
                id: _id,
              })),
              {
                type: "Roles" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Roles" as const,
                id: "LIST",
              },
            ],
    }),

    // ────────────────────────────────────────────────
    // GET ROLE BY ID
    // ────────────────────────────────────────────────

    getRoleById: builder.query<Role, string>({
      query: (id) => `/roles/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Roles",
          id,
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // CREATE ROLE
    // ────────────────────────────────────────────────

    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: ({ name, description, permissions }) => ({
        url: "/roles",
        method: "POST",
        body: {
          name,
          description,
          permissions,
        },
      }),

      invalidatesTags: [
        {
          type: "Roles",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // UPDATE ROLE
    // ────────────────────────────────────────────────

    updateRole: builder.mutation<Role, UpdateRoleRequest>({
      query: ({ id, name, description, permissions }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: {
          name,
          description,
          permissions,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Roles",
          id,
        },
        {
          type: "Roles",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // DELETE ROLE
    // ────────────────────────────────────────────────

    deleteRole: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "Roles",
          id,
        },
        {
          type: "Roles",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // GET AVAILABLE PERMISSIONS
    // ────────────────────────────────────────────────

    getAvailablePermissions: builder.query<Permission[], void>({
      query: () => "/roles/permissions",

      providesTags: [
        {
          type: "Roles",
        },
      ],
    }),
  }),
});

// ────────────────────────────────────────────────
// HOOKS
// ────────────────────────────────────────────────

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAvailablePermissionsQuery,
} = rolesApi;
