// app/admin/page.jsx
"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  Briefcase,
  MessageSquare,
  Users,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  useGetProjectsQuery,
  useGetJobsQuery,
  useGetQueriesQuery,
  useGetApplicationsQuery,
  useGetProfileQuery,
} from "@/api/rippotaiApi";

export default function AdminDashboard() {
  // ───────────────── Fetch Data ─────────────────
  const { data: projectsResponse, isLoading: projectsLoading } =
    useGetProjectsQuery({ limit: 5 });

  const { data: jobsResponse, isLoading: jobsLoading } = useGetJobsQuery();

  const { data: queriesResponse, isLoading: queriesLoading } =
    useGetQueriesQuery();

  const { data: applicationsResponse, isLoading: appsLoading } =
    useGetApplicationsQuery();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

  // ───────────────── Safe Array Extraction ─────────────────
  const projects = Array.isArray(projectsResponse?.data)
    ? projectsResponse.data
    : Array.isArray(projectsResponse)
      ? projectsResponse
      : [];

  const jobs = Array.isArray(jobsResponse?.data)
    ? jobsResponse.data
    : Array.isArray(jobsResponse)
      ? jobsResponse
      : [];

  const queries = Array.isArray(queriesResponse?.data)
    ? queriesResponse.data
    : Array.isArray(queriesResponse)
      ? queriesResponse
      : [];

  const applications = Array.isArray(applicationsResponse?.data)
    ? applicationsResponse.data
    : Array.isArray(applicationsResponse)
      ? applicationsResponse
      : [];

  // ───────────────── Derived Stats (NO STATE) ─────────────────
  const stats = {
    projects: projects.length,
    jobs: jobs.length,
    queries: queries.length,
    applications: applications.length,
  };

  const isLoading =
    projectsLoading ||
    jobsLoading ||
    queriesLoading ||
    appsLoading ||
    profileLoading;

  // ───────────────── Loading Screen ─────────────────
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  // ───────────────── Dashboard UI ─────────────────
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Welcome back
            {profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-2 text-gray-600">
            Here's a quick overview of your admin dashboard
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText size={24} />}
          title="Projects"
          value={stats.projects}
          color="blue"
          link="/admin/projects"
        />

        <StatCard
          icon={<MessageSquare size={24} />}
          title="Inquiries"
          value={stats.queries}
          color="purple"
          link="/admin/queries"
        />

        <StatCard
          icon={<Users size={24} />}
          title="Applications"
          value={stats.applications}
          color="orange"
          link="/admin/applications"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <RecentSection
          title="Recent Projects"
          items={projects.slice(0, 5)}
          emptyMessage="No recent projects"
          link="/admin/projects"
          renderItem={(item) => (
            <>
              <div className="font-medium truncate">
                {item.title || "Untitled Project"}
              </div>
              <div className="text-sm text-gray-500">
                {item.category || "Uncategorized"} •{" "}
                {item.createdAt
                  ? format(new Date(item.createdAt), "dd MMM yyyy")
                  : "—"}
              </div>
            </>
          )}
        />

        {/* Recent Inquiries */}
        <RecentSection
          title="Recent Inquiries"
          items={queries.slice(0, 5)}
          emptyMessage="No recent messages"
          link="/admin/queries"
          renderItem={(item) => (
            <>
              <div className="font-medium truncate">
                {item.subject || "No subject"}
              </div>
              <div className="text-sm text-gray-500 truncate">
                From: {item.name || "Anonymous"} ({item.email || "—"})
              </div>
            </>
          )}
        />
      </div>
    </div>
  );
}

// ───────────────── Reusable Components ─────────────────

function StatCard({ icon, title, value, color, link }) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>

        {link && (
          <Link
            href={link}
            className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        )}
      </div>

      <h3 className="mt-4 text-lg font-medium text-gray-700">{title}</h3>
      <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function RecentSection({ title, items, emptyMessage, link, renderItem }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>

        {link && (
          <Link
            href={link}
            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
          >
            View all <ArrowRight size={16} />
          </Link>
        )}
      </div>

      {items?.length > 0 ? (
        <div className="divide-y divide-gray-100">
          {items.map((item) => (
            <div
              key={item._id || item.id}
              className="p-5 hover:bg-gray-50 transition-colors"
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500 flex flex-col items-center gap-2">
          <AlertCircle size={32} className="text-gray-400" />
          <p>{emptyMessage}</p>
        </div>
      )}
    </div>
  );
}
