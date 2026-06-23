// app/admin/projects/[projectId]/edit/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  useGetProjectByIdQuery,
  useUpdateProjectMutation,
} from '@/api/projectsApi';
import { ArrowLeft, Upload, X, Loader2, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectPage() {
  const { projectId } = useParams();
  const router = useRouter();

  const {
    data: projectData,
    isLoading: isLoadingProject,
    isError,
    error,
  } = useGetProjectByIdQuery(projectId, { skip: !projectId });

  const project = projectData?.data;
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  // Form state
  const [formValues, setFormValues] = useState({
    title: '',
    category: '',
    description: '',
    details: '',
    moreDetails: '',
    location: '',
    scope: '',
    status: 'draft',
    priority: 0,
    featured: false,
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [bannerImageFile, setBannerImageFile] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const [keptGalleryImages, setKeptGalleryImages] = useState([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Populate form when project loads
  useEffect(() => {
    if (project) {
      setFormValues({
        title: project.title || '',
        category: project.category || '',
        description: project.description || '',
        details: project.details || '',
        moreDetails: project.moreDetails || project.more_details || '', // Support both formats
        location: project.location || '',
        scope: project.scope || '',
        status: project.status || 'draft',
        priority: project.priority ?? 0,
        featured: project.featured ?? false,
      });

      setMainImagePreview(project.image || null);
      setBannerImagePreview(project.banner || null);
      setKeptGalleryImages(project.images || []);

      // Reset file states
      setMainImageFile(null);
      setBannerImageFile(null);
      setNewGalleryFiles([]);
      setNewGalleryPreviews([]);
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Image Handlers
  const handleMainImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setMainImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleBannerImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBannerImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setBannerImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleGallerySelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const previews = [];
    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => previews.push(reader.result);
        reader.readAsDataURL(file);
      }
    });

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
    setErrorMessage('');
    setSuccessMessage('');

    if (!formValues.title.trim()) return setErrorMessage('Title is required');
    if (!formValues.category.trim())
      return setErrorMessage('Category is required');
    if (!formValues.description.trim())
      return setErrorMessage('Description is required');
    if (!formValues.details.trim())
      return setErrorMessage('Details are required');

    try {
      const formData = new FormData();

      Object.entries(formValues).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      if (mainImageFile) formData.append('image', mainImageFile);
      if (bannerImageFile) formData.append('banner', bannerImageFile);

      if (keptGalleryImages.length > 0 || newGalleryFiles.length > 0) {
        formData.append('existingImages', JSON.stringify(keptGalleryImages));
        newGalleryFiles.forEach((file) => formData.append('images', file));
      }

      await updateProject({ projectId, formData }).unwrap();

      setSuccessMessage('Project updated successfully! Redirecting...');
      setTimeout(() => router.push('/admin/projects'), 1500);
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.data?.message || 'Failed to update project');
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
          <p>{error?.data?.message || 'Project not found'}</p>
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
          Updating: <strong>{project.title}</strong>
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Institutional">Institutional</option>
              <option value="Hospitality">Hospitality</option>
              <option value="Renovation">Renovation</option>
              <option value="Landscape">Landscape</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Priority & Featured */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority (Lower number = Higher priority)
            </label>
            <input
              type="number"
              name="priority"
              value={formValues.priority}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              0 = lowest, higher numbers = higher priority
            </p>
          </div>

          <div className="flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formValues.featured}
                onChange={handleChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Featured
              </span>
            </label>
          </div>
        </div>

        {/* Status, Location, Scope */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formValues.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Delhi, India"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2500 sq ft"
            />
          </div>
        </div>

        {/* Description & Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Short Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            value={formValues.details}
            onChange={handleChange}
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        {/* === NEW: More Details Field === */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            More Details / Additional Information
          </label>
          <textarea
            name="moreDetails"
            value={formValues.moreDetails}
            onChange={handleChange}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Additional project information, specifications, materials used, etc."
          />
          <p className="mt-1 text-xs text-gray-500">
            Optional. Use for extended content, technical specifications, or
            long-form description.
          </p>
        </div>
        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner / Hero Image
          </label>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              {bannerImagePreview ? (
                <div className="relative w-full max-w-3xl h-64 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={bannerImagePreview}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                  />
                  {bannerImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setBannerImageFile(null);
                        setBannerImagePreview(project?.banner || null);
                      }}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-600 rounded-full p-2 shadow"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-full max-w-3xl h-64 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                  No banner image
                </div>
              )}
            </div>

            <div>
              <label className="cursor-pointer inline-flex items-center px-5 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200">
                <Upload size={18} className="mr-2" />
                Change Banner Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageSelect}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-xs text-gray-500">
                Recommended: 1920 × 800 px
              </p>
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main / Thumbnail Image
          </label>
          <div className="flex items-start gap-6 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              {mainImagePreview ? (
                <div className="relative w-64 h-48 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={mainImagePreview}
                    alt="Main image"
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
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full p-1.5"
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
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {keptGalleryImages.map((url, index) => (
              <div key={`kept-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={url}
                    alt={`Gallery ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeKeptImage(index)}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {newGalleryPreviews.map((preview, index) => (
              <div key={`new-${index}`} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={preview}
                    alt={`New ${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeNewImage(index)}
                  className="absolute top-1 right-1 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
              <Plus size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 text-center">
                Add more images
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

        {/* Actions */}
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
            className="inline-flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isUpdating ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Saving Changes...
              </>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
