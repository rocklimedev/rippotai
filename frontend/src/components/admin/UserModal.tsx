"use client";

import { useEffect, useMemo, useState } from "react";

import { Eye, Loader2, Pencil, Plus, UserRound } from "lucide-react";

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

import { useCreateUserMutation, useUpdateUserMutation, type User } from "@/api/usersApi";

type UserModalMode = "view" | "create" | "edit";

interface UserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: UserModalMode;
  user?: User | null;
}

export function UserModal({ open, onOpenChange, mode, user }: UserModalProps) {
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const isView = mode === "view";
  const isEdit = mode === "edit";
  const isCreate = mode === "create";

  const isSaving = isCreating || isUpdating;

  const title = useMemo(() => {
    if (isCreate) return "Create User";
    if (isEdit) return "Edit User";
    return "User Details";
  }, [isCreate, isEdit]);

  const description = useMemo(() => {
    if (isCreate) {
      return "Create a new admin console user.";
    }

    if (isEdit) {
      return "Update this user's account information.";
    }

    return "View user account information.";
  }, [isCreate, isEdit]);

  useEffect(() => {
    if (!open) return;

    setName(user?.name ?? "");
    setEmail(user?.email ?? "");
    setPassword("");
    setRole(typeof user?.role === "string" ? user.role : (user?.role?.name ?? ""));
  }, [open, user]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      if (isCreate) {
        await createUser({
          name: name.trim() || undefined,
          email: email.trim(),
          password: password || undefined,
          role: role.trim() || undefined,
        }).unwrap();
      }

      if (isEdit && user) {
        await updateUser({
          id: user.id,
          name: name.trim() || undefined,
          email: email.trim() || undefined,
          password: password || undefined,
          role: role.trim() || undefined,
        }).unwrap();
      }

      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  }

  const roles = Array.isArray(user?.roles)
    ? user.roles
    : typeof user?.role === "string"
      ? [user.role]
      : user?.role?.name
        ? [user.role.name]
        : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isCreate ? (
              <Plus className="size-4" />
            ) : isEdit ? (
              <Pencil className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}

            {title}
          </DialogTitle>

          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {isView ? (
          <div className="space-y-5 py-2">
            <div className="flex items-center gap-4 rounded-xl border bg-secondary/20 p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <UserRound className="size-5" />
              </div>

              <div className="min-w-0">
                <p className="font-medium">{user?.name || "Unnamed user"}</p>

                <p className="truncate text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</p>

                <div className="mt-2">
                  <Badge
                    variant={user?.isActive === false ? "outline" : "secondary"}
                    className={
                      user?.isActive === false ? "border-destructive/30 bg-destructive/10 text-destructive" : ""
                    }
                  >
                    {user?.isActive === false ? "Inactive" : "Active"}
                  </Badge>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Roles</p>

                <div className="mt-2 flex flex-wrap gap-1.5">
                  {roles.length > 0 ? (
                    roles.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No roles</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Last Login</p>

                <p className="mt-1 text-sm">{user?.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Created</p>

                <p className="mt-1 text-sm">{user?.createdAt ? new Date(user.createdAt).toLocaleString() : "—"}</p>
              </div>
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
                <Label htmlFor="user-name">Name</Label>

                <Input
                  id="user-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="John Doe"
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-email">
                  Email <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="user-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="john@example.com"
                  required
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-password">
                  Password
                  {isCreate ? (
                    <span className="text-destructive"> *</span>
                  ) : (
                    <span className="ml-1 text-muted-foreground">(leave blank to keep current)</span>
                  )}
                </Label>

                <Input
                  id="user-password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder={isCreate ? "Enter password" : "Leave blank to keep current"}
                  required={isCreate}
                  disabled={isSaving}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-role">Role</Label>

                <Input
                  id="user-role"
                  value={role}
                  onChange={(event) => setRole(event.target.value)}
                  placeholder="admin"
                  disabled={isSaving}
                />

                <p className="text-xs text-muted-foreground">
                  Role assignment can also be managed from the User Roles section.
                </p>
              </div>
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" disabled={isSaving} onClick={() => onOpenChange(false)}>
                Cancel
              </Button>

              <Button type="submit" disabled={isSaving || !email.trim()}>
                {isSaving ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : isCreate ? (
                  "Create User"
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
