import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../store/config";
export const rippotaiApi = createApi({
  reducerPath: "rippotaiApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }), // Update for production
  endpoints: (builder) => ({
    // Add to the endpoints in rippotaiApi
    createQuery: builder.mutation({
      query: ({ name, email, phone, message }) => ({
        url: "/queries",
        method: "POST",
        body: { name, email, phone, message },
      }),
      invalidatesTags: [{ type: "Queries", id: "LIST" }],
    }),
    // Queries Endpoints
    getQueries: builder.query({
      query: () => "/queries",
      providesTags: ["Queries"],
    }),

    // Projects Endpoints
    getProjects: builder.query({
      query: (category) => ({
        url: "/projects",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Projects", id: _id })),
              { type: "Projects", id: "LIST" },
            ]
          : [{ type: "Projects", id: "LIST" }],
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: (result, error, id) => [{ type: "Projects", id }],
    }),
    createProject: builder.mutation({
      query: ({ title, category, description, details, image, images }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("details", details);
        if (image) formData.append("image", image); // File input
        if (images) images.forEach((img) => formData.append("images[]", img)); // Multiple images
        return {
          url: "/projects",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [{ type: "Projects", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: ({ id, title, category, description, details, image, images }) => {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("description", description);
        formData.append("details", details);
        if (image) formData.append("image", image);
        if (images) images.forEach((img) => formData.append("images[]", img));
        return {
          url: `/projects/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
      ],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Projects", id },
        { type: "Projects", id: "LIST" },
      ],
    }),

    // Jobs Endpoints
    getJobs: builder.query({
      query: (category) => ({
        url: "/careers/jobs",
      }),
      providesTags: (result) =>
        result
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

    // Applications Endpoints
    createApplication: builder.mutation({
      query: ({ name, email, position, resume, coverLetter }) => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("position", position);
        formData.append("coverLetter", coverLetter);
        if (resume) formData.append("resume", resume); // File input
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
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Applications", id: _id })),
              { type: "Applications", id: "LIST" },
            ]
          : [{ type: "Applications", id: "LIST" }],
    }),
  }),
});

export const {
  // Queries
  useCreateQueryMutation,
  useGetQueriesQuery,
  // Projects
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  // Jobs
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  // Applications
  useCreateApplicationMutation,
  useGetApplicationsQuery,
} = rippotaiApi;
