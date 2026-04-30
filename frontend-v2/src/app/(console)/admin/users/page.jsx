// app/admin/users/page.jsx
'use client';

import { useState, useMemo, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Users,
  Plus,
  Search,
  Trash2,
  Pencil,
  RefreshCw,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import UserFormModal from '@/components/users/UserFormModal';
import RoleFormModal from '@/components/users/RoleFormModal';
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
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  // User Form State
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

  // Role Form State
  const [isCreateRoleModalOpen, setIsCreateRoleModalOpen] = useState(false);
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [roleFormData, setRoleFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });
  const [roleFormError, setRoleFormError] = useState('');

  // Data Fetching
  const {
    data: rawUsers = [],
    isLoading: usersLoading,
    isError: usersError,
    refetch: refetchUsers,
  } = useGetAllUsersQuery();

  const {
    data: rolesResponse,
    isLoading: rolesLoading,
    isError: rolesError,
    refetch: refetchRoles,
  } = useGetAllRolesQuery();
  const roles = Array.isArray(rolesResponse?.data) ? rolesResponse.data : [];

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

  // Filtered Users
  const users = useMemo(() => {
    let list = Array.isArray(rawUsers) ? rawUsers : rawUsers?.data || [];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (u) =>
          u.name?.toLowerCase().includes(term) ||
          u.email?.toLowerCase().includes(term) ||
          u.role?.name?.toLowerCase().includes(term),
      );
    }
    return list;
  }, [rawUsers, searchTerm]);

  // Handlers
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

  const closeUserModal = () => {
    setIsCreateUserModalOpen(false);
    setIsEditUserModalOpen(false);
    setEditingUser(null);
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
        await updateUser({
          id: editingUser.id || editingUser._id,
          ...payload,
        }).unwrap();
        alert('User updated successfully!');
        closeUserModal();
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

  const openEditRoleModal = (role) => {
    setEditingRole(role);
    setIsEditRoleModalOpen(true);
  };

  const closeRoleModal = () => {
    setIsCreateRoleModalOpen(false);
    setIsEditRoleModalOpen(false);
    setEditingRole(null);
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
          id: editingRole._id || editingRole.id,
          ...roleFormData,
        }).unwrap();
        alert('Role updated successfully!');
        closeRoleModal();
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

  // Loading & Error States
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

      {/* Search Bar */}
      {activeTab === 'users' && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 py-2.5 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'users' ? (
        users.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white p-12 text-center">
            <Users className="mb-4 h-12 w-12 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-2 text-sm text-gray-500">
              {searchTerm
                ? 'Try changing the search term'
                : 'Add your first user.'}
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
        ) : (
          <UsersTable
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

      {/* Modals */}
      <UserFormModal
        isOpen={isCreateUserModalOpen || isEditUserModalOpen}
        onClose={closeUserModal}
        isEdit={isEditUserModalOpen}
        editingUser={editingUser}
        userFormData={userFormData}
        setUserFormData={setUserFormData}
        onSubmit={handleSubmitUser}
        error={userFormError}
        isLoading={isCreatingUser || isUpdatingUser}
        roles={roles}
        rolesLoading={rolesLoading}
      />

      <RoleFormModal
        isOpen={isCreateRoleModalOpen || isEditRoleModalOpen}
        onClose={closeRoleModal}
        isEdit={isEditRoleModalOpen}
        editingRole={editingRole}
        roleFormData={roleFormData}
        setRoleFormData={setRoleFormData}
        onSubmit={handleSubmitRole}
        error={roleFormError}
        isLoading={isCreatingRole || isUpdatingRole}
        availablePermissions={availablePermissions}
        permsLoading={permsLoading}
      />
    </div>
  );
}

// Loading Skeleton (unchanged)
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

// UsersTable & RolesTable (same as before - kept for brevity)
function UsersTable({ users, onDelete, onEdit, isDeleting }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Name
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Email
            </th>
            <th className="px-6 py-4 text-left font-medium text-gray-700">
              Role
            </th>
            <th className="hidden md:table-cell px-6 py-4 text-left font-medium text-gray-700">
              Joined
            </th>
            <th className="px-6 py-4 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {users.map((user) => (
            <tr
              key={user.id || user._id}
              className="group hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 font-medium text-gray-900">
                {user.name || '—'}
              </td>
              <td className="px-6 py-4 text-gray-600">{user.email || '—'}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                    user.role?.name === 'Admin'
                      ? 'bg-purple-100 text-purple-800'
                      : user.role?.name === 'HR'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {user.role?.name || 'Unknown'}
                </span>
              </td>
              <td className="hidden md:table-cell px-6 py-4 text-gray-600">
                {user.createdAt
                  ? format(new Date(user.createdAt), 'dd MMM yyyy')
                  : '—'}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded p-2 hover:bg-gray-100"
                    title="Edit"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id || user._id)}
                    disabled={isDeleting}
                    className="rounded p-2 text-red-600 hover:bg-red-50"
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
            <th className="px-6 py-4 text-right font-medium text-gray-700">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {roles.map((role) => (
            <tr
              key={role.id || role._id}
              className="hover:bg-gray-50 transition-colors"
            >
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
                    className="rounded p-2 hover:bg-gray-100"
                    title="Edit Role"
                  >
                    <Pencil size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={() => onDelete(role.id || role._id)}
                    disabled={isDeleting}
                    className="rounded p-2 text-red-600 hover:bg-red-50"
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
