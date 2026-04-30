'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  useGetApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useGetDashboardStatsQuery,
} from '@/api/applicationsApi';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Modal from '@/components/layouts/Modal';
import styles from './jobs.module.css';

export default function AdminApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // ✅ MODAL STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { toast } = useToast();

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

  // ✅ ERROR TOAST
  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description: error?.data?.message || 'Could not load applications',
        variant: 'destructive',
      });
    }
  }, [isError, error, toast]);

  // FILTER
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

  // ✅ STATUS UPDATE
  const handleStatusChange = async (id, newStatus, name) => {
    try {
      await updateStatus({ id, status: newStatus }).unwrap();

      toast({
        title: 'Status Updated',
        description: `${name} marked as ${newStatus}`,
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update application status',
        variant: 'destructive',
      });
    }
  };

  // ✅ OPEN MODAL
  const openDeleteModal = (app) => {
    setSelectedApp(app);
    setIsModalOpen(true);
  };

  // ✅ DELETE CONFIRM
  const handleDelete = async () => {
    if (!selectedApp) return;

    setIsDeleting(true);

    try {
      await deleteApplication(selectedApp._id).unwrap();

      toast({
        title: 'Application Deleted',
        description: `${selectedApp.name}'s application removed`,
      });

      setIsModalOpen(false);
      setSelectedApp(null);
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete application',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // LOADING
  if (isLoading)
    return (
      <div className={styles.container}>
        <Loader2 className="animate-spin text-gray-500" /> Loading
        applications...
      </div>
    );

  // ERROR UI
  if (isError)
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>{error?.data?.message || 'Could not load applications'}</p>
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
      {/* HEADER */}
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Job Applications
          <span className="ml-3 text-lg font-normal text-gray-600">
            ({filteredApplications.length})
          </span>
        </h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-lg border px-4 py-2"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border px-4 py-2"
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Shortlisted">Shortlisted</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </header>

      {/* TABLE */}
      {filteredApplications.length === 0 ? (
        <div className="text-center p-10 bg-white rounded-xl border">
          No applications found
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-right">Resume</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app._id} className="border-t">
                  <td className="p-3">{app.name}</td>
                  <td className="p-3">{app.email}</td>
                  <td className="p-3">{app.interestedIn}</td>
                  <td className="p-3">{app.phone || '—'}</td>

                  <td className="p-3">
                    {app.createdAt
                      ? format(new Date(app.createdAt), 'dd MMM yyyy')
                      : '—'}
                  </td>

                  <td className="p-3">
                    <select
                      value={app.status || 'Pending'}
                      onChange={(e) =>
                        handleStatusChange(app._id, e.target.value, app.name)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option>Pending</option>
                      <option>Reviewed</option>
                      <option>Shortlisted</option>
                      <option>Rejected</option>
                    </select>
                  </td>

                  <td className="p-3 text-right">
                    {app.resume ? (
                      <a
                        href={app.resume}
                        target="_blank"
                        className="text-blue-600"
                      >
                        View
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => openDeleteModal(app)}
                      className="text-red-600"
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

      {/* ✅ MODAL */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Application"
        description={`Are you sure you want to delete ${
          selectedApp?.name || 'this application'
        }?`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
      />
    </div>
  );
}
