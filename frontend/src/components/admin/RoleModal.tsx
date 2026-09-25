"use client";

import { useEffect, useState } from "react";

import { Eye, Loader2, Pencil, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  useCreateRoleMutation,
  useGetAvailablePermissionsQuery,
  useUpdateRoleMutation,
  type Permission,
  type Role,
} from "@/api/rolesApi";

type RoleModalMode = "view" | "create" | "edit";

interface RoleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: RoleModalMode;
  role?: Role | null;
}

function permissionKey(permission: Permission | string) {
  if (typeof permission === "string") {
    return permission;
  }

  return permission.id || permission.name;
}

function permissionLabel(permission: Permission | string) {
  if (typeof permission === "string") {
    return permission;
  }

  if (permission.resource && permission.action) {
    return `${permission.resource}:${permission.action}`;
  }

  return permission.name;
}

export function RoleModal({ open, onOpenChange, mode, role }: RoleModalProps) {
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  const { data: availablePermissions = [], isLoading: permissionsLoading } = useGetAvailablePermissionsQuery(
    undefined,
    {
      skip: !open || mode === "view",
    },
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!open) return;

    setName(role?.name ?? "");
    setDescription(role?.description ?? "");

    if (Array.isArray(role?.permissions)) {
      setSelectedPermissions(
        role.permissions.map((permission) => (typeof permission === "string" ? permission : permission.name)),
      );
    } else {
      setSelectedPermissions([]);
    }
  }, [open, role]);

  function togglePermission(permission: Permission | string) {
    const key = permissionKey(permission);
    const value = typeof permission === "string" ? permission : permission.name;

    setSelectedPermissions((current) => {
      if (current.includes(value) || current.includes(key)) {
        return current.filter((item) => item !== value && item !== key);
      }

      return [...current, value];
    });
  }

  function isPermissionSelected(permission: Permission | string) {
    const key = permissionKey(permission);
    const value = typeof permission === "string" ? permission : permission.name;

    return selectedPermissions.includes(value) || selectedPermissions.includes(key);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isCreate) {
        await createRole({
          name: name.trim(),
          description: description.trim() || undefined,
          permissions: selectedPermissions,
        }).unwrap();
      }

      if (isEdit && role) {
        await updateRole({
          id: role.id,
          name: name.trim(),
          description: description.trim() || undefined,
          permissions: selectedPermissions,
        }).unwrap();
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save role:", error);
    }
  }

  const viewPermissions = Array.isArray(role?.permissions) ? role.permissions : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isCreate ? (
              <Plus className="size-4" />
            ) : isEdit ? (
              <Pencil className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}

            {isCreate ? "Create Role" : isEdit ? "Edit Role" : "Role Details"}
          </DialogTitle>

          <DialogDescription>
            {isCreate
              ? "Create a role and configure its permissions."
              : isEdit
                ? "Update the role name, description, and permissions."
                : "View role information and assigned permissions."}
          </DialogDescription>
        </DialogHeader>

        {isView ? (
          <div className="space-y-6 py-2">
            <div className="rounded-xl border bg-secondary/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{role?.name}</h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {role?.description || "No description provided."}
                  </p>
                </div>

                <Badge variant="secondary">Role</Badge>
              </div>
            </div>

            <div>
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <p className="font-medium">Permissions</p>

                  <p className="text-sm text-muted-foreground">Permissions currently assigned to this role.</p>
                </div>

                <Badge variant="outline">{viewPermissions.length}</Badge>
              </div>

              {viewPermissions.length === 0 ? (
                <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No permissions assigned.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {viewPermissions.map((permission, index) => {
                    const label = typeof permission === "string" ? permission : permission.name;

                    return (
                      <Badge key={`${label}-${index}`} variant="secondary" className="font-normal">
                        {label}
                      </Badge>
                    );
                  })}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 py-2">
              <div className="space-y-2">
                <Label htmlFor="role-name">
                  Role Name <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="role-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Administrator"
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>

                <Textarea
                  id="role-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Full access to the administration console."
                  rows={3}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Permissions</Label>

                    <p className="mt-1 text-xs text-muted-foreground">Select the permissions this role should have.</p>
                  </div>

                  <Badge variant="outline">{selectedPermissions.length} selected</Badge>
                </div>

                {permissionsLoading ? (
                  <div className="flex min-h-32 items-center justify-center rounded-lg border">
                    <Loader2 className="size-5 animate-spin text-muted-foreground" />
                  </div>
                ) : availablePermissions.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
                    No permissions are available.
                  </div>
                ) : (
                  <div className="grid max-h-72 gap-2 overflow-y-auto rounded-lg border p-3 sm:grid-cols-2">
                    {availablePermissions.map((permission) => {
                      const selected = isPermissionSelected(permission);

                      return (
                        <button
                          key={permissionKey(permission)}
                          type="button"
                          onClick={() => togglePermission(permission)}
                          className={[
                            "rounded-lg border p-3 text-left transition-colors",
                            "hover:bg-secondary/40",
                            selected ? "border-primary bg-primary/[0.05] ring-1 ring-primary/20" : "border-border",
                          ].join(" ")}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="text-sm font-medium">{permissionLabel(permission)}</p>

                              {typeof permission !== "string" && permission.description ? (
                                <p className="mt-1 text-xs text-muted-foreground">{permission.description}</p>
                              ) : null}
                            </div>

                            <Badge variant={selected ? "default" : "outline"} className="shrink-0">
                              {selected ? "Selected" : "Select"}
                            </Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {selectedPermissions.length > 0 ? (
                <div className="rounded-lg border bg-secondary/20 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-sm font-medium">Selected permissions</p>

                    <span className="text-xs text-muted-foreground">{selectedPermissions.length}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {selectedPermissions.map((permission) => (
                      <Badge key={permission} variant="secondary" className="font-normal">
                        {permission}
                      </Badge>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" disabled={isSaving} onClick={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button type="submit" disabled={isSaving || !name.trim()}>
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : isCreate ? (
                  "Create Role"
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
