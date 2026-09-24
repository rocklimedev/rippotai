// src/api/queriesApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────

export interface QueryItem {
  _id: string;
  branch: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  notes?: QueryNote[];
  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface QueryNote {
  _id?: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;

  [key: string]: unknown;
}

export interface CreateQueryRequest {
  branch: string;
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface GetQueriesResponse extends Array<QueryItem> {}

export interface GetQueryRequest {
  id: string;
  branch: string;
}

export interface UpdateQueryRequest {
  id: string;
  branch: string;
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  status?: string;

  [key: string]: unknown;
}

export interface DeleteQueryRequest {
  id: string;
  branch: string;
}

export interface AddNoteRequest {
  id: string;
  branch: string;
  text: string;
}

// ────────────────────────────────────────────────
// API
// ────────────────────────────────────────────────

export const queriesApi = createApi({
  reducerPath: "queriesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL}/queries`,

    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Queries"],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // CREATE QUERY
    // ────────────────────────────────────────────────

    createQuery: builder.mutation<QueryItem, CreateQueryRequest>({
      query: ({ branch, name, email, subject, message }) => ({
        url: "/",
        method: "POST",
        body: {
          branch,
          name,
          email,
          subject,
          message,
        },
      }),

      invalidatesTags: [
        {
          type: "Queries",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // GET ALL QUERIES
    // ────────────────────────────────────────────────

    getQueries: builder.query<QueryItem[], string | undefined>({
      query: (branch) => ({
        url: "/",
        params: {
          branch,
        },
      }),

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "Queries" as const,
                id: _id,
              })),
              {
                type: "Queries" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Queries" as const,
                id: "LIST",
              },
            ],
    }),

    // ────────────────────────────────────────────────
    // GET SINGLE QUERY
    // ────────────────────────────────────────────────

    getQuery: builder.query<QueryItem, GetQueryRequest>({
      query: ({ id, branch }) => ({
        url: `/${id}`,
        params: {
          branch,
        },
      }),

      providesTags: (result, error, { id }) => [
        {
          type: "Queries",
          id,
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // UPDATE QUERY
    // ────────────────────────────────────────────────

    updateQuery: builder.mutation<QueryItem, UpdateQueryRequest>({
      query: ({ id, branch, ...updates }) => ({
        url: `/${id}`,
        method: "PUT",
        params: {
          branch,
        },
        body: {
          ...updates,
          branch,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Queries",
          id,
        },
        {
          type: "Queries",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // DELETE QUERY
    // ────────────────────────────────────────────────

    deleteQuery: builder.mutation<unknown, DeleteQueryRequest>({
      query: ({ id, branch }) => ({
        url: `/${id}`,
        method: "DELETE",
        params: {
          branch,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Queries",
          id,
        },
        {
          type: "Queries",
          id: "LIST",
        },
      ],
    }),

    // ────────────────────────────────────────────────
    // ADD NOTE
    // ────────────────────────────────────────────────

    addNote: builder.mutation<QueryItem, AddNoteRequest>({
      query: ({ id, branch, text }) => ({
        url: `/${id}/notes`,
        method: "POST",
        body: {
          text,
          branch,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Queries",
          id,
        },
        {
          type: "Queries",
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
  useCreateQueryMutation,
  useGetQueriesQuery,
  useGetQueryQuery,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
  useAddNoteMutation,
} = queriesApi;
