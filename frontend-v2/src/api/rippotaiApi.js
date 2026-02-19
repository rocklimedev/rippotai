// src/api/rippotaiApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";

export const rippotaiApi = createApi({
  reducerPath: "rippotaiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers, { endpoint }) => {
      // Skip Content-Type for FormData endpoints
      if (
        !["createApplication", "createProject", "updateProject"].includes(
          endpoint,
        )
      ) {
        headers.set("Content-Type", "application/json");
      }

      // Add Bearer token from localStorage for protected routes
      const token = localStorage.getItem("adminToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: [
    "Queries",
    "Projects",
    "Jobs",
    "Applications",
    "Users",
    "Roles", // ← NEW tag for roles
  ],

  endpoints: (builder) => ({
    // ────────────────────────────────────────────── Queries ──────────────────────────────────────────────
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

    // ────────────────────────────────────────────── Projects ──────────────────────────────────────────────
    getProjects: builder.query({
      query: (params) => ({
        url: "/projects",
        params,
      }),
      providesTags: (result) => {
        const tags = [{ type: "Projects", id: "LIST" }];
        if (Array.isArray(result)) {
          result.forEach((project) => {
            if (project?._id) tags.push({ type: "Projects", id: project._id });
          });
        }
        return tags;
      },
    }),
    getPublicProjects: builder.query({
      query: ({ page = 1, limit = 6, category } = {}) => ({
        url: "/projects/public",
        params: { page, limit, category },
      }),
      transformResponse: (response) => response.data,
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        const { page, category } = queryArgs || {};
        return `${endpointName}-${page || 1}-${category || "all"}`;
      },
      keepUnusedDataFor: 60,
      providesTags: (result) =>
        result
          ? [
              ...result.map((p) => ({ type: "Projects", id: p._id })),
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
    getProjectById: builder.query({
      query: (id) => `/projects/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    getProjectBySlug: builder.query({
      query: (slug) => `/projects/${slug}`,
      transformResponse: (response) => response,
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
        // Do NOT set Content-Type manually — browser sets multipart/form-data with boundary
      }),
    }),
    updateProject: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/projects/admin/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Projects", id },
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

    // ────────────────────────────────────────────── Jobs ──────────────────────────────────────────────
    getJobs: builder.query({
      query: () => "/careers/jobs",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Jobs", id: _id })),
              { type: "Jobs", id: "LIST" },
            ]
          : [{ type: "Jobs", id: "LIST" }],
    }),
    getJobById: builder.query({
      query: (id) => `/careers/jobs/${id}`,
      providesTags: (result, error, id) => [{ type: "Jobs", id }],
    }),
    createJob: builder.mutation({
      query: ({ title, category, location, description, details }) => ({
        url: "/careers/jobs",
        method: "POST",
        body: { title, category, location, description, details },
      }),
      invalidatesTags: [{ type: "Jobs", id: "LIST" }],
    }),
    updateJob: builder.mutation({
      query: ({ id, title, category, location, description, details }) => ({
        url: `/careers/jobs/${id}`,
        method: "PUT",
        body: { title, category, location, description, details },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Jobs", id },
        { type: "Jobs", id: "LIST" },
      ],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/careers/jobs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Jobs", id },
        { type: "Jobs", id: "LIST" },
      ],
    }),

    // ────────────────────────────────────────────── Applications ──────────────────────────────────────────────
    createApplication: builder.mutation({
      query: ({ name, email, position, resume, coverLetter }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("position", position);
        formData.append("coverLetter", coverLetter);
        if (resume) formData.append("resume", resume);
        return {
          url: "/careers/apply",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Applications", id: "LIST" }],
    }),
    getApplications: builder.query({
      query: () => "/careers/applications",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Applications", id: _id })),
              { type: "Applications", id: "LIST" },
            ]
          : [{ type: "Applications", id: "LIST" }],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/careers/applications/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Applications", id },
        { type: "Applications", id: "LIST" },
      ],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({
        url: `/careers/applications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Applications", id },
        { type: "Applications", id: "LIST" },
      ],
    }),
    getDashboardStats: builder.query({
      query: () => "/careers/dashboard-stats",
      providesTags: [{ type: "Applications", id: "LIST" }],
    }),

    // ────────────────────────────────────────────── Users ──────────────────────────────────────────────
    getAllUsers: builder.query({
      query: () => "/users",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Users", id: _id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    createUser: builder.mutation({
      query: (userData) => ({
        url: "/users",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    assignRoles: builder.mutation({
      query: ({ id, roles }) => ({
        url: `/users/${id}/roles`,
        method: "PATCH",
        body: { roles },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),

    // ────────────────────────────────────────────── Roles ──────────────────────────────────────────────
    getAllRoles: builder.query({
      query: () => "/roles",
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({ type: "Roles", id: _id })),
              { type: "Roles", id: "LIST" },
            ]
          : [{ type: "Roles", id: "LIST" }],
    }),

    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: (result, error, id) => [{ type: "Roles", id }],
    }),

    createRole: builder.mutation({
      query: ({ name, description, permissions }) => ({
        url: "/roles",
        method: "POST",
        body: { name, description, permissions },
      }),
      invalidatesTags: [{ type: "Roles", id: "LIST" }],
    }),

    updateRole: builder.mutation({
      query: ({ id, name, description, permissions }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: { name, description, permissions },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Roles", id },
        { type: "Roles", id: "LIST" },
      ],
    }),

    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Roles", id },
        { type: "Roles", id: "LIST" },
      ],
    }),

    getAvailablePermissions: builder.query({
      query: () => "/roles/permissions",
      providesTags: ["Roles"],
    }),

    // ────────────────────────────────────────────── Auth ──────────────────────────────────────────────
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      }),
    }),
    getProfile: builder.query({
      query: () => "/auth/profile",
      providesTags: [{ type: "Users", id: "PROFILE" }],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
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

  useGetProjectsQuery,
  useGetProjectBySlugQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetCompletedProjectsQuery,
  useGetDraftProjectsQuery,
  useGetProjectsByLocationQuery,
  useUpdateProjectStatusMutation,
  useGetPublicProjectsQuery,
  useGetProjectByIdQuery,
  useLazyGetProjectByIdQuery,

  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,

  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetDashboardStatsQuery,

  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignRolesMutation,

  // ── NEW Role exports ──
  useGetAllRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAvailablePermissionsQuery,

  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = rippotaiApi;
