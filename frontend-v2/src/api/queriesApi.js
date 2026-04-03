// src/api/queriesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export const queriesApi = createApi({
  reducerPath: "queriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");

      const token = localStorage.getItem("adminToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);

      return headers;
    },
  }),

  tagTypes: ["Queries"],

  endpoints: (builder) => ({
    /**
     * CREATE QUERY - FIXED
     */
    createQuery: builder.mutation({
      query: ({ branch, name, email, subject, message }) => ({
        url: `/queries/`,                    // Keep as per your current route
        method: "POST",
        body: { name, email, subject, message, branch },   // ✅ Send branch in body
      }),
      invalidatesTags: [{ type: "Queries", id: "LIST" }],
    }),

    /**
     * GET ALL QUERIES (by branch)
     */
    getQueries: builder.query({
      query: (branch) => `/queries/${branch}`,
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Queries", id: _id })),
              { type: "Queries", id: "LIST" },
            ]
          : [{ type: "Queries", id: "LIST" }],
    }),

    /**
     * GET SINGLE QUERY
     */
    getQuery: builder.query({
      query: ({ branch, id }) => `/queries/${branch}/${id}`,
      providesTags: (result, error, { id }) => [{ type: "Queries", id }],
    }),

    /**
     * UPDATE QUERY
     */
    updateQuery: builder.mutation({
      query: ({ branch, id, ...updates }) => ({
        url: `/queries/${branch}/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    /**
     * DELETE QUERY
     */
    deleteQuery: builder.mutation({
      query: ({ branch, id }) => ({
        url: `/queries/${branch}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    /**
     * ADD NOTE
     */
    addNote: builder.mutation({
      query: ({ branch, id, text }) => ({
        url: `/queries/${branch}/${id}/notes`,
        method: "POST",
        body: { text, branch },   // ✅ Also send branch in body for consistency
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useCreateQueryMutation,
  useGetQueriesQuery,
  useGetQueryQuery,
  useUpdateQueryMutation,
  useDeleteQueryMutation,
  useAddNoteMutation,
} = queriesApi;