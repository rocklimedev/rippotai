// app/admin/users/UserFormModal.jsx
'use client';

import { X, Loader2, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function UserFormModal({
  isOpen,
  onClose,
  isEdit = false,
  editingUser = null,
  userFormData,
  setUserFormData,
  onSubmit,
  error,
  isLoading,
  roles = [],
  rolesLoading,
}) {
  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && editingUser) {
      setUserFormData({
        name: editingUser.name || '',
        email: editingUser.email || '',
        password: '',
        role:
          editingUser.role?.name ||
          (roles.length > 0 ? roles[0].name || '' : ''),
      });
    } else {
      setUserFormData({
        name: '',
        email: '',
        password: '',
        role: roles.length > 0 ? roles[0].name || '' : '',
      });
    }
  }, [isOpen, isEdit, editingUser, roles, setUserFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Edit User' : 'Add New User'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={userFormData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={userFormData.email}
              onChange={handleInputChange}
              required
              disabled={isEdit}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
              placeholder="e.g. john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {isEdit ? 'New Password (optional)' : 'Password'}{' '}
              {!isEdit && <span className="text-red-500">*</span>}
            </label>
            <input
              type="password"
              name="password"
              value={userFormData.password}
              onChange={handleInputChange}
              required={!isEdit}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={isEdit ? 'Leave blank to keep current' : '••••••••'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role <span className="text-red-500">*</span>
            </label>
            {rolesLoading ? (
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" /> Loading roles...
              </div>
            ) : roles.length === 0 ? (
              <div className="text-sm text-gray-500">No roles available</div>
            ) : (
              <select
                name="role"
                value={userFormData.role}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
              >
                {roles.map((role) => (
                  <option key={role.id || role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : isEdit ? (
                'Update User'
              ) : (
                'Create User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
