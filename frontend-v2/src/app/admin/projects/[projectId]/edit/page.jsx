// app/admin/projects/[projectId]/edit/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from "@/api/projectsApi";
import { ArrowLeft, Upload, X, Loader2, Trash2, Plus } from "lucide-react";
import Link from "next/link";

export default function EditProjectPage() {
  const { projectId } = useParams();
  const router = useRouter();

  const {
    data: projectData,
    isLoading: isLoadingProject,
    isError,
    error,
  } = useGetProjectByIdQuery(projectId, {
    skip: !projectId,
  });
  const project = projectData?.data;
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Form state
  const [formValues, setFormValues] = useState({
    title: "",
    category: "",
    description: "",
    details: "",
    location: "",
    scope: "",
    status: "draft",
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [keptGalleryImages, setKeptGalleryImages] = useState([]); // existing server URLs to keep
  const [newGalleryFiles, setNewGalleryFiles] = useState([]); // new File objects
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]); // new preview URLs

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Populate form when project loads
  useEffect(() => {
    if (project) {
      setFormValues({
        title: project.title || "",
        category: project.category || "",
        description: project.description || "",
        details: project.details || "",
        location: project.location || "",
        scope: project.scope || "",
        status: project.status || "draft",
      });

      setMainImagePreview(project.image || null);
      setKeptGalleryImages(project.images || []);

      // Reset any pending uploads
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
      setMainImageFile(null);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file");
      return;
    }

    setMainImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setMainImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const previews = [];
    files.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => previews.push(reader.result);
        reader.readAsDataURL(file);
      }
    });

    // Wait briefly for FileReaders (not ideal, but simple)
    setTimeout(() => {
      setNewGalleryPreviews((prev) => [...prev, ...previews]);
      setNewGalleryFiles((prev) => [...prev, ...files]);
    }, 100);
  };

  const removeKeptImage = (index) => {
    setKeptGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index) => {
    setNewGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setNewGalleryFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Basic validation
    if (!formValues.title.trim()) return setErrorMessage("Title is required");
    if (!formValues.category.trim())
      return setErrorMessage("Category is required");
    if (!formValues.description.trim())
      return setErrorMessage("Description is required");
    if (!formValues.details.trim())
      return setErrorMessage("Details are required");

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      // Main image - only if replaced
      if (mainImageFile) {
        formData.append("image", mainImageFile);
      }

      // Gallery: kept existing + new uploads
      if (keptGalleryImages.length > 0 || newGalleryFiles.length > 0) {
        formData.append("existingImages", JSON.stringify(keptGalleryImages));
        newGalleryFiles.forEach((file) => {
          formData.append("images", file);
        });
      }

      // Send update
      await updateProject({ projectId, formData }).unwrap();

      setSuccessMessage("Project updated successfully! Redirecting...");
      setTimeout(() => router.push("/admin/projects"), 1800);
    } catch (err) {
      setErrorMessage(err.data?.message || "Failed to update project");
    }
  };

  if (isLoadingProject) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Loader2 className="inline animate-spin h-8 w-8 text-blue-600" />
        <p className="mt-4 text-gray-600">Loading project data...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 text-red-800 p-6 rounded-lg">
          <h2 className="text-lg font-semibold">Error</h2>
          <p>{error?.data?.message || "Project not found or failed to load"}</p>
          <Link
            href="/admin/projects"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/admin/projects"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Projects
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        <p className="mt-2 text-gray-600">
          Update details for{" "}
          <strong>{project.title || "Untitled Project"}</strong>
        </p>
      </div>

      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formValues.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Industrial">Industrial</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Renovation">Renovation</option>
              <option value="Landscape">Landscape</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Status + Location + Scope */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="draft">Draft</option>
              <option value="working">In Progress</option>
              <option value="completed">Completed</option>
              <option value="prunned">Pruned / Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formValues.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Mumbai, Maharashtra"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Scope / Scale
            </label>
            <input
              type="text"
              name="scope"
              value={formValues.scope}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. 2500 sq ft"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Detailed Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            value={formValues.details}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            required
          />
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main / Cover Image
          </label>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              {mainImagePreview ? (
                <div className="relative w-64 h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={mainImagePreview}
                    alt="Current main image"
                    fill
                    className="object-cover"
                  />
                  {mainImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setMainImageFile(null);
                        setMainImagePreview(project?.image || null);
                      }}
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full p-1.5 shadow-sm"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-64 h-48 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                  No image
                </div>
              )}
            </div>

            <div>
              <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200">
                <Upload size={16} className="mr-2" />
                Change Main Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageSelect}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Leave unchanged to keep current image
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Kept (existing) images */}
            {keptGalleryImages.map((url, index) => (
              <div key={`kept-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeKeptImage(index)}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* New previews */}
            {newGalleryPreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={preview}
                    alt={`New ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 shadow opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            {/* Add button */}
            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
              <Plus size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 text-center">
                Add more
                <br />
                images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallerySelect}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
          <Link
            href="/admin/projects"
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isUpdating}
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
          >
            {isUpdating ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
