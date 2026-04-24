// src/api/projectsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '@/lib/config';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      // Don't set Content-Type for formData (file uploads)
      if (!['createProject', 'updateProject'].includes(endpoint)) {
        headers.set('Content-Type', 'application/json');
      }
      const token = localStorage.getItem('adminToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ['Projects'],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // QUERIES
    // ────────────────────────────────────────────────

    getProjects: builder.query({
      query: (params = {}) => ({
        url: '/projects',
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          category: params.category,
          status: params.status,
          search: params.search,
          sort: params.sort || 'priority',
          order: params.order || 'asc', // "asc" = lower number first (higher priority)
        },
      }),
      providesTags: (result) => {
        const tags = [{ type: 'Projects', id: 'LIST' }];
        if (result?.data?.data?.length) {
          result.data.data.forEach((project) => {
            if (project?._id) {
              tags.push({ type: 'Projects', id: project._id });
            }
          });
        }
        return tags;
      },
    }),

    getPublicProjects: builder.query({
      query: ({ page = 1, limit = 6, category }) => ({
        url: '/projects/public',
        params: {
          page,
          limit,
          ...(category && { category }), // Only send if category exists
        },
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        const { page = 1, category = 'all' } = queryArgs;
        return `publicProjects-page-${page}-cat-${category}`;
      },

      keepUnusedDataFor: 60,
      providesTags: [{ type: 'Projects', id: 'LIST' }],
    }),
    getCompletedProjects: builder.query({
      query: () => '/projects/completed',
      providesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    getDraftProjects: builder.query({
      query: () => '/projects/drafts', // Note: You had /projects/drafts but controller uses /projects/draft
      providesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    getProjectsByLocation: builder.query({
      query: (location) => `/projects/location/${location}`,
      providesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    getFeaturedProjects: builder.query({
      query: (limit = 6) => ({
        url: '/projects/featured',
        params: { limit },
      }),
      keepUnusedDataFor: 60,
      providesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    getProjectById: builder.query({
      query: (id) => `/projects/admin/${id}`,
      providesTags: (result, error, id) => [{ type: 'Projects', id }],
    }),

    getProjectBySlug: builder.query({
      query: (slug) => `/projects/${slug}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs}`,
      keepUnusedDataFor: 300,
      providesTags: (result) =>
        result
          ? [{ type: 'Projects', id: result._id || result.projectId }]
          : [],
    }),

    // ────────────────────────────────────────────────
    // MUTATIONS
    // ────────────────────────────────────────────────

    createProject: builder.mutation({
      query: (formData) => ({
        url: '/projects/admin/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'Projects', id: 'LIST' }],
    }),

    updateProject: builder.mutation({
      query: ({ projectId, formData }) => ({
        url: `/projects/admin/${projectId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: 'Projects', id: projectId },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    updateProjectStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/projects/admin/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    // Priority Update (priority 0 = no priority, 1 = highest, etc.)
    updateProjectPriority: builder.mutation({
      query: ({ id, priority }) => ({
        url: `/projects/admin/${id}/priority`,
        method: 'PATCH',
        body: { priority: Number(priority) }, // Ensure it's a number
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    // Set Featured (explicit true/false)
    setFeatured: builder.mutation({
      query: ({ id, featured }) => ({
        url: `/projects/admin/${id}/featured`,
        method: 'PATCH',
        body: { featured: !!featured },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    // Toggle Featured
    toggleFeatured: builder.mutation({
      query: (id) => ({
        url: `/projects/admin/${id}/toggle-featured`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/admin/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Projects', id },
        { type: 'Projects', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetPublicProjectsQuery,
  useGetCompletedProjectsQuery,
  useGetDraftProjectsQuery,
  useGetProjectsByLocationQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,

  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectStatusMutation,
  useUpdateProjectPriorityMutation,
  useSetFeaturedMutation,
  useToggleFeaturedMutation,
  useDeleteProjectMutation,

  // Lazy queries
  useLazyGetProjectByIdQuery,
} = projectsApi;
