// app/admin/projects/new/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCreateProjectMutation } from '@/api/projectsApi';
import { Plus, X, Upload, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  const router = useRouter();
  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  // Form state with Priority & Featured
  const [formData, setFormData] = useState({
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

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryPreviews, setGalleryPreviews] = useState([]);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'priority'
            ? parseInt(value) || 0
            : value,
    }));
  };

  // Main Image Handler
  const handleMainImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    setMainImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setMainImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Banner Image Handler
  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }
    setBannerImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setBannerImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  // Gallery Handler
  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews = [];
    const validFiles = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        validFiles.push(file);
        const reader = new FileReader();
        reader.onloadend = () => newPreviews.push(reader.result);
        reader.readAsDataURL(file);
      }
    });

    setTimeout(() => {
      setGalleryPreviews((prev) => [...prev, ...newPreviews]);
      setGalleryImages((prev) => [...prev, ...validFiles]);
    }, 100);
  };

  const removeGalleryImage = (index) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.title.trim()) return setError('Project title is required');
    if (!formData.category.trim()) return setError('Category is required');
    if (!formData.description.trim())
      return setError('Short description is required');
    if (!formData.details.trim())
      return setError('Detailed content is required');
    if (!mainImage) return setError('Main project image is required');
    if (!bannerImage) return setError('Banner image is required');

    try {
      const formDataToSend = new FormData();

      // Append all form fields
      formDataToSend.append('title', formData.title.trim());
      formDataToSend.append('category', formData.category.trim());
      formDataToSend.append('description', formData.description.trim());
      formDataToSend.append('details', formData.details.trim());
      formDataToSend.append('moreDetails', formData.moreDetails.trim()); // ← New
      formDataToSend.append('status', formData.status);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('featured', formData.featured);

      if (formData.location?.trim())
        formDataToSend.append('location', formData.location.trim());
      if (formData.scope?.trim())
        formDataToSend.append('scope', formData.scope.trim());

      // Files
      formDataToSend.append('image', mainImage);
      formDataToSend.append('banner', bannerImage);

      galleryImages.forEach((file) => {
        formDataToSend.append('images', file);
      });

      await createProject(formDataToSend).unwrap();

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/projects');
      }, 1500);
    } catch (err) {
      console.error('Create project error:', err);
      setError(
        err?.data?.message || 'Failed to create project. Please try again.',
      );
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-2 text-gray-600">
          Add a new portfolio entry to showcase your work.
        </p>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
          Project created successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
          {error}
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
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Modern Office Renovation"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
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
              value={formData.priority}
              onChange={handleInputChange}
              min="0"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              0 = lowest, higher numbers appear first
            </p>
          </div>

          <div className="flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleInputChange}
                className="w-5 h-5 accent-blue-600"
              />
              <span className="text-sm font-medium text-gray-700">
                Mark as Featured Project
              </span>
            </label>
          </div>
        </div>

        {/* Status, Location, Scope */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="draft">Draft (not visible)</option>
              <option value="working">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
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
              value={formData.scope}
              onChange={handleInputChange}
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
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Brief overview..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Content <span className="text-red-500">*</span>
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleInputChange}
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Full project description..."
            required
          />
        </div>
        {/* ==================== NEW FIELD ==================== */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            More Details / Specifications
          </label>
          <textarea
            name="moreDetails"
            value={formData.moreDetails}
            onChange={handleInputChange}
            rows={6}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Technical specifications, materials used, dimensions, client feedback, awards, etc."
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional: Extra information that doesn't fit in the main description
          </p>
        </div>
        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Banner / Hero Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              {bannerImagePreview ? (
                <div className="relative w-full max-w-2xl h-64 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={bannerImagePreview}
                    alt="Banner preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setBannerImage(null);
                      setBannerImagePreview(null);
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white text-red-600 rounded-full p-2 shadow"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full max-w-2xl h-64 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 cursor-pointer transition">
                  <Upload size={40} className="text-gray-400 mb-3" />
                  <span className="text-lg font-medium text-gray-600">
                    Upload Banner Image
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    Recommended: 1920 × 800 px
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Project Image (Thumbnail){' '}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-6">
            <div className="flex-1">
              {mainImagePreview ? (
                <div className="relative w-80 h-52 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={mainImagePreview}
                    alt="Main preview"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setMainImage(null);
                      setMainImagePreview(null);
                    }}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-600 rounded-full p-1.5"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-80 h-52 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
                  <Upload size={32} className="text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    Upload main image
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gallery Images (optional)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {galleryPreviews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                  <Image
                    src={preview}
                    alt={`Gallery ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGalleryImage(index)}
                  className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-600 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition"
                >
                  <X size={14} />
                </button>
              </div>
            ))}

            <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer">
              <Plus size={24} className="text-gray-400 mb-1" />
              <span className="text-xs text-gray-500 text-center">
                Add more images
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="pt-6 border-t border-gray-200 flex justify-end gap-4">
          <Link
            href="/admin/projects"
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isCreating}
            className="inline-flex items-center px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                Creating Project...
              </>
            ) : (
              'Create Project'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
