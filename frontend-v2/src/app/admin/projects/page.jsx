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
} from "@/api/rippotaiApi";
import styles from "./projects.module.css";

const STATUS_LABELS = {
  all: "All Projects",
  draft: "Drafts",
  working: "In Progress",
  completed: "Completed",
  prunned: "Pruned / Archived",
};

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

// ────────────────────────────────────────────── Table
function ProjectsTable({
  projects,
  onDelete,
  onStatusToggle,
  isDeleting,
  isUpdating,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Title
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-700 md:table-cell">
              Category
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Status
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-700 md:table-cell">
              Location
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {projects.map((project) => (
            <tr
              key={project.projectId}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3">
                {project.image || project.images?.[0] ? (
                  <div className="h-10 w-16 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={project.image || project.images[0]}
                      alt={project.title}
                      width={64}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-10 w-16 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                    No img
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium text-gray-900">
                {project.title || "—"}
              </td>
              <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                {project.category || "—"}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                    project.status,
                  )}`}
                >
                  {project.status || "unknown"}
                </span>
              </td>
              <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                {project.location || "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/projects/${project.projectId}/edit`}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </Link>
                  <Link
                    href={`/project/${project.slug}`}
                    target="_blank"
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="View live"
                  >
                    <Eye size={16} className="text-gray-600" />
                  </Link>
                  <button
                    onClick={() =>
                      onStatusToggle(project.projectId, project.status)
                    }
                    disabled={isUpdating || isDeleting}
                    className="rounded px-2.5 py-1 text-xs font-medium border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {getNextStatusLabel(project.status)}
                  </button>
                  <button
                    onClick={() => onDelete(project.projectId)}
                    disabled={isDeleting || isUpdating}
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

// ────────────────────────────────────────────── Cards
function ProjectsCards({
  projects,
  onDelete,
  onStatusToggle,
  isDeleting,
  isUpdating,
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <div
          key={project.projectId}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="relative aspect-[4/3] bg-gray-100">
            {project.image || project.images?.[0] ? (
              <Image
                src={project.image || project.images[0]}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No image
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <span
                className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold leading-tight text-gray-900">
              {project.title || "Untitled"}
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              {project.category} • {project.location || "No location"}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href={`/admin/projects/${project.projectId}/edit`}
                className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-center text-sm hover:bg-gray-50"
              >
                Edit
              </Link>
              <Link
                href={`/project/${project.slug}`}
                target="_blank"
                className="flex-1 rounded border border-gray-300 px-3 py-1.5 text-center text-sm hover:bg-gray-50"
              >
                View
              </Link>
            </div>

            <div className="mt-3 flex justify-between text-sm">
              <button
                onClick={() =>
                  onStatusToggle(project.projectId, project.status)
                }
                disabled={isUpdating || isDeleting}
                className="text-blue-600 hover:underline disabled:opacity-50"
              >
                {getNextStatusLabel(project.status)}
              </button>
              <button
                onClick={() => onDelete(project.projectId)}
                disabled={isDeleting || isUpdating}
                className="text-red-600 hover:underline disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Helpers (unchanged)
function getStatusColor(status) {
  const colors = {
    draft: "bg-yellow-100 text-yellow-800",
    working: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    prunned: "bg-gray-100 text-gray-800",
  };
  return colors[status] || "bg-gray-100 text-gray-800";
}

function getNextStatusLabel(current) {
  if (current === "draft") return "→ Start Working";
  if (current === "working") return "→ Mark Completed";
  if (current === "completed") return "→ Back to Draft";
  return "Change Status";
}
