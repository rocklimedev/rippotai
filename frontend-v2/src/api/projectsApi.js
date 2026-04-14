// src/api/projectsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      if (!["createProject", "updateProject"].includes(endpoint)) {
        headers.set("Content-Type", "application/json");
      }
      const token = localStorage.getItem("adminToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Projects"],

  endpoints: (builder) => ({
    getProjects: builder.query({
      query: (params) => ({
        url: "/projects",
        params,
      }),

      providesTags: (result) => {
        const tags = [{ type: "Projects", id: "LIST" }];

        const projects = result?.data?.data || [];

        projects.forEach((project) => {
          if (project?._id) {
            tags.push({ type: "Projects", id: project._id });
          }
        });

        return tags;
      },
    }),
    getPublicProjects: builder.query({
      query: ({ page = 1, limit = 6, category } = {}) => ({
        url: "/projects/public",
        params: { page, limit, category },
      }),
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, category } = queryArgs || {};
        return `${endpointName}-${page || 1}-${category || "all"}`;
      },
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((p) => ({ type: "Projects", id: p._id })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),

    getCompletedProjects: builder.query({
      query: () => "/projects/completed",
      providesTags: [{ type: "Projects", id: "LIST" }],
    }),

    getDraftProjects: builder.query({
      query: () => "/projects/drafts",
      providesTags: [{ type: "Projects", id: "LIST" }],
    }),

    getProjectsByLocation: builder.query({
      query: (location) => `/projects/location/${location}`,
      providesTags: [{ type: "Projects", id: "LIST" }],
    }),
    getFeaturedProjects: builder.query({
      query: (limit = 6) => ({
        url: "/projects/featured",
        params: { limit },
      }),
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((p) => ({ type: "Projects", id: p._id })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),

    getProjectBySlug: builder.query({
      query: (slug) => `/projects/${slug}`,
      serializeQueryArgs: ({ endpointName, queryArgs }) =>
        `${endpointName}-${queryArgs}`,
      keepUnusedDataFor: 300,
      providesTags: (result) =>
        result ? [{ type: "Projects", id: result._id }] : [],
    }),

    createProject: builder.mutation({
      query: (formData) => ({
        url: "/projects/admin/",
        method: "POST",
        body: formData,
      }),
    }),

    updateProject: builder.mutation({
      query: ({ projectId, formData }) => ({
        url: `/projects/admin/${projectId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId }, // ← This is critical
        { type: "Projects", id: projectId },
        { type: "Projects", id: "LIST" },
      ],
    }),
    updateProjectStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/projects/admin/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
      ],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/admin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
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
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,
  useGetFeaturedProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectStatusMutation,
  useDeleteProjectMutation,
  useLazyGetProjectByIdQuery,
} = projectsApi;
