"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetDashboardStatsQuery,
} from "@/api/rippotaiApi";
import { Loader2, RefreshCw } from "lucide-react";
import styles from "./jobs.module.css";

export default function AdminApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch applications with server-side filtering
  const {
    data: applicationsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetApplicationsQuery();

  const [updateStatus] = useUpdateApplicationStatusMutation();
  const [deleteApplication] = useDeleteApplicationMutation();

  const { data: dashboardStats } = useGetDashboardStatsQuery();

  const filteredApplications =
    applicationsData?.applications?.filter((app) => {
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        app.name?.toLowerCase().includes(term) ||
        app.email?.toLowerCase().includes(term) ||
        app.interestedIn?.toLowerCase().includes(term) ||
        app.designation?.toLowerCase().includes(term);

      const matchesStatus = statusFilter ? app.status === statusFilter : true;

      return matchesSearch && matchesStatus;
    }) || [];

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      await deleteApplication(id).unwrap();
    } catch (err) {
      console.error("Failed to delete application:", err);
    }
  };

  if (isLoading)
    return (
      <div className={styles.container}>
        <Loader2 className="animate-spin text-gray-500" /> Loading
        applications...
      </div>
    );

  if (isError)
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error?.data?.message || "Could not load applications"}</p>
        <button
          onClick={refetch}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );

  return (
    <div className={`${styles.container} min-h-screen bg-gray-50 pb-20`}>
      {/* Header & Filters */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Job Applications{" "}
          <span className="ml-3 text-lg font-normal text-gray-600">
            ({filteredApplications.length})
          </span>
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name, email, job..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </header>

      {filteredApplications.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No applications found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm || statusFilter
              ? "Try changing your search or filter"
              : "No applications submitted yet."}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Applied For
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Submitted
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-700">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Resume
                </th>
                <th className="px-4 py-3 text-right font-medium text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredApplications.map((app) => (
                <tr
                  key={app._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {app.name}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{app.email}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {app.interestedIn}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {app.phone || "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {app.createdAt
                      ? format(new Date(app.createdAt), "dd MMM yyyy")
                      : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={app.status || "Pending"}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value)
                      }
                      className="rounded border border-gray-300 px-2 py-1"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-right flex gap-2 justify-end">
                    <button
                      onClick={() => handleDelete(app._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
