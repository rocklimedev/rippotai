// src/api/jobsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/config';

export const jobsApi = createApi({
  reducerPath: 'jobsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      const token = localStorage.getItem('adminToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['Jobs'],

  endpoints: (builder) => ({
    getJobs: builder.query({
      query: () => '/careers/jobs',
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: 'Jobs', id: _id })),
              { type: 'Jobs', id: 'LIST' },
            ]
          : [{ type: 'Jobs', id: 'LIST' }],
    }),

    getJobById: builder.query({
      query: (id) => `/careers/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: 'Jobs', id }],
    }),

    createJob: builder.mutation({
      query: ({ title, category, location, description, details }) => ({
        url: '/careers/jobs',
        method: 'POST',
        body: { title, category, location, description, details },
      }),
      invalidatesTags: [{ type: 'Jobs', id: 'LIST' }],
    }),

    updateJob: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/careers/jobs/${id}`,
        method: 'PUT',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Jobs', id },
        { type: 'Jobs', id: 'LIST' },
      ],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/careers/jobs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Jobs', id },
        { type: 'Jobs', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApi;
