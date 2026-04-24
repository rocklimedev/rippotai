// src/api/applicationsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/config';
export const applicationsApi = createApi({
  reducerPath: 'applicationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint !== 'createApplication') {
        headers.set('Content-Type', 'application/json');
      }
      const token = localStorage.getItem('adminToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['Applications'],

  endpoints: (builder) => ({
    createApplication: builder.mutation({
      query: ({
        name,
        email,
        designation,
        interestedIn,
        phone,
        resume,
        coverLetter,
      }) => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('designation', designation);
        formData.append('interestedIn', interestedIn);
        formData.append('phone', phone);
        if (coverLetter) formData.append('coverLetter', coverLetter);
        if (resume) formData.append('resume', resume);

        return {
          url: '/careers/apply',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: [{ type: 'Applications', id: 'LIST' }],
    }),

    getApplications: builder.query({
      query: () => '/careers/applications',
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: 'Applications', id: _id })),
              { type: 'Applications', id: 'LIST' },
            ]
          : [{ type: 'Applications', id: 'LIST' }],
    }),

    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/careers/applications/${id}`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Applications', id },
        { type: 'Applications', id: 'LIST' },
      ],
    }),

    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/careers/applications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Applications', id },
        { type: 'Applications', id: 'LIST' },
      ],
    }),

    getDashboardStats: builder.query({
      query: () => '/careers/dashboard-stats',
      providesTags: [{ type: 'Applications', id: 'LIST' }],
    }),
  }),
});

export const {
  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetDashboardStatsQuery,
} = applicationsApi;
