// src/api/projectsApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────

export interface Project {
  _id: string;
  projectId?: string;

  title?: string;
  name?: string;
  slug?: string;

  category?: string;
  status?: string;
  location?: string;

  description?: string;
  priority?: number;
  featured?: boolean;

  [key: string]: unknown;
}

export interface ProjectsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
  search?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PublicProjectsQueryParams {
  page?: number;
  limit?: number;
  category?: string;
}

export interface ProjectsResponse {
  data: {
    data: Project[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface PublicProjectsResponse {
  data?: Project[];
  [key: string]: unknown;
}

export interface ProjectStatusRequest {
  id: string;
  status: string;
}

export interface ProjectPriorityRequest {
  id: string;
  priority: number | string;
}

export interface SetFeaturedRequest {
  id: string;
  featured: boolean;
}

export interface UpdateProjectRequest {
  projectId: string;
  formData: FormData;
}

// ────────────────────────────────────────────────
// API
// ────────────────────────────────────────────────

export const projectsApi = createApi({
  reducerPath: "projectsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers, { endpoint }) => {
      // Do not set Content-Type for FormData uploads.
      // The browser automatically sets multipart/form-data
      // with the correct boundary.
      if (!["createProject", "updateProject"].includes(endpoint)) {
        headers.set("Content-Type", "application/json");
      }

      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Projects"],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // QUERIES
    // ────────────────────────────────────────────────

    getProjects: builder.query<ProjectsResponse, ProjectsQueryParams | void>({
      query: (params = {}) => ({
        url: "/projects",
        params: {
          page: params.page || 1,
          limit: params.limit || 10,
          category: params.category,
          status: params.status,
          search: params.search,
          sort: params.sort || "priority",
          order: params.order || "asc",
        },
      }),

      providesTags: (result) => {
        const tags: Array<{
          type: "Projects";
          id: string;
        }> = [
          {
            type: "Projects",
            id: "LIST",
          },
        ];

        if (result?.data?.data?.length) {
          result.data.data.forEach((project) => {
            if (project?._id) {
              tags.push({
                type: "Projects",
                id: project._id,
              });
            }
          });
        }

        return tags;
      },
    }),

    getPublicProjects: builder.query<PublicProjectsResponse, PublicProjectsQueryParams>({
      query: ({ page = 1, limit = 6, category }) => ({
        url: "/projects/public",
        params: {
          page,
          limit,
          ...(category && { category }),
        },
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        const { page = 1, category = "all" } = queryArgs;

        return `publicProjects-page-${page}-cat-${category}`;
      },

      keepUnusedDataFor: 60,

      providesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    getCompletedProjects: builder.query<Project[], void>({
      query: () => "/projects/completed",

      providesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    getDraftProjects: builder.query<Project[], void>({
      query: () => "/projects/drafts",

      providesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    getProjectsByLocation: builder.query<Project[], string>({
      query: (location) => `/projects/location/${location}`,

      providesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    getFeaturedProjects: builder.query<Project[], number | void>({
      query: (limit = 6) => ({
        url: "/projects/featured",
        params: {
          limit,
        },
      }),

      keepUnusedDataFor: 60,

      providesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/admin/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Projects",
          id,
        },
      ],
    }),

    getProjectBySlug: builder.query<Project, string>({
      query: (slug) => `/projects/${slug}`,

      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs}`,

      keepUnusedDataFor: 300,

      providesTags: (result) =>
        result
          ? [
              {
                type: "Projects",
                id: result._id || result.projectId!,
              },
            ]
          : [],
    }),

    // ────────────────────────────────────────────────
    // MUTATIONS
    // ────────────────────────────────────────────────

    createProject: builder.mutation<Project, FormData>({
      query: (formData) => ({
        url: "/projects/admin/",
        method: "POST",
        body: formData,
      }),

      invalidatesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    updateProject: builder.mutation<Project, UpdateProjectRequest>({
      query: ({ projectId, formData }) => ({
        url: `/projects/admin/${projectId}`,
        method: "PUT",
        body: formData,
      }),

      invalidatesTags: (result, error, { projectId }) => [
        {
          type: "Projects",
          id: projectId,
        },
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    updateProjectStatus: builder.mutation<Project, ProjectStatusRequest>({
      query: ({ id, status }) => ({
        url: `/projects/admin/${id}/status`,
        method: "PATCH",
        body: {
          status,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Projects",
          id,
        },
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    updateProjectPriority: builder.mutation<Project, ProjectPriorityRequest>({
      query: ({ id, priority }) => ({
        url: `/projects/admin/${id}/priority`,
        method: "PATCH",
        body: {
          priority: Number(priority),
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Projects",
          id,
        },
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    setFeatured: builder.mutation<Project, SetFeaturedRequest>({
      query: ({ id, featured }) => ({
        url: `/projects/admin/${id}/featured`,
        method: "PATCH",
        body: {
          featured: !!featured,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Projects",
          id,
        },
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    toggleFeatured: builder.mutation<Project, string>({
      query: (id) => ({
        url: `/projects/admin/${id}/toggle-featured`,
        method: "PATCH",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "Projects",
          id,
        },
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    deleteProject: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/projects/admin/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "Projects",
          id,
        },
        {
          type: "Projects",
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
