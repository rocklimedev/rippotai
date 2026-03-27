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
    createQuery: builder.mutation({
      query: ({ name, email, subject, message }) => ({
        url: "/queries",
        method: "POST",
        body: { name, email, subject, message },
      }),
      invalidatesTags: [{ type: "Queries", id: "LIST" }],
    }),

    getQueries: builder.query({
      query: () => "/queries",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Queries", id: _id })),
              { type: "Queries", id: "LIST" },
            ]
          : [{ type: "Queries", id: "LIST" }],
    }),

    getQuery: builder.query({
      query: (id) => `/queries/${id}`,
      providesTags: (result, error, id) => [{ type: "Queries", id }],
    }),

    updateQuery: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/queries/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    deleteQuery: builder.mutation({
      query: (id) => ({
        url: `/queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Queries", id },
        { type: "Queries", id: "LIST" },
      ],
    }),

    addNote: builder.mutation({
      query: ({ id, note }) => ({
        url: `/queries/${id}/notes`,
        method: "POST",
        body: { note },
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
