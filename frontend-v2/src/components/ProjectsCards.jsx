import { Pencil, MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStatusColor, getNextStatusLabel } from "@/lib/utils";
export default function ProjectsCards({
  projects,
  onDelete,
  onStatusToggle,
  isDeleting,
  isUpdating,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {projects.map((project) => (
        <div
          key={project.projectId}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          {/* IMAGE */}
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

            {/* STATUS */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
              <span
                className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>

            {/* TOP ACTIONS */}
            <div className="absolute right-2 top-2 flex gap-2">
              {/* EDIT (PENCIL) */}
              <Link
                href={`/admin/projects/${project.projectId}/edit`}
                className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
              >
                <Pencil size={16} />
              </Link>

              {/* THREE DOT MENU */}
              <div className="relative">
                <button
                  onClick={() =>
                    setOpenMenu(
                      openMenu === project.projectId ? null : project.projectId,
                    )
                  }
                  className="rounded-full bg-white/90 p-2 shadow hover:bg-white"
                >
                  <MoreVertical size={16} />
                </button>

                {openMenu === project.projectId && (
                  <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg z-10">
                    <Link
                      href={`/project/${project.slug}`}
                      target="_blank"
                      className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                    >
                      <Eye size={14} /> View
                    </Link>

                    <button
                      onClick={() => {
                        onDelete(project.projectId);
                        setOpenMenu(null);
                      }}
                      disabled={isDeleting || isUpdating}
                      className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-gray-100 disabled:opacity-50"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-4">
            <h3 className="line-clamp-2 font-semibold leading-tight text-gray-900">
              {project.title || "Untitled"}
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              {project.category} • {project.location || "No location"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
