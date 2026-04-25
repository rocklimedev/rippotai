// app/admin/users/RoleFormModal.jsx
'use client';

import { X, Loader2, AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function RoleFormModal({
  isOpen,
  onClose,
  isEdit = false,
  editingRole = null,
  roleFormData,
  setRoleFormData,
  onSubmit,
  error,
  isLoading,
  availablePermissions = [],
  permsLoading,
}) {
  useEffect(() => {
    if (!isOpen) return;

    if (isEdit && editingRole) {
      setRoleFormData({
        name: editingRole.name || '',
        description: editingRole.description || '',
        permissions: editingRole.permissions || [],
      });
    } else {
      setRoleFormData({
        name: '',
        description: '',
        permissions: [],
      });
    }
  }, [isOpen, isEdit, editingRole, setRoleFormData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permission) => {
    setRoleFormData((prev) => {
      const current = prev.permissions || [];
      if (current.includes(permission)) {
        return {
          ...prev,
          permissions: current.filter((p) => p !== permission),
        };
      }
      return { ...prev, permissions: [...current, permission] };
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? 'Edit Role' : 'Create New Role'}
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
              Role Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={roleFormData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Project Manager"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={roleFormData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Brief description of this role's responsibilities..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {permsLoading ? (
                <div className="col-span-2 text-sm text-gray-500 flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" /> Loading
                  permissions...
                </div>
              ) : availablePermissions.length === 0 ? (
                <div className="col-span-2 text-sm text-gray-500">
                  No permissions available
                </div>
              ) : (
                availablePermissions.map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={roleFormData.permissions?.includes(perm)}
                      onChange={() => handlePermissionToggle(perm)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{perm}</span>
                  </label>
                ))
              )}
            </div>
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
                'Update Role'
              ) : (
                'Create Role'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
