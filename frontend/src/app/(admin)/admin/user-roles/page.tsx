"use client";

import { useMemo, useState } from "react";

import { Eye, Pencil, Plus, Shield, UserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAssignRolesMutation, useGetAllUsersQuery, type User } from "@/api/usersApi";

import { useGetAllRolesQuery, type Role } from "@/api/rolesApi";

import { UserModal } from "@/components/admin/UserModal";
import { RoleModal } from "@/components/admin/RoleModal";

type UserModalMode = "view" | "create" | "edit";
type RoleModalMode = "view" | "create" | "edit";

export default function UserRolesPage() {
  const { data: users = [], isLoading: usersLoading, isError: usersError } = useGetAllUsersQuery();

  const { data: roles = [], isLoading: rolesLoading, isError: rolesError } = useGetAllRolesQuery();

  const [assignRoles, { isLoading: isAssigning }] = useAssignRolesMutation();

  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userModalMode, setUserModalMode] = useState<UserModalMode>("view");
  const [modalUser, setModalUser] = useState<User | null>(null);

  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState<RoleModalMode>("view");
  const [modalRole, setModalRole] = useState<Role | null>(null);

  const selectedUser = useMemo(() => users.find((user) => user.id === selectedUserId) ?? null, [users, selectedUserId]);

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return users;
    }

    return users.filter((user) => {
      return user.name?.toLowerCase().includes(value) || user.email.toLowerCase().includes(value);
    });
  }, [users, search]);

  function getUserRoles(user: User): string[] {
    if (Array.isArray(user.roles)) {
      return user.roles;
    }

    if (typeof user.role === "string") {
      return [user.role];
    }

    if (user.role?.name) {
      return [user.role.name];
    }

    return [];
  }

  function handleSelectUser(user: User) {
    setSelectedUserId(user.id);
    setSelectedRoles(getUserRoles(user));
  }

  function toggleRole(roleName: string) {
    setSelectedRoles((current) => {
      if (current.includes(roleName)) {
        return current.filter((role) => role !== roleName);
      }

      return [...current, roleName];
    });
  }

  async function handleSaveRoles() {
    if (!selectedUserId) {
      return;
    }

    try {
      await assignRoles({
        id: selectedUserId,
        roles: selectedRoles,
      }).unwrap();
    } catch (error) {
      console.error("Failed to assign roles:", error);
    }
  }

  function openCreateUser() {
    setModalUser(null);
    setUserModalMode("create");
    setUserModalOpen(true);
  }

  function openViewUser(user: User) {
    setModalUser(user);
    setUserModalMode("view");
    setUserModalOpen(true);
  }

  function openEditUser(user: User) {
    setModalUser(user);
    setUserModalMode("edit");
    setUserModalOpen(true);
  }

  function openCreateRole() {
    setModalRole(null);
    setRoleModalMode("create");
    setRoleModalOpen(true);
  }

  function openViewRole(role: Role) {
    setModalRole(role);
    setRoleModalMode("view");
    setRoleModalOpen(true);
  }

  function openEditRole(role: Role) {
    setModalRole(role);
    setRoleModalMode("edit");
    setRoleModalOpen(true);
  }

  const isLoading = usersLoading || rolesLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading users and roles...</p>
      </div>
    );
  }

  if (usersError || rolesError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Roles</CardTitle>

          <CardDescription>Unable to load users or roles.</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            Failed to load the user-role management data.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Administration</p>

            <h1 className="font-serif text-3xl tracking-tight text-primary md:text-4xl">User Roles</h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Manage users, roles, permissions, and access across the admin console.
            </p>
          </div>

          <Button onClick={openCreateUser}>
            <Plus className="size-4" />
            Create User
          </Button>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="h-auto w-full justify-start rounded-lg border bg-secondary/30 p-1 sm:w-fit">
            <TabsTrigger
              value="users"
              className="px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Users
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {users.length}
              </span>
            </TabsTrigger>

            <TabsTrigger
              value="roles"
              className="px-5 py-2.5 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
            >
              Roles
              <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {roles.length}
              </span>
            </TabsTrigger>
          </TabsList>

          {/* USERS */}
          <TabsContent value="users" className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-secondary/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>

                    <CardDescription className="mt-1">View, create, edit, and manage user access.</CardDescription>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search users..."
                      className="w-full bg-background md:w-80"
                    />

                    <Button onClick={openCreateUser} className="shrink-0">
                      <Plus className="size-4" />
                      <span className="hidden sm:inline">New User</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                        <TableHead className="pl-6">Name</TableHead>

                        <TableHead>Email</TableHead>

                        <TableHead>Current Roles</TableHead>

                        <TableHead>Status</TableHead>

                        <TableHead className="w-[180px] pr-6 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {filteredUsers.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="h-28 text-center text-muted-foreground">
                            No users found.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredUsers.map((user) => {
                          const userRoles = getUserRoles(user);

                          const isSelected = selectedUserId === user.id;

                          return (
                            <TableRow
                              key={user.id}
                              className={isSelected ? "bg-primary/[0.04]" : "transition-colors hover:bg-secondary/20"}
                            >
                              <TableCell className="pl-6">
                                <div className="flex items-center gap-3">
                                  <div className="flex size-9 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                                    <UserRound className="size-4" />
                                  </div>

                                  <div>
                                    <p className="font-medium text-foreground">{user.name || "Unnamed user"}</p>

                                    {isSelected ? <p className="mt-0.5 text-xs text-gold">Currently selected</p> : null}
                                  </div>
                                </div>
                              </TableCell>

                              <TableCell className="text-muted-foreground">{user.email}</TableCell>

                              <TableCell>
                                <div className="flex flex-wrap gap-1.5">
                                  {userRoles.length > 0 ? (
                                    userRoles.map((role) => (
                                      <Badge key={role} variant="secondary" className="font-normal">
                                        {role}
                                      </Badge>
                                    ))
                                  ) : (
                                    <span className="text-sm text-muted-foreground">No roles</span>
                                  )}
                                </div>
                              </TableCell>

                              <TableCell>
                                <Badge
                                  variant={user.isActive === false ? "outline" : "secondary"}
                                  className={
                                    user.isActive === false
                                      ? "border-destructive/30 bg-destructive/10 text-destructive"
                                      : ""
                                  }
                                >
                                  {user.isActive === false ? "Inactive" : "Active"}
                                </Badge>
                              </TableCell>

                              <TableCell className="pr-6">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    title="View user"
                                    onClick={() => openViewUser(user)}
                                  >
                                    <Eye className="size-4" />
                                  </Button>

                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    title="Edit user"
                                    onClick={() => openEditUser(user)}
                                  >
                                    <Pencil className="size-4" />
                                  </Button>

                                  <Button
                                    size="sm"
                                    variant={isSelected ? "default" : "outline"}
                                    onClick={() => handleSelectUser(user)}
                                  >
                                    {isSelected ? "Selected" : "Roles"}
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* ROLE ASSIGNMENT */}
            {selectedUser ? (
              <Card className="overflow-hidden">
                <CardHeader className="border-b bg-secondary/20">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">
                        Role Management
                      </p>

                      <CardTitle>Assign Roles</CardTitle>

                      <CardDescription className="mt-1">
                        Managing roles for{" "}
                        <span className="font-medium text-foreground">{selectedUser.name || selectedUser.email}</span>
                      </CardDescription>
                    </div>

                    <Badge variant="outline">{selectedRoles.length} selected</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6 p-6">
                  {roles.length === 0 ? (
                    <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                      No roles are available.
                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {roles.map((role) => {
                        const isRoleSelected = selectedRoles.includes(role.name);

                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => toggleRole(role.name)}
                            className={[
                              "group rounded-lg border p-4 text-left transition-all",
                              "hover:border-primary/30 hover:bg-secondary/30",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                              isRoleSelected
                                ? "border-primary bg-primary/[0.04] ring-1 ring-primary/30"
                                : "border-border bg-background",
                            ].join(" ")}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="font-medium text-foreground">{role.name}</p>

                                <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
                                  {role.description || "No description provided."}
                                </p>
                              </div>

                              <Badge variant={isRoleSelected ? "default" : "outline"}>
                                {isRoleSelected ? "Selected" : "Select"}
                              </Badge>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="rounded-lg border bg-secondary/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-foreground">Selected roles</p>

                      <span className="text-xs text-muted-foreground">
                        {selectedRoles.length} {selectedRoles.length === 1 ? "role" : "roles"}
                      </span>
                    </div>

                    {selectedRoles.length === 0 ? (
                      <p className="mt-3 text-sm text-muted-foreground">No roles selected.</p>
                    ) : (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selectedRoles.map((role) => (
                          <Badge key={role} variant="secondary" className="font-normal">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isAssigning}
                      onClick={() => {
                        setSelectedRoles(getUserRoles(selectedUser));
                      }}
                    >
                      Reset
                    </Button>

                    <Button type="button" disabled={isAssigning || !selectedUserId} onClick={handleSaveRoles}>
                      {isAssigning ? "Saving..." : "Save Roles"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex min-h-40 items-center justify-center p-6">
                  <div className="text-center">
                    <UserRound className="mx-auto size-8 text-muted-foreground" />

                    <p className="mt-3 font-medium text-foreground">Select a user</p>

                    <p className="mt-1 text-sm text-muted-foreground">Choose a user above to manage their roles.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* ROLES */}
          <TabsContent value="roles" className="space-y-6">
            <Card className="overflow-hidden">
              <CardHeader className="border-b bg-secondary/20">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="size-5 text-gold" />
                      Available Roles
                    </CardTitle>

                    <CardDescription className="mt-1">Create and manage roles and their permissions.</CardDescription>
                  </div>

                  <Button onClick={openCreateRole}>
                    <Plus className="size-4" />
                    New Role
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {roles.length === 0 ? (
                  <div className="p-10 text-center text-sm text-muted-foreground">No roles are available.</div>
                ) : (
                  <div className="divide-y">
                    {roles.map((role) => {
                      const assignedCount = users.filter((user) => getUserRoles(user).includes(role.name)).length;

                      const permissionCount = Array.isArray(role.permissions) ? role.permissions.length : 0;

                      return (
                        <div
                          key={role.id}
                          className="flex flex-col gap-4 p-5 transition-colors hover:bg-secondary/20 lg:flex-row lg:items-center lg:justify-between"
                        >
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-medium text-foreground">{role.name}</h3>

                              <Badge variant="secondary" className="font-normal">
                                {permissionCount} permissions
                              </Badge>
                            </div>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {role.description || "No description provided."}
                            </p>

                            <div className="mt-2 text-xs text-muted-foreground">
                              {assignedCount} {assignedCount === 1 ? "user" : "users"} assigned
                            </div>
                          </div>

                          <div className="flex shrink-0 gap-1">
                            <Button size="icon" variant="ghost" title="View role" onClick={() => openViewRole(role)}>
                              <Eye className="size-4" />
                            </Button>

                            <Button size="sm" variant="outline" onClick={() => openEditRole(role)}>
                              <Pencil className="size-4" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="border-border/80">
                <CardHeader>
                  <CardDescription>Total Users</CardDescription>

                  <CardTitle className="font-serif text-3xl text-primary">{users.length}</CardTitle>
                </CardHeader>
              </Card>

              <Card className="border-border/80">
                <CardHeader>
                  <CardDescription>Total Roles</CardDescription>

                  <CardTitle className="font-serif text-3xl text-primary">{roles.length}</CardTitle>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* USER MODAL */}
      <UserModal open={userModalOpen} onOpenChange={setUserModalOpen} mode={userModalMode} user={modalUser} />

      {/* ROLE MODAL */}
      <RoleModal open={roleModalOpen} onOpenChange={setRoleModalOpen} mode={roleModalMode} role={modalRole} />
    </>
  );
}
