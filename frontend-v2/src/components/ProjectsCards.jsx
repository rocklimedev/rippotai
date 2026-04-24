'use client';

import { Pencil, MoreVertical, Eye, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getStatusColor } from '@/lib/utils';

export default function ProjectsCards({
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
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => {
        const projectId = project.projectId || project._id;

        return (
          <div
            key={projectId}
            className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            {/* IMAGE SECTION */}
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

              {/* Featured Button */}
              <button
                onClick={() => onToggleFeatured(projectId)}
                className="absolute left-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow hover:bg-white transition-all"
                title={
                  project.featured ? 'Remove from featured' : 'Mark as featured'
                }
              >
                <Star
                  size={18}
                  className={`transition-colors ${
                    project.featured
                      ? 'text-yellow-500 fill-current'
                      : 'text-gray-400'
                  }`}
                />
              </button>

              {/* Priority Input */}
              <div className="absolute right-3 bottom-3 z-20">
                <input
                  type="number"
                  min="0"
                  value={project.priority ?? 0}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    if (Number(newValue) !== project.priority) {
                      onPriorityChange(projectId, newValue);
                    }
                  }}
                  disabled={isUpdating}
                  className={`w-16 text-xs px-3 py-1 rounded-md border bg-white/90 shadow focus:outline-none focus:ring-1 focus:ring-blue-500 text-center
                    ${
                      project.priority === 0
                        ? 'text-gray-400 border-gray-300'
                        : 'text-gray-900 border-gray-300'
                    }`}
                  title={
                    project.priority === 0
                      ? '0 = No Priority (shows at bottom)'
                      : 'Priority (lower number = higher priority)'
                  }
                />
                {project.priority === 0 && (
                  <div className="text-[10px] text-gray-400 text-center mt-0.5">
                    No priority
                  </div>
                )}
              </div>

              {/* Status Badge */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <span
                  className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    project.status,
                  )}`}
                >
                  {project.status || 'unknown'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-2 top-2 flex gap-2">
                <Link
                  href={`/admin/projects/${projectId}/edit`}
                  className="rounded-full bg-white/90 p-2 shadow hover:bg-white transition-all"
                  title="Edit Project"
                >
                  <Pencil size={16} />
                </Link>

                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenu(openMenu === projectId ? null : projectId)
                    }
                    className="rounded-full bg-white/90 p-2 shadow hover:bg-white transition-all"
                  >
                    <MoreVertical size={16} />
                  </button>

                  {openMenu === projectId && (
                    <div className="absolute right-0 mt-2 w-40 rounded-md border bg-white shadow-lg z-50 py-1 text-sm">
                      <Link
                        href={`/project/${project.slug}`}
                        target="_blank"
                        className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100"
                      >
                        <Eye size={14} /> View Public
                      </Link>

                      <button
                        onClick={() => {
                          onDelete(projectId);
                          setOpenMenu(null);
                        }}
                        disabled={isDeleting}
                        className="flex w-full items-center gap-2 px-4 py-2.5 text-red-600 hover:bg-gray-100 disabled:opacity-50"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-4">
              <h3 className="line-clamp-2 font-semibold leading-tight text-gray-900">
                {project.title || 'Untitled Project'}
              </h3>
              <p className="mt-1 text-xs text-gray-600">
                {project.category || '—'} • {project.location || 'No location'}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
