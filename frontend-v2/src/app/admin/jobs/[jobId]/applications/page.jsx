// app/admin/jobs/[jobId]/applications/page.jsx
"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import {
  FileText,
  Download,
  CheckCircle,
  XCircle,
  Trash2,
  RefreshCw,
  ArrowLeft,
  Briefcase,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
} from "@/api/rippotaiApi";

export default function JobApplicationsPage() {
  const { jobId } = useParams();
  const router = useRouter();

  const {
    data: rawApplications = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetApplicationsQuery();

  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();
  const [deleteApp, { isLoading: isDeleting }] = useDeleteApplicationMutation();

  // Filter applications for this jobId
  const jobApplications = useMemo(() => {
    let list = Array.isArray(rawApplications)
      ? rawApplications
      : rawApplications?.data || [];

    return list.filter((app) => app.jobId === jobId || app.job === jobId);
  }, [rawApplications, jobId]);

  const handleStatusChange = async (appId, newStatus) => {
    if (!confirm(`Change status to "${newStatus}"?`)) return;

    try {
      await updateStatus({ id: appId, status: newStatus }).unwrap();
      refetch();
    } catch (err) {
      alert(err.data?.message || "Failed to update status");
    }
  };

  const handleDelete = async (appId) => {
    if (!confirm("Delete this application permanently?")) return;

    try {
      await deleteApp(appId).unwrap();
      refetch();
    } catch (err) {
      alert(err.data?.message || "Failed to delete application");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-2">
          Error loading applications
        </h2>
        <p>{error?.data?.message || "Something went wrong"}</p>
        <button
          onClick={refetch}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/admin/jobs"
              className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <ArrowLeft size={18} /> Back to Jobs
            </Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Applications for Job ID: {jobId}
          </h1>
          <p className="mt-1 text-gray-600">
            {jobApplications.length} application
            {jobApplications.length !== 1 ? "s" : ""}
          </p>
        </div>

        <button
          onClick={refetch}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {jobApplications.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-xl p-12 text-center">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">
            No applications yet
          </h3>
          <p className="mt-2 text-gray-600">
            When candidates apply for this position, their applications will
            appear here.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    Applicant
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    Contact
                  </th>
                  <th className="hidden md:table-cell px-6 py-4 text-left font-medium text-gray-700">
                    Applied
                  </th>
                  <th className="px-6 py-4 text-left font-medium text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jobApplications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {app.name || "—"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {app.position}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-gray-700">
                          <Mail size={14} /> {app.email || "—"}
                        </div>
                        {app.phone && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone size={14} /> {app.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                      {app.createdAt
                        ? format(
                            new Date(app.createdAt),
                            "dd MMM yyyy • hh:mm a",
                          )
                        : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          app.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : app.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : app.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {app.status
                          ? app.status.charAt(0).toUpperCase() +
                            app.status.slice(1)
                          : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {app.resume && (
                          <a
                            href={app.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                            title="View Resume"
                          >
                            <Download size={16} />
                          </a>
                        )}

                        <select
                          value={app.status || "pending"}
                          onChange={(e) =>
                            handleStatusChange(app._id, e.target.value)
                          }
                          disabled={isUpdating}
                          className="rounded border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>

                        <button
                          onClick={() => handleDelete(app._id)}
                          disabled={isDeleting}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete Application"
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
        </div>
      )}
    </div>
  );
}
