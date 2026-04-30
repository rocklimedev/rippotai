'use client';

import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { MessageSquare, Search, Trash2, RefreshCw, Mail } from 'lucide-react';
import { useGetQueriesQuery, useDeleteQueryMutation } from '@/api/queriesApi';
import { useToast } from '@/hooks/use-toast';
import Modal from '@/components/layouts/Modal';
import styles from './queries.module.css';

export default function AdminQueriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedQuery, setSelectedQuery] = useState(null);

  // Delete Modal State
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [queryToDelete, setQueryToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

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

  const [deleteQuery] = useDeleteQueryMutation();

  // Open Delete Modal
  const openDeleteModal = (query) => {
    setQueryToDelete(query);
    setIsDeleteModalOpen(true);
  };

  // Confirm Delete
  const handleDelete = async () => {
    if (!queryToDelete) return;

    setIsDeleting(true);

    try {
      await deleteQuery({
        branch: 'rippotai',
        id: queryToDelete._id,
      }).unwrap();

      toast({
        title: 'Deleted',
        description: `${queryToDelete.name || 'Inquiry'} removed`,
      });

      setIsDeleteModalOpen(false);

      // Close detail modal if the deleted query was open
      if (selectedQuery?._id === queryToDelete._id) {
        setSelectedQuery(null);
      }

      refetch();
    } catch (err) {
      toast({
        title: 'Error',
        description: err?.data?.message || 'Failed to delete inquiry',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
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
    <div className={`${styles.container} min-h-screen bg-gray-50 pb-20`}>
      {/* HEADER */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            Rippotai Inquiries
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({queries.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer inquiries
          </p>
        </div>
      </header>

      {/* SEARCH BAR */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, subject, or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* CONTENT */}
      {queries.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
          <MessageSquare className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-medium text-gray-900">
            No inquiries found
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? 'Try changing the search term'
              : 'No customer inquiries yet.'}
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
      ) : (
        <QueriesTable
          queries={queries}
          onDelete={openDeleteModal}
          onView={openModal}
        />
      )}

      {/* VIEW DETAIL MODAL */}
      {selectedQuery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                Inquiry Details
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {selectedQuery.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {selectedQuery.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Subject</p>
                <p className="font-medium text-gray-900">
                  {selectedQuery.subject || '—'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Message</p>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedQuery.message}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Received</p>
                <p className="text-gray-600">
                  {selectedQuery.createdAt
                    ? format(
                        new Date(selectedQuery.createdAt),
                        'dd MMMM yyyy, hh:mm a',
                      )
                    : '—'}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Inquiry"
        description={`Are you sure you want to delete ${
          queryToDelete?.name || 'this inquiry'
        }? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        variant="destructive"
      />
    </div>
  );
}

// Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 h-10 w-full max-w-md animate-pulse rounded bg-gray-200" />
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-20 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// Table View Only
function QueriesTable({ queries, onDelete, onView }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="hidden md:table-cell px-6 py-4 text-left font-medium text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Subject
            </th>
            <th className="hidden lg:table-cell px-6 py-4 text-left font-medium text-gray-700">
              Received
            </th>
            <th className="px-6 py-4 text-right font-medium text-gray-700">
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
              <td className="px-6 py-4 font-medium text-gray-900">
                {query.name || '—'}
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                {query.email || '—'}
              </td>
              <td className="px-6 py-4 text-gray-700 truncate max-w-xs">
                {query.subject || 'No subject'}
              </td>
              <td className="hidden lg:table-cell px-6 py-4 text-gray-600">
                {query.createdAt
                  ? format(new Date(query.createdAt), 'dd MMM yyyy')
                  : '—'}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onView(query)}
                    className="rounded p-2 hover:bg-gray-100"
                    title="View Details"
                  >
                    <Mail size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(query)}
                    className="rounded p-2 text-red-600 hover:bg-red-50"
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
