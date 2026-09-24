// src/api/projectsApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

// ────────────────────────────────────────────────
// TYPES
// ────────────────────────────────────────────────

export interface Project {
  projectId: string;

  title: string;
  slug: string;

  category?: string;
  location?: string;
  scope?: string;

  image?: string;
  banner?: string;
  images?: string[];

  status?: string;
  createdAt?: string;

  priority?: number;
  featured?: boolean;

  moreDetails?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
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
  success: boolean;
  data: {
    data: Project[];
    [key: string]: unknown;
  };
}

export interface PublicProjectsResponse {
  success: boolean;
  data: Project[];
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

      // Avoid SSR/localStorage access issues.
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: ["Projects"],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────────
    // QUERIES
    // ────────────────────────────────────────────────

    /**
     * GET /projects
     *
     * Admin/project listing endpoint.
     */
    getProjects: builder.query<ProjectsResponse, ProjectsQueryParams | void>({
      query: ({ page = 1, limit = 20, category, status, search, sort, order } = {}) => ({
        url: "/projects",

        params: {
          page,
          limit,
          ...(category && { category }),
          ...(status && { status }),
          ...(search && { search }),
          ...(sort && { sort }),
          ...(order && { order }),
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
            if (project.projectId) {
              tags.push({
                type: "Projects",
                id: project.projectId,
              });
            }
          });
        }

        return tags;
      },
    }),

    /**
     * GET /projects/public
     *
     * Public project listing.
     */
    getPublicProjects: builder.query<PublicProjectsResponse, PublicProjectsQueryParams | void>({
      query: ({ page = 1, limit = 6, category } = {}) => ({
        url: "/projects/public",

        params: {
          page,
          limit,
          ...(category && { category }),
        },
      }),

      serializeQueryArgs: ({ queryArgs }) => {
        const { page = 1, category = "all" } = queryArgs ?? {};

        return `publicProjects-page-${page}-cat-${category}`;
      },

      transformResponse: (response: ApiResponse<Project[]>): PublicProjectsResponse => {
        return {
          success: response.success,
          data: response.data,
        };
      },

      keepUnusedDataFor: 60,

      providesTags: (result) => [
        {
          type: "Projects",
          id: "LIST",
        },

        ...(result?.data ?? []).map((project) => ({
          type: "Projects" as const,
          id: project.projectId,
        })),
      ],
    }),

    /**
     * GET /projects/completed
     */
    getCompletedProjects: builder.query<Project[], void>({
      query: () => "/projects/completed",

      transformResponse: (response: ApiResponse<Project[]>) => {
        return response.data;
      },

      providesTags: (result) => [
        {
          type: "Projects",
          id: "LIST",
        },

        ...(result ?? []).map((project) => ({
          type: "Projects" as const,
          id: project.projectId,
        })),
      ],
    }),

    /**
     * GET /projects/drafts
     */
    getDraftProjects: builder.query<Project[], void>({
      query: () => "/projects/drafts",

      transformResponse: (response: ApiResponse<Project[]>) => {
        return response.data;
      },

      providesTags: (result) => [
        {
          type: "Projects",
          id: "LIST",
        },

        ...(result ?? []).map((project) => ({
          type: "Projects" as const,
          id: project.projectId,
        })),
      ],
    }),

    /**
     * GET /projects/location/:location
     */
    getProjectsByLocation: builder.query<Project[], string>({
      query: (location) => `/projects/location/${encodeURIComponent(location)}`,

      transformResponse: (response: ApiResponse<Project[]>) => {
        return response.data;
      },

      providesTags: (result) => [
        {
          type: "Projects",
          id: "LIST",
        },

        ...(result ?? []).map((project) => ({
          type: "Projects" as const,
          id: project.projectId,
        })),
      ],
    }),

    /**
     * GET /projects/featured
     *
     * This is used by the homepage Showcase.
     *
     * Server response:
     *
     * {
     *   success: true,
     *   data: [...]
     * }
     *
     * RTK Query result:
     *
     * Project[]
     */
    getFeaturedProjects: builder.query<Project[], number | void>({
      query: (limit = 6) => ({
        url: "/projects/featured",

        params: {
          limit,
        },
      }),

      transformResponse: (response: ApiResponse<Project[]>): Project[] => {
        return response.data;
      },

      keepUnusedDataFor: 60,

      providesTags: (result) => [
        {
          type: "Projects",
          id: "LIST",
        },

        ...(result ?? []).map((project) => ({
          type: "Projects" as const,
          id: project.projectId,
        })),
      ],
    }),

    /**
     * GET /projects/admin/:id
     *
     * Admin project detail.
     */
    getProjectById: builder.query<Project, string>({
      query: (id) => `/projects/admin/${id}`,

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

      providesTags: (result, error, id) => [
        {
          type: "Projects",
          id: result?.projectId ?? id,
        },
      ],
    }),

    /**
     * GET /projects/:slug
     *
     * Public project detail.
     */
    getProjectBySlug: builder.query<Project, string>({
      query: (slug) => `/projects/${encodeURIComponent(slug)}`,

      transformResponse: (response: ApiResponse<Project>): Project => {
        return response.data;
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => `${endpointName}-${queryArgs}`,

      keepUnusedDataFor: 300,

      providesTags: (result) =>
        result
          ? [
              {
                type: "Projects",
                id: result.projectId,
              },
            ]
          : [],
    }),

    // ────────────────────────────────────────────────
    // MUTATIONS
    // ────────────────────────────────────────────────

    /**
     * POST /projects/admin/
     */
    createProject: builder.mutation<Project, FormData>({
      query: (formData) => ({
        url: "/projects/admin/",
        method: "POST",
        body: formData,
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

      invalidatesTags: [
        {
          type: "Projects",
          id: "LIST",
        },
      ],
    }),

    /**
     * PUT /projects/admin/:projectId
     */
    updateProject: builder.mutation<Project, UpdateProjectRequest>({
      query: ({ projectId, formData }) => ({
        url: `/projects/admin/${projectId}`,
        method: "PUT",
        body: formData,
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

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

    /**
     * PATCH /projects/admin/:id/status
     */
    updateProjectStatus: builder.mutation<Project, ProjectStatusRequest>({
      query: ({ id, status }) => ({
        url: `/projects/admin/${id}/status`,
        method: "PATCH",

        body: {
          status,
        },
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

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

    /**
     * PATCH /projects/admin/:id/priority
     */
    updateProjectPriority: builder.mutation<Project, ProjectPriorityRequest>({
      query: ({ id, priority }) => ({
        url: `/projects/admin/${id}/priority`,
        method: "PATCH",

        body: {
          priority: Number(priority),
        },
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

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

    /**
     * PATCH /projects/admin/:id/featured
     */
    setFeatured: builder.mutation<Project, SetFeaturedRequest>({
      query: ({ id, featured }) => ({
        url: `/projects/admin/${id}/featured`,
        method: "PATCH",

        body: {
          featured: !!featured,
        },
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

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

    /**
     * PATCH /projects/admin/:id/toggle-featured
     */
    toggleFeatured: builder.mutation<Project, string>({
      query: (id) => ({
        url: `/projects/admin/${id}/toggle-featured`,
        method: "PATCH",
      }),

      transformResponse: (response: ApiResponse<Project>) => {
        return response.data;
      },

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

    /**
     * DELETE /projects/admin/:id
     */
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
  // Queries
  useGetProjectsQuery,
  useGetPublicProjectsQuery,
  useGetCompletedProjectsQuery,
  useGetDraftProjectsQuery,
  useGetProjectsByLocationQuery,
  useGetFeaturedProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectBySlugQuery,

  // Mutations
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
