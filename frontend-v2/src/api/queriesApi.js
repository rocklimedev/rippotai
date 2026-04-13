// src/api/queriesApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

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
    /**
     * ✅ CREATE QUERY
     */
    createQuery: builder.mutation({
      query: ({ branch, name, email, subject, message }) => ({
        url: `/`,
        method: "POST",
        body: { branch, name, email, subject, message },
      }),
      invalidatesTags: [{ type: "Queries", id: "LIST" }],
    }),

    /**
     * ✅ GET ALL QUERIES (WITH BRANCH FILTER)
     */
    getQueries: builder.query({
      query: (branch) => ({
        url: `/`,
        params: { branch }, // 🔥 FIXED
      }),
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "Queries",
                id: _id,
              })),
              { type: "Queries", id: "LIST" },
            ]
          : [{ type: "Queries", id: "LIST" }],
    }),

    /**
     * ✅ GET SINGLE QUERY
     */
    getQuery: builder.query({
      query: ({ id, branch }) => ({
        url: `/${id}`,
        params: { branch }, // 🔥 FIXED
      }),
      providesTags: (result, error, { id }) => [{ type: "Queries", id }],
    }),

    /**
     * ✅ UPDATE QUERY
     */
    updateQuery: builder.mutation({
      query: ({ id, branch, ...updates }) => ({
        url: `/${id}`,
        method: "PUT",
        params: { branch }, // 🔥 consistent
        body: { ...updates, branch },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    /**
     * ✅ DELETE QUERY
     */
    deleteQuery: builder.mutation({
      query: ({ id, branch }) => ({
        url: `/${id}`,
        method: "DELETE",
        params: { branch }, // 🔥 FIXED
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    /**
     * ✅ ADD NOTE
     */
    addNote: builder.mutation({
      query: ({ id, branch, text }) => ({
        url: `/${id}/notes`,
        method: "POST",
        body: { text, branch }, // 🔥 required
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
