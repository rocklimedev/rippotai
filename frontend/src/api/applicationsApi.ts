// src/api/applicationsApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

type ApplicationStatus = "PENDING" | "REVIEWING" | "SHORTLISTED" | "REJECTED" | "HIRED";

export interface Application {
  _id: string;
  name: string;
  email: string;
  designation: string;
  interestedIn: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
  status: ApplicationStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateApplicationRequest {
  name: string;
  email: string;
  designation: string;
  interestedIn: string;
  phone: string;
  resume?: File | null;
  coverLetter?: string;
}

export interface UpdateApplicationStatusRequest {
  id: string;
  status: ApplicationStatus;
}

export interface DashboardStats {
  total: number;
  pending: number;
  reviewing: number;
  shortlisted: number;
  rejected: number;
  hired: number;
}

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers, { endpoint }) => {
      // Do not manually set Content-Type for FormData.
      // The browser must set multipart/form-data with its boundary.
      if (endpoint !== "createApplication") {
        headers.set("Content-Type", "application/json");
      }

      const token = localStorage.getItem("adminToken");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Applications"],

  endpoints: (builder) => ({
    createApplication: builder.mutation<unknown, CreateApplicationRequest>({
      query: ({ name, email, designation, interestedIn, phone, resume, coverLetter }) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("designation", designation);
        formData.append("interestedIn", interestedIn);
        formData.append("phone", phone);

        if (coverLetter) {
          formData.append("coverLetter", coverLetter);
        }

        if (resume) {
          formData.append("resume", resume);
        }

        return {
          url: "/careers/apply",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: [{ type: "Applications", id: "LIST" }],
    }),

    getApplications: builder.query<Application[], void>({
      query: () => "/careers/applications",

      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ _id }) => ({
                type: "Applications" as const,
                id: _id,
              })),
              {
                type: "Applications" as const,
                id: "LIST",
              },
            ]
          : [
              {
                type: "Applications" as const,
                id: "LIST",
              },
            ],
    }),

    updateApplicationStatus: builder.mutation<Application, UpdateApplicationStatusRequest>({
      query: ({ id, status }) => ({
        url: `/careers/applications/${id}`,
        method: "PUT",
        body: { status },
      }),

      invalidatesTags: (result, error, { id }) => [
        {
          type: "Applications",
          id,
        },
        {
          type: "Applications",
          id: "LIST",
        },
      ],
    }),

    deleteApplication: builder.mutation<unknown, string>({
      query: (id) => ({
        url: `/careers/applications/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: (result, error, id) => [
        {
          type: "Applications",
          id,
        },
        {
          type: "Applications",
          id: "LIST",
        },
      ],
    }),

    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => "/careers/dashboard-stats",

      providesTags: [
        {
          type: "Applications",
          id: "LIST",
        },
      ],
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
