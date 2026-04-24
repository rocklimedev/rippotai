'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import {
  MessageSquare,
  Search,
  Table as TableIcon,
  LayoutGrid,
  Trash2,
  RefreshCw,
  X,
  Mail,
} from 'lucide-react';
import { useGetQueriesQuery, useDeleteQueryMutation } from '@/api/queriesApi';
import styles from './queries.module.css';

export default function AdminQueriesPage() {
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);

  // ✅ FIXED: Now fetching only for "rippotai" branch
  const {
    data: rawQueries = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetQueriesQuery('rippotai');

  const queries = useMemo(() => {
    let list = Array.isArray(rawQueries) ? rawQueries : rawQueries?.data || [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (q) =>
          q.name?.toLowerCase().includes(term) ||
          q.email?.toLowerCase().includes(term) ||
          q.subject?.toLowerCase().includes(term) ||
          q.message?.toLowerCase().includes(term),
      );
    }

    return list;
  }, [rawQueries, searchTerm]);

  const [deleteQuery, { isLoading: isDeleting }] = useDeleteQueryMutation();

  const handleDelete = async (queryId) => {
    if (!confirm('Delete this inquiry permanently? This cannot be undone.'))
      return;

    try {
      await deleteQuery({ branch: 'rippotai', id: queryId }).unwrap(); // ✅ Fixed
      refetch();
      if (selectedQuery?._id === queryId) setSelectedQuery(null);
    } catch (err) {
      alert(err?.data?.message || 'Failed to delete inquiry');
    }
  };

  const openModal = (query) => setSelectedQuery(query);
  const closeModal = () => setSelectedQuery(null);

  if (isLoading) return <LoadingSkeleton />;

  if (isError) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error?.data?.message || 'Could not load inquiries'}</p>
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
            Rippotai Inquiries
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({queries.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Managing contact form submissions for Rippotai branch
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
          <button
            onClick={() => setViewMode('table')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              viewMode === 'table'
                ? 'bg-gray-200 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <TableIcon size={16} className="inline" />
          </button>
          <button
            onClick={() => setViewMode('card')}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              viewMode === 'card'
                ? 'bg-gray-200 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <LayoutGrid size={16} className="inline" />
          </button>
        </div>
      </div>

      {queries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <MessageSquare className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            No inquiries yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? 'Try changing your search term'
              : 'New messages from the Rippotai contact form will appear here.'}
          </p>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-sm text-blue-600 hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : viewMode === 'table' ? (
        <QueriesTable
          queries={queries}
          onDelete={handleDelete}
          onView={openModal}
          isDeleting={isDeleting}
        />
      ) : (
        <QueriesCards
          queries={queries}
          onDelete={handleDelete}
          onView={openModal}
          isDeleting={isDeleting}
        />
      )}

      {/* Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                Inquiry Details — Rippotai
              </h2>
              <button
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Name
                  </label>
                  <p className="text-gray-900">{selectedQuery.name || '—'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedQuery.email || '—'}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Subject
                  </label>
                  <p className="text-gray-900 font-medium">
                    {selectedQuery.subject || 'No subject'}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Received
                  </label>
                  <p className="text-gray-600">
                    {selectedQuery.createdAt
                      ? format(
                          new Date(selectedQuery.createdAt),
                          'dd MMMM yyyy • hh:mm a',
                        )
                      : '—'}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  Message
                </label>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 whitespace-pre-wrap text-gray-800">
                  {selectedQuery.message || 'No message content'}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDelete(selectedQuery._id);
                  closeModal();
                }}
                disabled={isDeleting}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition flex items-center gap-2"
              >
                {isDeleting ? 'Deleting...' : 'Delete Inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Loading Skeleton (unchanged)
function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 flex gap-4">
        <div className="h-10 w-full max-w-md animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// Table View
function QueriesTable({ queries, onDelete, onView, isDeleting }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="hidden md:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Subject
            </th>
            <th className="hidden lg:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Received
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {queries.map((query) => (
            <tr
              key={query._id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {query.name || '—'}
              </td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-600">
                {query.email || '—'}
              </td>
              <td className="px-4 py-3 text-gray-700 truncate max-w-xs">
                {query.subject || 'No subject'}
              </td>
              <td className="hidden lg:table-cell px-4 py-3 text-gray-600">
                {query.createdAt
                  ? format(new Date(query.createdAt), 'dd MMM yyyy')
                  : '—'}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onView(query)}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="View Details"
                  >
                    <Mail size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(query._id)}
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

// Card View
function QueriesCards({ queries, onDelete, onView, isDeleting }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {queries.map((query) => (
        <div
          key={query._id}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {query.name || 'Anonymous'}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{query.email}</p>
              </div>
              <span className="text-xs text-gray-500">
                {query.createdAt
                  ? format(new Date(query.createdAt), 'dd MMM')
                  : '—'}
              </span>
            </div>

            <h4 className="mt-3 font-medium text-gray-800 truncate">
              {query.subject}
            </h4>

            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {query.message || 'No message content'}
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => onView(query)}
                className="text-blue-600 hover:underline text-sm"
              >
                View Details
              </button>
              <button
                onClick={() => onDelete(query._id)}
                disabled={isDeleting}
                className="text-red-600 hover:underline text-sm disabled:opacity-50"
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
