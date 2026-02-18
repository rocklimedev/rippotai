// app/admin/jobs/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Briefcase,
  Plus,
  Search,
  Table as TableIcon,
  LayoutGrid,
  Trash2,
  Pencil,
  RefreshCw,
} from "lucide-react";
import { useGetJobsQuery, useDeleteJobMutation } from "@/api/rippotaiApi";
import styles from "./jobs.module.css";

export default function AdminJobsPage() {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    data: rawJobs = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetJobsQuery();

  const jobs = useMemo(() => {
    let list = Array.isArray(rawJobs)
      ? rawJobs
      : rawJobs?.data || rawJobs?.jobs || [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (j) =>
          j.title?.toLowerCase().includes(term) ||
          j.location?.toLowerCase().includes(term) ||
          j.category?.toLowerCase().includes(term),
      );
    }

    if (categoryFilter !== "all") {
      list = list.filter((j) => j.category === categoryFilter);
    }

    return list;
  }, [rawJobs, searchTerm, categoryFilter]);

  const [deleteJob, { isLoading: isDeleting }] = useDeleteJobMutation();

  const handleDelete = async (jobId) => {
    if (!confirm("Delete this job posting? This cannot be undone.")) return;
    try {
      await deleteJob(jobId).unwrap();
      refetch();
    } catch (err) {
      alert(err.data?.message || "Delete failed");
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error?.data?.message || "Could not load jobs"}</p>
        <button
          onClick={refetch}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} min-h-screen bg-gray-50`}>
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Job Postings
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({jobs.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage career opportunities
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/jobs/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} /> New Job
          </Link>
        </div>
      </header>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title, location, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setViewMode("table")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "table"
                ? "bg-gray-200 shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <TableIcon size={16} className="inline" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              viewMode === "card"
                ? "bg-gray-200 shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LayoutGrid size={16} className="inline" />
          </button>
        </div>
      </div>

      {jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <Briefcase className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm || categoryFilter !== "all"
              ? "Try changing filters or search term"
              : "Post your first job opening."}
          </p>
          {(searchTerm || categoryFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setCategoryFilter("all");
              }}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : viewMode === "table" ? (
        <JobsTable
          jobs={jobs}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ) : (
        <JobsCards
          jobs={jobs}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────── Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 flex gap-4">
        <div className="h-10 w-full max-w-md animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────── Table View
function JobsTable({ jobs, onDelete, isDeleting }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Title
            </th>
            <th className="hidden md:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Category
            </th>
            <th className="hidden md:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Location
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Posted
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr
              key={job._id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {job.title || "—"}
              </td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-600">
                {job.category || "—"}
              </td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-600">
                {job.location || "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">
                {job.createdAt
                  ? format(new Date(job.createdAt), "dd MMM yyyy")
                  : "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/jobs/${job._id}/edit`}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </Link>
                  <button
                    onClick={() => onDelete(job._id)}
                    disabled={isDeleting}
                    className="rounded p-1.5 text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ────────────────────────────────────────────── Card View
function JobsCards({ jobs, onDelete, isDeleting }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="p-5">
            <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
              {job.title || "Untitled Position"}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-4">
              <span className="bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full">
                {job.category || "Uncategorized"}
              </span>
              <span>{job.location || "Remote / Not specified"}</span>
            </div>

            <p className="text-sm text-gray-500 mb-4 line-clamp-3">
              {job.description?.substring(0, 120) || "No description available"}
              ...
            </p>

            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>
                Posted:{" "}
                {job.createdAt
                  ? format(new Date(job.createdAt), "dd MMM yyyy")
                  : "—"}
              </span>
              <div className="flex gap-2">
                <Link
                  href={`/admin/jobs/${job._id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(job._id)}
                  disabled={isDeleting}
                  className="text-red-600 hover:underline disabled:opacity-50"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
