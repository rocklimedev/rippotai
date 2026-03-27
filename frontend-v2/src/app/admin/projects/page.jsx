// app/admin/projects/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import {
  FileText,
  Plus,
  Search,
  Table as TableIcon,
  LayoutGrid,
  Trash2,
  Pencil,
  Eye,
  RefreshCw,
} from "lucide-react";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
  useUpdateProjectStatusMutation,
} from "@/api/projectsApi";
import styles from "./projects.module.css";
import ProjectsCards from "@/components/ProjectsCards";
import ProjectsTable from "@/components/ProjectsTable";
import { STATUS_LABELS } from "@/lib/config";

export default function AdminProjectsPage() {
  const [viewMode, setViewMode] = useState("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: rawData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjectsQuery({
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  const projects = useMemo(() => {
    let list = Array.isArray(rawData)
      ? rawData
      : Array.isArray(rawData?.data)
        ? rawData.data
        : Array.isArray(rawData?.projects)
          ? rawData.projects
          : [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(term) ||
          p.category?.toLowerCase().includes(term) ||
          p.location?.toLowerCase().includes(term),
      );
    }

    return list;
  }, [rawData, searchTerm]);

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateProjectStatusMutation();

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this project permanently? This cannot be undone."))
      return;
    try {
      await deleteProject(projectId).unwrap();
      refetch();
    } catch (err) {
      alert(err.data?.message || "Delete failed");
    }
  };

  const handleStatusToggle = async (projectId, current) => {
    let nextStatus;
    if (current === "draft") nextStatus = "working";
    else if (current === "working") nextStatus = "completed";
    else if (current === "completed") nextStatus = "draft";
    else nextStatus = "draft";

    try {
      await updateStatus({ projectId, status: nextStatus }).unwrap();
      refetch();
    } catch (err) {
      alert(err.data?.message || "Status update failed");
    }
  };

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error?.data?.message || "Could not load projects"}</p>
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
            Projects
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({projects.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your portfolio entries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} /> New Project
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
              placeholder="Search by title, category, location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
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

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <FileText className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            No projects found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm || statusFilter !== "all"
              ? "Try changing filters or search term"
              : "Get started by creating your first project."}
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      ) : viewMode === "table" ? (
        <ProjectsTable
          projects={projects}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      ) : (
        <ProjectsCards
          projects={projects}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      )}
    </div>
  );
}

// ────────────────────────────────────────────── Loading Skeleton (unchanged)
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
