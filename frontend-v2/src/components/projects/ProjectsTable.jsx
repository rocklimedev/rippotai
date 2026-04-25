'use client';

import { Pencil, MoreVertical, Eye, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStatusColor } from '@/lib/utils';

export default function ProjectsTable({
  projects,
  onDelete,
  onStatusToggle,
  onToggleFeatured,
  onPriorityChange,
  isDeleting,
  isUpdating,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            {/* Priority Column */}
            <th className="px-4 py-3 text-left font-medium text-gray-700 w-20">
              Priority
            </th>

            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Image
            </th>

            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Title
            </th>

            <th className="hidden px-4 py-3 text-left font-medium text-gray-700 md:table-cell">
              Category
            </th>

            <th className="px-4 py-3 text-center font-medium text-gray-700 w-20">
              Featured
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
          {projects.map((project) => {
            const projectId = project.projectId || project._id;

            return (
              <tr
                key={projectId}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Priority Input */}
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min="0"
                    value={project.priority ?? 0}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      // Only update if value actually changed
                      if (Number(newValue) !== project.priority) {
                        onPriorityChange(projectId, newValue);
                      }
                    }}
                    disabled={isUpdating}
                    className={`w-16 border rounded px-3 py-1.5 text-center text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all
                      ${
                        project.priority === 0
                          ? 'bg-gray-50 text-gray-400 border-gray-300'
                          : 'bg-white text-gray-900 border-gray-300'
                      }`}
                    title={
                      project.priority === 0
                        ? '0 = No Priority (shows at bottom)'
                        : ''
                    }
                  />
                  {project.priority === 0 && (
                    <div className="text-[10px] text-gray-400 mt-0.5 text-center">
                      No priority
                    </div>
                  )}
                </td>

                {/* Image */}
                <td className="px-4 py-3">
                  {project.image || project.images?.[0] ? (
                    <div className="h-10 w-16 overflow-hidden rounded-md bg-gray-100">
                      <Image
                        src={project.image || project.images?.[0]}
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

                {/* Title */}
                <td className="px-4 py-3 font-medium text-gray-900">
                  {project.title || '—'}
                </td>

                {/* Category */}
                <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                  {project.category || '—'}
                </td>

                {/* Featured */}
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleFeatured(projectId)}
                    className={`transition-colors ${project.featured ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-400'}`}
                    title={
                      project.featured
                        ? 'Remove from featured'
                        : 'Mark as featured'
                    }
                  >
                    <Star
                      size={20}
                      className={project.featured ? 'fill-current' : ''}
                    />
                  </button>
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                      project.status,
                    )}`}
                  >
                    {project.status || 'unknown'}
                  </span>
                </td>

                {/* Location */}
                <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                  {project.location || '—'}
                </td>

                {/* Actions */}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/projects/${projectId}/edit`}
                      className="rounded p-1.5 hover:bg-gray-100 transition-colors"
                      title="Edit Project"
                    >
                      <Pencil size={16} className="text-gray-600" />
                    </Link>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === projectId ? null : projectId)
                        }
                        className="rounded p-1.5 hover:bg-gray-100 transition-colors"
                      >
                        <MoreVertical size={16} className="text-gray-600" />
                      </button>

                      {openMenu === projectId && (
                        <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-50 py-1">
                          <Link
                            href={`/project/${project.slug}`}
                            target="_blank"
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            <Eye size={14} /> View Public
                          </Link>

                          <button
                            onClick={() => {
                              onDelete(projectId);
                              setOpenMenu(null);
                            }}
                            disabled={isDeleting}
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
