"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  Plus,
  Search,
  Table as TableIcon,
  LayoutGrid,
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

// ✅ ShadCN Pagination
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminProjectsPage() {
  const [viewMode, setViewMode] = useState("table");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Pagination state
  const [page, setPage] = useState(1);

  // ✅ API Call
  const {
    data: rawData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjectsQuery({
    page,

    search: searchTerm,
    status: statusFilter === "all" ? undefined : statusFilter,
  });

  // ✅ Extract data safely
  const projects = rawData?.data?.data || [];
  const totalPages = rawData?.data?.totalPages || 1;
  const total = rawData?.data?.total || 0;

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateProjectStatusMutation();

  // ✅ Reset page on filter/search change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, statusFilter]);

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this project permanently?")) return;

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
          <h1 className="text-2xl font-bold md:text-3xl">
            Projects
            <span className="ml-3 text-lg text-gray-600">({total})</span>
          </h1>
          <p className="text-sm text-gray-500">
            Manage all your portfolio entries
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          <Plus size={16} /> New Project
        </Link>
      </header>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border pl-10 py-2 text-sm"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            {Object.entries(STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* View Toggle */}
        <div className="flex border rounded-lg p-1">
          <button
            onClick={() => setViewMode("table")}
            className={viewMode === "table" ? "bg-gray-200 px-3 py-1" : ""}
          >
            <TableIcon size={16} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={viewMode === "card" ? "bg-gray-200 px-3 py-1" : ""}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {projects.length === 0 ? (
        <EmptyState
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          clear={() => {
            setSearchTerm("");
            setStatusFilter("all");
          }}
        />
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

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

/* ========================= */

function EmptyState({ searchTerm, statusFilter, clear }) {
  return (
    <div className="flex flex-col items-center border-dashed border p-12 text-center">
      <FileText className="mb-4 h-10 w-10 text-gray-400" />
      <h3>No projects found</h3>

      {(searchTerm || statusFilter !== "all") && (
        <button onClick={clear} className="mt-4 text-blue-600">
          Clear filters
        </button>
      )}
    </div>
  );
}

/* ========================= */

function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse bg-gray-200" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
