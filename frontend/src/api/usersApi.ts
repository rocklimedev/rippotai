import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export interface UserRole {
  id: string;
  name: string;
}

export interface User {
  id: string;
  name?: string;
  email: string;

  roleId?: string | null;

  role?: UserRole | string | null;

  roles?: string[];

  isActive?: boolean;

  lastLogin?: string | null;

  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
}

export interface CreateUserRequest {
  name?: string;
  email: string;
  password?: string;
  role?: string;
}

export interface UpdateUserRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
}

export interface AssignRolesRequest {
  id: string;
  roles: string[];
}

export const usersApi = createApi({
  reducerPath: "usersApi",

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

  tagTypes: ["Users"],

  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => "/users",

      transformResponse: (response: UsersResponse): User[] => {
        return response.data ?? [];
      },

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({
                type: "Users" as const,
                id,
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

    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,

      transformResponse: (response: { success: boolean; data: User }) => response.data,

      providesTags: (result, error, id) => [
        {
          type: "Users",
          id,
        },
      ],
    }),

    createUser: builder.mutation<User, CreateUserRequest>({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),

      transformResponse: (response: { success: boolean; data: User }) => response.data,

      invalidatesTags: [
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),

      transformResponse: (response: { success: boolean; data: User }) => response.data,

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

    assignRoles: builder.mutation<User, AssignRolesRequest>({
      query: ({ id, roles }) => ({
        url: `/users/${id}/roles`,
        method: "PATCH",
        body: {
          roles,
        },
      }),

      transformResponse: (response: { success: boolean; data: User }) => response.data,

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

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRolesMutation,
} = usersApi;
