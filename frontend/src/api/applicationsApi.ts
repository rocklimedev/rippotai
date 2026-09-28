import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/lib/config";

export type ApplicationStatus = "Pending" | "Reviewed" | "Shortlisted" | "Rejected";

export interface Application {
  id: string;

  name: string;
  email: string;
  designation: string | null;
  interestedIn: string;
  phone: string | null;

  resume: string | null;
  coverLetter: string | null;

  status: ApplicationStatus;

  createdAt?: string;
  updatedAt?: string;
}

export interface ApplicationsResponse {
  applications: Application[];
  total: number;
  page: number;
  limit: number;
}

export interface CreateApplicationRequest {
  name: string;
  email: string;
  designation: string;
  interestedIn: string;
  phone: string;
  resume: File;
  coverLetter?: string;
}

export interface UpdateApplicationStatusRequest {
  id: string;
  status: ApplicationStatus;
}

export interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  shortlistedApplications: number;
}

export const applicationsApi = createApi({
  reducerPath: "applicationsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,

    prepareHeaders: (headers, { endpoint }) => {
      // IMPORTANT:
      // Do NOT set Content-Type for createApplication.
      // fetchBaseQuery/browser will automatically generate:
      // multipart/form-data; boundary=...
      if (endpoint !== "createApplication") {
        headers.set("Content-Type", "application/json");
      }

      if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      return headers;
    },
  }),

  tagTypes: ["Applications"],

  endpoints: (builder) => ({
    // =========================================================
    // PUBLIC APPLICATION SUBMISSION
    // POST /careers/apply
    // multipart/form-data
    // =========================================================
    createApplication: builder.mutation<
      {
        message: string;
        applicationId: string;
      },
      CreateApplicationRequest
    >({
      query: ({ name, email, designation, interestedIn, phone, resume, coverLetter }) => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("email", email);
        formData.append("designation", designation);
        formData.append("interestedIn", interestedIn);
        formData.append("phone", phone);

        if (coverLetter?.trim()) {
          formData.append("coverLetter", coverLetter.trim());
        }

        formData.append("resume", resume);

        return {
          url: "/careers/apply",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: [
        {
          type: "Applications",
          id: "LIST",
        },
      ],
    }),

    // =========================================================
    // ADMIN APPLICATION LIST
    // GET /careers/applications
    // =========================================================
    getApplications: builder.query<
      ApplicationsResponse,
      {
        status?: ApplicationStatus;
        search?: string;
        page?: number;
        limit?: number;
      } | void
    >({
      query: (params) => {
        const searchParams = new URLSearchParams();

        if (params?.status) {
          searchParams.set("status", params.status);
        }

        if (params?.search) {
          searchParams.set("search", params.search);
        }

        if (params?.page) {
          searchParams.set("page", String(params.page));
        }

        if (params?.limit) {
          searchParams.set("limit", String(params.limit));
        }

        const queryString = searchParams.toString();

        return {
          url: `/careers/applications${queryString ? `?${queryString}` : ""}`,
          method: "GET",
        };
      },

      providesTags: (result) =>
        result?.applications
          ? [
              ...result.applications.map((application) => ({
                type: "Applications" as const,
                id: application.id,
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

    // =========================================================
    // GET SINGLE APPLICATION
    // GET /careers/applications/:id
    // =========================================================
    getApplicationById: builder.query<Application, string>({
      query: (id) => `/careers/applications/${id}`,

      providesTags: (result, error, id) => [
        {
          type: "Applications",
          id,
        },
      ],
    }),

    // =========================================================
    // UPDATE APPLICATION STATUS
    // PUT /careers/applications/:id
    // =========================================================
    updateApplicationStatus: builder.mutation<
      {
        message: string;
        application: Application;
      },
      UpdateApplicationStatusRequest
    >({
      query: ({ id, status }) => ({
        url: `/careers/applications/${id}`,
        method: "PUT",
        body: {
          status,
        },
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

    // =========================================================
    // DELETE APPLICATION
    // DELETE /careers/applications/:id
    // =========================================================
    deleteApplication: builder.mutation<
      {
        message: string;
      },
      string
    >({
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

    // =========================================================
    // DASHBOARD STATS
    // GET /careers/dashboard-stats
    // =========================================================
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
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetDashboardStatsQuery,
} = applicationsApi;
