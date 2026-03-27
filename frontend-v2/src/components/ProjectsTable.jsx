import { Pencil, MoreVertical, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { getStatusColor, getNextStatusLabel } from "@/lib/utils";
export default function ProjectsTable({
  projects,
  onDelete,
  onStatusToggle,
  isDeleting,
  isUpdating,
}) {
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Image
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Title
            </th>
            <th className="hidden px-4 py-3 text-left font-medium text-gray-700 md:table-cell">
              Category
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
          {projects.map((project) => (
            <tr
              key={project.projectId}
              className="group hover:bg-gray-50 transition-colors"
            >
              {/* IMAGE */}
              <td className="px-4 py-3">
                {project.image || project.images?.[0] ? (
                  <div className="h-10 w-16 overflow-hidden rounded-md bg-gray-100">
                    <Image
                      src={project.image || project.images[0]}
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

              {/* TITLE */}
              <td className="px-4 py-3 font-medium text-gray-900">
                {project.title || "—"}
              </td>

              {/* CATEGORY */}
              <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                {project.category || "—"}
              </td>

              {/* STATUS */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(
                    project.status,
                  )}`}
                >
                  {project.status || "unknown"}
                </span>
              </td>

              {/* LOCATION */}
              <td className="hidden px-4 py-3 md:table-cell text-gray-600">
                {project.location || "—"}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  {/* EDIT */}
                  <Link
                    href={`/admin/projects/${project.projectId}/edit`}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </Link>

                  {/* DROPDOWN */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === project.projectId
                            ? null
                            : project.projectId,
                        )
                      }
                      className="rounded p-1.5 hover:bg-gray-100"
                    >
                      <MoreVertical size={16} className="text-gray-600" />
                    </button>

                    {openMenu === project.projectId && (
                      <div className="absolute right-0 mt-2 w-32 rounded-md border bg-white shadow-lg z-10">
                        {/* VIEW */}
                        <Link
                          href={`/project/${project.slug}`}
                          target="_blank"
                          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          <Eye size={14} /> View
                        </Link>

                        {/* DELETE */}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
