"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useCreateProjectMutation, useGetProjectByIdQuery, useUpdateProjectMutation } from "@/api/projectsApi";

export default function ProjectWorkspaceClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");
  const isEditMode = Boolean(projectId);

  const {
    data: project,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useGetProjectByIdQuery(projectId as string, {
    skip: !projectId,
  });

  const [createProject, { isLoading: isCreating }] = useCreateProjectMutation();

  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isSaving = isCreating || isUpdating;

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [scope, setScope] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [priority, setPriority] = useState("0");
  const [featured, setFeatured] = useState(false);
  const [moreDetails, setMoreDetails] = useState("");

  const [image, setImage] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [initializedProjectId, setInitializedProjectId] = useState<string | null>(null);

  /*
   * Populate form when editing an existing project.
   */
  useEffect(() => {
    if (!projectId || !project) {
      return;
    }

    if (initializedProjectId === projectId) {
      return;
    }

    setTitle(project.title ?? "");
    setSlug(project.slug ?? "");
    setDescription(project.description ?? "");
    setCategory(project.category ?? "");
    setLocation(project.location ?? "");
    setScope(project.scope ?? "");
    setStatus(project.status ?? "DRAFT");
    setPriority(String(project.priority ?? 0));
    setFeatured(Boolean(project.featured));
    setMoreDetails(project.moreDetails ?? "");

    setInitializedProjectId(projectId);
  }, [projectId, project, initializedProjectId]);

  /*
   * Reset the form when switching from edit mode
   * to create mode.
   */
  useEffect(() => {
    if (projectId) {
      return;
    }

    setTitle("");
    setSlug("");
    setDescription("");
    setCategory("");
    setLocation("");
    setScope("");
    setStatus("DRAFT");
    setPriority("0");
    setFeatured(false);
    setMoreDetails("");
    setImage(null);
    setBanner(null);
    setGallery([]);
    setErrorMessage("");
    setInitializedProjectId(null);
  }, [projectId]);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    /*
     * Only automatically generate the slug while creating.
     * When editing, changing the title should not unexpectedly
     * overwrite an existing slug.
     */
    if (!isEditMode && !slug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("slug", slug);
      formData.append("description", description);

      if (category) {
        formData.append("category", category);
      }

      if (location) {
        formData.append("location", location);
      }

      if (scope) {
        formData.append("scope", scope);
      }

      formData.append("status", status);
      formData.append("priority", priority);
      formData.append("featured", String(featured));

      if (moreDetails) {
        formData.append("moreDetails", moreDetails);
      }

      if (image) {
        formData.append("image", image);
      }

      if (banner) {
        formData.append("banner", banner);
      }

      gallery.forEach((file) => {
        formData.append("images", file);
      });

      if (isEditMode && projectId) {
        await updateProject({
          projectId,
          formData,
        }).unwrap();
      } else {
        await createProject(formData).unwrap();
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        isEditMode
          ? "Unable to update project. Please check the form and try again."
          : "Unable to create project. Please check the form and try again.",
      );
    }
  }

  /*
   * Loading existing project.
   */
  if (isEditMode && isProjectLoading) {
    return (
      <div className="mx-auto flex min-h-64 w-full max-w-6xl items-center justify-center">
        <div className="text-sm text-muted-foreground">Loading project workspace...</div>
      </div>
    );
  }

  /*
   * Project not found / API error.
   */
  if (isEditMode && (isProjectError || !project)) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
          Unable to load this project.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {/* Workspace Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-primary">Project Workspace</h1>

            <Badge variant={isEditMode ? "accent" : "outline"}>{isEditMode ? "Editing" : "New Project"}</Badge>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {isEditMode
              ? `Editing ${project?.title ?? "project"}`
              : "Create a new project for the public projects catalogue."}
          </p>
        </div>

        {isEditMode && project ? (
          <Button type="button" variant="outline" onClick={() => router.push(`/projects/${project.slug}`)}>
            View Project
          </Button>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Information */}
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>

            <CardDescription>Basic information displayed throughout the website.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Project title *</Label>

              <Input
                id="title"
                value={title}
                onChange={(event) => handleTitleChange(event.target.value)}
                placeholder="Modern Residence"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>

              <Input
                id="slug"
                value={slug}
                onChange={(event) => setSlug(event.target.value)}
                placeholder="modern-residence"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <Input
                id="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                placeholder="Residential"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="New Delhi, India"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Scope</Label>

              <Input
                id="scope"
                value={scope}
                onChange={(event) => setScope(event.target.value)}
                placeholder="Architecture & Interior"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>

              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the project..."
                className="min-h-32"
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="moreDetails">More Details</Label>

              <Textarea
                id="moreDetails"
                value={moreDetails}
                onChange={(event) => setMoreDetails(event.target.value)}
                placeholder="Additional project information..."
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        {/* Project Status */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>

            <CardDescription>Control project visibility and ordering.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>

              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="COMPLETED">Completed</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>

              <Input
                id="priority"
                type="number"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                min="0"
              />
            </div>

            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-3 rounded-md border p-3">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(event) => setFeatured(event.target.checked)}
                  className="h-4 w-4"
                />

                <span className="text-sm font-medium">Featured project</span>

                {featured ? <Badge variant="accent">Featured</Badge> : null}
              </label>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Project Images</CardTitle>

            <CardDescription>Upload the project cover, banner and gallery images.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image">Cover Image</Label>

              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              />

              {image ? <p className="text-xs text-muted-foreground">Selected: {image.name}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="banner">Banner Image</Label>

              <Input
                id="banner"
                type="file"
                accept="image/*"
                onChange={(event) => setBanner(event.target.files?.[0] ?? null)}
              />

              {banner ? <p className="text-xs text-muted-foreground">Selected: {banner.name}</p> : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gallery">Gallery Images</Label>

              <Input
                id="gallery"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setGallery(Array.from(event.target.files ?? []))}
              />

              {gallery.length > 0 ? (
                <p className="text-xs text-muted-foreground">
                  {gallery.length} image
                  {gallery.length === 1 ? "" : "s"} selected
                </p>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {/* Error */}
        {errorMessage ? (
          <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4 text-sm text-destructive">
            {errorMessage}
          </div>
        ) : null}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSaving}>
            Cancel
          </Button>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? (isEditMode ? "Saving..." : "Creating...") : isEditMode ? "Save Changes" : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
