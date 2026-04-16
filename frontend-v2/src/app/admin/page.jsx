// app/admin/page.jsx
"use client";

import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  MessageSquare,
  Users,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { useGetProjectsQuery } from "@/api/projectsApi";
import { useGetJobsQuery } from "@/api/jobsApi";
import { useGetProfileQuery } from "@/api/authApi";
import { useGetApplicationsQuery } from "@/api/applicationsApi";
import { useGetQueriesQuery } from "@/api/queriesApi";

const BRANCH = "rippotai";

export default function AdminDashboard() {
  // ───────────────── Fetch Data ─────────────────
  const { data: projectsResponse, isLoading: projectsLoading } =
    useGetProjectsQuery({ page: 1, limit: 5 });

  const { data: jobsResponse, isLoading: jobsLoading } = useGetJobsQuery();

  const { data: queriesResponse, isLoading: queriesLoading } =
    useGetQueriesQuery(BRANCH);

  const { data: applicationsResponse, isLoading: appsLoading } =
    useGetApplicationsQuery();

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

  // ───────────────── Safe Extraction ─────────────────
  const projects =
    projectsResponse?.data?.data ||
    projectsResponse?.data ||
    projectsResponse ||
    [];

  const jobs = jobsResponse?.data || jobsResponse || [];

  const queries = queriesResponse?.data || queriesResponse || [];

  const applications = applicationsResponse?.data || applicationsResponse || [];

  // ───────────────── Stats ─────────────────
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

  // ───────────────── Loading ─────────────────
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  // ───────────────── UI ─────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back
          {profile?.name ? `, ${profile.name.split(" ")[0]}` : ""}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's a quick overview of your admin dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
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

        {/* Queries */}
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

// ───────────────── Components ─────────────────

function StatCard({ icon, title, value, color, link }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
  };

  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between">
        <div className={`p-3 rounded-lg ${colors[color]}`}>{icon}</div>

        <Link
          href={link}
          className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
        >
          View <ArrowRight size={14} />
        </Link>
      </div>

      <h3 className="mt-4 text-gray-600">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function RecentSection({ title, items, emptyMessage, link, renderItem }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm">
      <div className="p-5 border-b flex justify-between">
        <h3 className="font-semibold">{title}</h3>
        <Link
          href={link}
          className="text-blue-600 text-sm flex items-center gap-1"
        >
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {items?.length ? (
        <div className="divide-y">
          {items.map((item) => (
            <div key={item._id || item.id} className="p-4 hover:bg-gray-50">
              {renderItem(item)}
            </div>
          ))}
        </div>
      ) : (
        <div className="p-10 text-center text-gray-500">
          <AlertCircle className="mx-auto mb-2" />
          {emptyMessage}
        </div>
      )}
    </div>
  );
}
