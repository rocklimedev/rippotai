// app/admin/users/page.jsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  Users,
  Plus,
  Search,
  Table as TableIcon,
  LayoutGrid,
  Trash2,
  Pencil,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { useGetAllUsersQuery, useDeleteUserMutation } from "@/api/rippotaiApi";
import styles from "./users.module.css"; // create this or reuse projects.module.css

const ROLE_LABELS = {
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

export default function AdminUsersPage() {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: rawUsers = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAllUsersQuery();

  const users = useMemo(() => {
    let list = Array.isArray(rawUsers) ? rawUsers : rawUsers?.data || [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.role?.toLowerCase().includes(term),
      );
    }

    return list;
  }, [rawUsers, searchTerm]);

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleDelete = async (userId) => {
    if (!confirm("Delete this user permanently? This cannot be undone."))
      return;
    try {
      await deleteUser(userId).unwrap();
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
        <p>{error?.data?.message || "Could not load users"}</p>
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
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Users
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({users.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage admin users and permissions
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/users/new"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <Plus size={16} /> Add User
          </Link>
        </div>
      </header>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
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

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <Users className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">No users found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm ? "Try changing search term" : "Add your first user."}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : viewMode === "table" ? (
        <UsersTable
          users={users}
          onDelete={handleDelete}
          isDeleting={isDeleting}
        />
      ) : (
        <UsersCards
          users={users}
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
function UsersTable({ users, onDelete, isDeleting }) {
  return (
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
              Role
            </th>
            <th className="hidden md:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Joined
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user._id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {user.name || "—"}
              </td>
              <td className="px-4 py-3 text-gray-600">{user.email || "—"}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {ROLE_LABELS[user.role] || user.role || "Unknown"}
                </span>
              </td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-600">
                {user.createdAt
                  ? format(new Date(user.createdAt), "dd MMM yyyy")
                  : "—"}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/users/${user._id}/edit`}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </Link>
                  <button
                    onClick={() => onDelete(user._id)}
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

// ────────────────────────────────────────────── Cards
function UsersCards({ users, onDelete, isDeleting }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {user.name?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {user.name || "Unnamed"}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  user.role === "admin"
                    ? "bg-purple-100 text-purple-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {ROLE_LABELS[user.role] || user.role}
              </span>
              {user.createdAt && (
                <span className="text-xs text-gray-500">
                  Joined {format(new Date(user.createdAt), "MMM yyyy")}
                </span>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/admin/users/${user._id}/edit`}
                className="flex-1 rounded border border-gray-300 px-4 py-2 text-center text-sm hover:bg-gray-50"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(user._id)}
                disabled={isDeleting}
                className="flex-1 rounded border border-red-300 px-4 py-2 text-center text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
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
