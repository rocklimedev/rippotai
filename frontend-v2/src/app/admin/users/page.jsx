// app/admin/users/page.jsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Users,
  Plus,
  Search,
  Table as TableIcon,
  LayoutGrid,
  Trash2,
  Pencil,
  RefreshCw,
  X,
  Loader2,
  AlertCircle,
  Shield,
} from 'lucide-react';
import {
  useGetAllRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetAvailablePermissionsQuery,
} from '@/api/rolesApi';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation,
} from '@/api/usersApi';
import styles from './users.module.css';

export default function AdminUsersPage() {
  const [activeTab, setActiveTab] = useState('users'); // "users" | "roles"
  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');

  // ── User Modal States ──
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userFormData, setUserFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [userFormError, setUserFormError] = useState('');

  // ── Role Modal States ──
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });
  const [roleFormError, setRoleFormError] = useState('');

  // ── Data Fetching ──
  // Users
  const {
    data: rawUsers = [],
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorData,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();

  // Roles
  const {
    data: rolesResponse,
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorData,
    refetch: refetchRoles,
  } = useGetAllRolesQuery();
  const roles = Array.isArray(rolesResponse?.data) ? rolesResponse.data : [];

  // Available permissions for role form
  const { data: permissionsResponse, isLoading: permsLoading } =
    useGetAvailablePermissionsQuery();
  const availablePermissions = Array.isArray(permissionsResponse?.data)
    ? permissionsResponse.data
    : [];

  const [createUser, { isLoading: isCreatingUser }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();

  const [createRole, { isLoading: isCreatingRole }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdatingRole }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeletingRole }] = useDeleteRoleMutation();

  // ── Filtered Users ──
  const users = useMemo(() => {
    let list = Array.isArray(rawUsers) ? rawUsers : rawUsers?.data || [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.role?.toLowerCase().includes(term),
      );
    }

    return list;
  }, [rawUsers, searchTerm]);

  // ── User Form Helpers ──
  useEffect(() => {
    if (roles.length > 0 && !userFormData.role) {
      setUserFormData((prev) => ({ ...prev, role: roles[0].name || '' }));
    }
  }, [roles, userFormData.role]);

  useEffect(() => {
    if (isCreateUserModalOpen) {
      setUserFormData({
        name: '',
        email: '',
        password: '',
        role: roles.length > 0 ? roles[0].name || '' : '',
      });
      setUserFormError('');
    }
  }, [isCreateUserModalOpen, roles]);

  useEffect(() => {
    if (isEditUserModalOpen && editingUser) {
      setUserFormData({
        name: editingUser.name || '',
        email: editingUser.email || '',
        password: '',
        role: editingUser.role || (roles.length > 0 ? roles[0].name || '' : ''),
      });
      setUserFormError('');
    }
  }, [isEditUserModalOpen, editingUser, roles]);

  const handleDeleteUser = async (userId) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await deleteUser(userId).unwrap();
      refetchUsers();
    } catch (err) {
      alert(err.data?.message || 'Delete failed');
    }
  };

  const openEditUserModal = (user) => {
    setEditingUser(user);
    setIsEditUserModalOpen(true);
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
    setUserFormError('');
  };

  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setUserFormError('');

    if (!userFormData.name.trim()) return setUserFormError('Name is required');
    if (!userFormData.email.trim())
      return setUserFormError('Email is required');
    if (isCreateUserModalOpen && !userFormData.password.trim())
      return setUserFormError('Password is required for new users');
    if (!userFormData.role) return setUserFormError('Role is required');

    try {
      if (isEditUserModalOpen && editingUser) {
        const payload = { ...userFormData };
        if (!payload.password?.trim()) delete payload.password;
        await updateUser({ id: editingUser._id, ...payload }).unwrap();
        alert('User updated successfully!');
        setIsEditUserModalOpen(false);
        setEditingUser(null);
      } else {
        await createUser(userFormData).unwrap();
        alert('User created successfully!');
        setIsCreateUserModalOpen(false);
      }
      refetchUsers();
    } catch (err) {
      setUserFormError(err.data?.message || 'Failed to save user');
    }
  };

  // ── Role Form Helpers ──
  useEffect(() => {
    if (isCreateRoleModalOpen) {
      setRoleFormData({
        name: '',
        description: '',
        permissions: [],
      });
      setRoleFormError('');
    }
  }, [isCreateRoleModalOpen]);

  useEffect(() => {
    if (isEditRoleModalOpen && editingRole) {
      setRoleFormData({
        name: editingRole.name || '',
        description: editingRole.description || '',
        permissions: editingRole.permissions || [],
      });
      setRoleFormError('');
    }
  }, [isEditRoleModalOpen, editingRole]);

  const openEditRoleModal = (role) => {
    setEditingRole(role);
    setIsEditRoleModalOpen(true);
  };

  const handleRoleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleFormData((prev) => ({ ...prev, [name]: value }));
    setRoleFormError('');
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
    setRoleFormError('');
  };

  const handleSubmitRole = async (e) => {
    e.preventDefault();
    setRoleFormError('');

    if (!roleFormData.name.trim())
      return setRoleFormError('Role name is required');

    try {
      if (isEditRoleModalOpen && editingRole) {
        await updateRole({
          id: editingRole._id,
          ...roleFormData,
        }).unwrap();
        alert('Role updated successfully!');
        setIsEditRoleModalOpen(false);
        setEditingRole(null);
      } else {
        await createRole(roleFormData).unwrap();
        alert('Role created successfully!');
        setIsCreateRoleModalOpen(false);
      }
      refetchRoles();
    } catch (err) {
      setRoleFormError(err.data?.message || 'Failed to save role');
    }
  };

  const handleDeleteRole = async (roleId) => {
    if (!confirm('Delete this role? Users assigned to it will lose it.'))
      return;
    try {
      await deleteRole(roleId).unwrap();
      refetchRoles();
    } catch (err) {
      alert(err.data?.message || 'Delete failed');
    }
  };

  // ── Loading & Error States ──
  if (usersLoading || rolesLoading) {
    return <LoadingSkeleton />;
  }

  if (usersError || rolesError) {
    return (
      <div className={styles.container}>
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p>
          {usersError?.data?.message ||
            rolesError?.data?.message ||
            'Could not load data'}
        </p>
        <button
          onClick={() => {
            refetchUsers();
            refetchRoles();
          }}
          className="mt-4 flex items-center gap-2 text-blue-600 hover:underline"
        >
          <RefreshCw size={16} /> Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.container} min-h-screen bg-gray-50 pb-20`}>
      {/* Header */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {activeTab === 'users' ? 'Users' : 'Roles'}
            <span className="ml-3 text-lg font-normal text-gray-600">
              ({activeTab === 'users' ? users.length : roles.length})
            </span>
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {activeTab === 'users'
              ? 'Manage admin users and permissions'
              : 'Manage roles and permissions'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeTab === 'users' ? (
            <button
              onClick={() => setIsCreateUserModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} /> Add User
            </button>
          ) : (
            <button
              onClick={() => setIsCreateRoleModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} /> Add Role
            </button>
          )}
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === 'users'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`pb-4 text-sm font-medium transition-colors ${
              activeTab === 'roles'
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Roles
          </button>
        </div>
      </div>

      {/* Search & View Toggle (only for users tab for now) */}
      {activeTab === 'users' && (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white p-1">
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                viewMode === 'table'
                  ? 'bg-gray-200 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <TableIcon size={16} className="inline" />
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                viewMode === 'card'
                  ? 'bg-gray-200 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid size={16} className="inline" />
            </button>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'users' ? (
        users.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Users className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm ? 'Try changing search term' : 'Add your first user.'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-sm text-blue-600 hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : viewMode === 'table' ? (
          <UsersTable
            users={users}
            onDelete={handleDeleteUser}
            onEdit={openEditUserModal}
            isDeleting={isDeletingUser}
          />
        ) : (
          <UsersCards
            users={users}
            onDelete={handleDeleteUser}
            onEdit={openEditUserModal}
            isDeleting={isDeletingUser}
          />
        )
      ) : (
        <RolesTable
          roles={roles}
          onEdit={openEditRoleModal}
          onDelete={handleDeleteRole}
          isDeleting={isDeletingRole}
        />
      )}

      {/* ── User Create/Edit Modal ── */}
      {(isCreateUserModalOpen || isEditUserModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditUserModalOpen ? 'Edit User' : 'Add New User'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateUserModalOpen(false);
                  setIsEditUserModalOpen(false);
                  setEditingUser(null);
                  setUserFormError('');
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitUser} className="p-6 space-y-6">
              {userFormError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <p>{userFormError}</p>
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
                  onChange={handleUserInputChange}
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
                  onChange={handleUserInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. john@example.com"
                  disabled={isEditUserModalOpen}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isEditUserModalOpen ? 'New Password (optional)' : 'Password'}{' '}
                  {!isEditUserModalOpen && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <input
                  type="password"
                  name="password"
                  value={userFormData.password}
                  onChange={handleUserInputChange}
                  required={!isEditUserModalOpen}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={
                    isEditUserModalOpen
                      ? 'Leave blank to keep current'
                      : '••••••••'
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                {rolesLoading ? (
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" /> Loading
                    roles...
                  </div>
                ) : roles.length === 0 ? (
                  <div className="text-sm text-gray-500">
                    No roles available
                  </div>
                ) : (
                  <select
                    name="role"
                    value={userFormData.role}
                    onChange={handleUserInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                  >
                    {roles.map((role) => (
                      <option key={role._id || role.name} value={role.name}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreateUserModalOpen(false);
                    setIsEditUserModalOpen(false);
                    setEditingUser(null);
                    setUserFormError('');
                  }}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingUser || isUpdatingUser}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {isCreatingUser || isUpdatingUser ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {isEditUserModalOpen ? 'Updating...' : 'Creating...'}
                    </>
                  ) : isEditUserModalOpen ? (
                    'Update User'
                  ) : (
                    'Create User'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Role Create/Edit Modal ── */}
      {(isCreateRoleModalOpen || isEditRoleModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-xl font-bold text-gray-900">
                {isEditRoleModalOpen ? 'Edit Role' : 'Create New Role'}
              </h2>
              <button
                onClick={() => {
                  setIsCreateRoleModalOpen(false);
                  setIsEditRoleModalOpen(false);
                  setEditingRole(null);
                  setRoleFormError('');
                }}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleSubmitRole} className="p-6 space-y-6">
              {roleFormError && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <p>{roleFormError}</p>
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
                  onChange={handleRoleInputChange}
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
                  onChange={handleRoleInputChange}
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
                      <label key={perm} className="flex items-center gap-2">
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
                  onClick={() => {
                    setIsCreateRoleModalOpen(false);
                    setIsEditRoleModalOpen(false);
                    setEditingRole(null);
                    setRoleFormError('');
                  }}
                  className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingRole || isUpdatingRole}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center gap-2"
                >
                  {isCreatingRole || isUpdatingRole ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      {isEditRoleModalOpen ? 'Updating...' : 'Creating...'}
                    </>
                  ) : isEditRoleModalOpen ? (
                    'Update Role'
                  ) : (
                    'Create Role'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────── Loading Skeleton
function LoadingSkeleton() {
  return (
    <div className={styles.container}>
      <div className="mb-8 h-10 w-64 animate-pulse rounded bg-gray-200" />
      <div className="mb-6 flex gap-4">
        <div className="h-10 w-full max-w-md animate-pulse rounded bg-gray-200" />
      </div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-200" />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────── UsersTable
function UsersTable({ users, onDelete, onEdit, isDeleting }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-3 text-left font-medium text-gray-700">
              Role
            </th>
            <th className="hidden md:table-cell px-4 py-3 text-left font-medium text-gray-700">
              Joined
            </th>
            <th className="px-4 py-3 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user._id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-900">
                {user.name || '—'}
              </td>
              <td className="px-4 py-3 text-gray-600">{user.email || '—'}</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                    user.role === 'Admin'
                      ? 'bg-purple-100 text-purple-800'
                      : user.role === 'HR'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role || 'Unknown'}
                </span>
              </td>
              <td className="hidden md:table-cell px-4 py-3 text-gray-600">
                {user.createdAt
                  ? format(new Date(user.createdAt), 'dd MMM yyyy')
                  : '—'}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    disabled={isDeleting}
                    className="rounded p-1.5 text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ────────────────────────────────────────────── UsersCards
function UsersCards({ users, onDelete, onEdit, isDeleting }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((user) => (
        <div
          key={user._id}
          className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <div className="p-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                {user.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {user.name || 'Unnamed'}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <span
                className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full ${
                  user.role === 'Admin'
                    ? 'bg-purple-100 text-purple-800'
                    : user.role === 'HR'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {user.role || 'Unknown'}
              </span>
              {user.createdAt && (
                <span className="text-xs text-gray-500">
                  Joined {format(new Date(user.createdAt), 'MMM yyyy')}
                </span>
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onEdit(user)}
                className="flex-1 rounded border border-gray-300 px-4 py-2 text-center text-sm hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user._id)}
                disabled={isDeleting}
                className="flex-1 rounded border border-red-300 px-4 py-2 text-center text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ────────────────────────────────────────────── RolesTable
function RolesTable({ roles, onEdit, onDelete, isDeleting }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Role Name
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Description
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Permissions
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {roles.map((role) => (
            <tr key={role._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-900">
                {role.name}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {role.description || '—'}
              </td>
              <td className="px-6 py-4 text-gray-600">
                {role.permissions?.length || 0} permissions
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(role)}
                    className="rounded p-1.5 hover:bg-gray-100"
                    title="Edit Role"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(role._id)}
                    disabled={isDeleting}
                    className="rounded p-1.5 text-red-600 hover:bg-red-50"
                    title="Delete Role"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
