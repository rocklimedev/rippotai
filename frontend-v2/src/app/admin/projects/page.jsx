"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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
  useUpdateProjectPriorityMutation,
  useToggleFeaturedMutation,
} from "@/api/projectsApi";

import styles from "./projects.module.css";
import ProjectsCards from "@/components/ProjectsCards";
import ProjectsTable from "@/components/ProjectsTable";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const TABS = [
  { id: "all", label: "All Projects" },
  { id: "draft", label: "Drafts" },
  { id: "published", label: "Published" },
  { id: "featured", label: "Featured" },
];

export default function AdminProjectsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  // Query with proper priority sorting (0 = lowest priority)
  const {
    data: rawData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProjectsQuery({
    page,
    limit: 10,
    search: searchTerm,
    status:
      activeTab === "draft"
        ? "draft"
        : activeTab === "published"
          ? "working,completed"
          : activeTab === "featured"
            ? undefined // Featured is handled separately if needed
            : undefined,
    sort: "priority",
    order: "asc", // Lower number = higher priority (1 appears before 2, 0 at bottom)
  });

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateProjectStatusMutation();
  const [updatePriority] = useUpdateProjectPriorityMutation();
  const [toggleFeatured] = useToggleFeaturedMutation();

  const projects = rawData?.data?.data || [];
  const totalPages = rawData?.data?.totalPages || 1;
  const total = rawData?.data?.total || 0;

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [activeTab, searchTerm]);

  // ================= HANDLERS =================

  const handleDelete = async (projectId) => {
    if (!confirm("Delete this project permanently?")) return;

    try {
      await deleteProject(projectId).unwrap();
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Delete failed");
    }
  };

  const handleStatusToggle = async (projectId, current) => {
    const nextStatus =
      current === "draft"
        ? "working"
        : current === "working"
          ? "completed"
          : "draft";

    try {
      await updateStatus({ id: projectId, status: nextStatus }).unwrap();
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Status update failed");
    }
  };

  const handleToggleFeatured = async (projectId) => {
    try {
      await toggleFeatured(projectId).unwrap();
      refetch();
    } catch (err) {
      alert(err?.data?.message || "Failed to update featured");
    }
  };

  // Priority Change Handler (priority 0 = no priority)
  const handlePriorityChange = async (projectId, value) => {
    const priority = Number(value);
    if (isNaN(priority) || priority < 0) return;

    try {
      await updatePriority({
        id: projectId,
        priority,
      }).unwrap();
      // No need to refetch manually — RTK Query invalidates tags automatically
    } catch (err) {
      alert(err?.data?.message || "Priority update failed");
    }
  };

  // ================= UI =================

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">
          Error Loading Projects
        </h1>
        <p className="mt-2 text-gray-600">
          {error?.data?.message || "Could not load projects"}
        </p>
        <button
          onClick={refetch}
          className="mt-6 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
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
            Projects{" "}
            <span className="ml-3 text-lg text-gray-600">({total})</span>
          </h1>
          <p className="text-sm text-gray-500">Manage your portfolio entries</p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} /> New Project
        </Link>
      </header>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex gap-8">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title, category, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 pl-10 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex border border-gray-300 rounded-lg p-1 bg-white">
          <button
            onClick={() => setViewMode("table")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "table"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Table View"
          >
            <TableIcon size={18} />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`px-4 py-2 rounded-md transition-colors ${
              viewMode === "card"
                ? "bg-gray-100 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Card View"
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      {projects.length === 0 ? (
        <EmptyState searchTerm={searchTerm} clear={() => setSearchTerm("")} />
      ) : viewMode === "table" ? (
        <ProjectsTable
          projects={projects}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          onToggleFeatured={handleToggleFeatured}
          onPriorityChange={handlePriorityChange}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      ) : (
        <ProjectsCards
          projects={projects}
          onDelete={handleDelete}
          onStatusToggle={handleStatusToggle}
          onToggleFeatured={handleToggleFeatured}
          isDeleting={isDeleting}
          isUpdating={isUpdating}
        />
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
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

/* ================= Helper Components ================= */

function EmptyState({ searchTerm, clear }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl py-20 text-center">
      <FileText className="mb-4 h-16 w-16 text-gray-300" />
      <h3 className="text-xl font-medium text-gray-700">No projects found</h3>
      <p className="mt-2 text-gray-500">
        {searchTerm
          ? "Try adjusting your search term"
          : "No projects match the current filter"}
      </p>
      {searchTerm && (
        <button
          onClick={clear}
          className="mt-6 text-blue-600 hover:underline font-medium"
        >
          Clear search
        </button>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-xl bg-gray-200" />
        ))}
      </div>
    </div>
  );
}
