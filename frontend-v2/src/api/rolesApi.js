// src/api/rolesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

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
    getAllRoles: builder.query({
      query: () => "/roles",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Roles", id: _id })),
              { type: "Roles", id: "LIST" },
            ]
          : [{ type: "Roles", id: "LIST" }],
    }),

    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: (result, error, id) => [{ type: "Roles", id }],
    }),

    createRole: builder.mutation({
      query: ({ name, description, permissions }) => ({
        url: "/roles",
        method: "POST",
        body: { name, description, permissions },
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),

    updateRole: builder.mutation({
      query: ({ id, name, description, permissions }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: { name, description, permissions },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Roles", id },
        { type: "Roles", id: "LIST" },
      ],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Roles", id },
        { type: "Roles", id: "LIST" },
      ],
    }),

    getAvailablePermissions: builder.query({
      query: () => "/roles/permissions",
      providesTags: ["Roles"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAvailablePermissionsQuery,
} = rolesApi;
