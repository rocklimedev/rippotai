import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export interface Permission {
  id?: string;
  name: string;
  description?: string;
  resource?: string;
  action?: string;

  [key: string]: unknown;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[] | Permission[] | null;
  createdAt?: string;
  updatedAt?: string;
  userCount?: number;

  [key: string]: unknown;
}

export interface RolesResponse {
  success: boolean;
  count?: number;
  data: Role[];
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

export const rolesApi = createApi({
  reducerPath: "rolesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: ["Roles"],

  endpoints: (builder) => ({
    getAllRoles: builder.query<Role[], void>({
      query: () => "/roles",

      transformResponse: (response: RolesResponse): Role[] => {
        return response.data ?? [];
      },

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: "Roles" as const,
                id,
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

    getRoleById: builder.query<Role, string>({
      query: (id) => `/roles/${id}`,

      transformResponse: (response: { success: boolean; data: Role }) => response.data,

      providesTags: (result, error, id) => [
        {
          type: "Roles",
          id,
        },
      ],
    }),

    createRole: builder.mutation<Role, CreateRoleRequest>({
      query: (body) => ({
        url: "/roles",
        method: "POST",
        body,
      }),

      transformResponse: (response: { success: boolean; data: Role }) => response.data,

      invalidatesTags: [
        {
          type: "Roles",
          id: "LIST",
        },
      ],
    }),

    updateRole: builder.mutation<Role, UpdateRoleRequest>({
      query: ({ id, ...body }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body,
      }),

      transformResponse: (response: { success: boolean; data: Role }) => response.data,

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

    getAvailablePermissions: builder.query<Permission[], void>({
      query: () => "/roles/permissions",

      transformResponse: (response: { success: boolean; data: Permission[] }) => response.data ?? [],

      providesTags: [
        {
          type: "Roles",
          id: "PERMISSIONS",
        },
      ],
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
