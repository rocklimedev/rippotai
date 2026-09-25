"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { Project } from "@/api/projectsApi";

interface ProjectFormProps {
  project?: Project;
  mode: "create" | "edit";
  onSubmit: (formData: FormData) => Promise<void>;
  isLoading?: boolean;
}

export default function ProjectForm({ project, mode, onSubmit, isLoading = false }: ProjectFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [description, setDescription] = useState(project?.description ?? "");
  const [category, setCategory] = useState(project?.category ?? "");
  const [location, setLocation] = useState(project?.location ?? "");
  const [scope, setScope] = useState(project?.scope ?? "");
  const [status, setStatus] = useState(project?.status ?? "DRAFT");
  const [priority, setPriority] = useState(String(project?.priority ?? 0));
  const [featured, setFeatured] = useState(project?.featured ?? false);
  const [moreDetails, setMoreDetails] = useState(project?.moreDetails ?? "");

  const [image, setImage] = useState<File | null>(null);
  const [banner, setBanner] = useState<File | null>(null);
  const [gallery, setGallery] = useState<File[]>([]);

  useEffect(() => {
    if (!project) return;

    setTitle(project.title ?? "");
    setSlug(project.slug ?? "");
    setDescription(project.description ?? "");
    setCategory(project.category ?? "");
    setLocation(project.location ?? "");
    setScope(project.scope ?? "");
    setStatus(project.status ?? "DRAFT");
    setPriority(String(project.priority ?? 0));
    setFeatured(project.featured ?? false);
    setMoreDetails(project.moreDetails ?? "");
  }, [project]);

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function handleTitleChange(value: string) {
    setTitle(value);

    if (mode === "create" && !slug) {
      setSlug(generateSlug(value));
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("scope", scope);
    formData.append("status", status);
    formData.append("priority", priority);
    formData.append("featured", String(featured));
    formData.append("moreDetails", moreDetails);

    /*
     * Only send new files.
     *
     * Existing image URLs remain untouched when editing unless
     * the backend explicitly replaces them.
     */
    if (image) {
      formData.append("image", image);
    }

    if (banner) {
      formData.append("banner", banner);
    }

    gallery.forEach((file) => {
      formData.append("images", file);
    });

    await onSubmit(formData);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          {mode === "edit" ? "Edit Project" : "Create Project"}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "edit"
            ? "Update the project information and media."
            : "Add a new project to the public projects catalogue."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Information</CardTitle>
            <CardDescription>Basic project information.</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="title">Project title *</Label>

              <Input id="title" value={title} onChange={(event) => handleTitleChange(event.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>

              <Input id="slug" value={slug} onChange={(event) => setSlug(event.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>

              <Input id="category" value={category} onChange={(event) => setCategory(event.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>

              <Input id="location" value={location} onChange={(event) => setLocation(event.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Scope</Label>

              <Input id="scope" value={scope} onChange={(event) => setScope(event.target.value)} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Description *</Label>

              <Textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
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
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status & Display</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>

              <select
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
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
                min="0"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
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

                <span className="text-sm font-medium">Featured</span>

                {featured ? <Badge variant="accent">Featured</Badge> : null}
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Replace existing media or add gallery images.</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {mode === "edit" && project?.image ? (
              <div className="space-y-2">
                <Label>Current Cover</Label>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.image} alt={project.title} className="h-40 w-64 rounded-lg object-cover" />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="image">{mode === "edit" ? "Replace Cover Image" : "Cover Image"}</Label>

              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={(event) => setImage(event.target.files?.[0] ?? null)}
              />

              {image ? <p className="text-xs text-muted-foreground">{image.name}</p> : null}
            </div>

            {mode === "edit" && project?.banner ? (
              <div className="space-y-2">
                <Label>Current Banner</Label>

                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={project.banner} alt="" className="h-32 w-full rounded-lg object-cover" />
              </div>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="banner">{mode === "edit" ? "Replace Banner" : "Banner Image"}</Label>

              <Input
                id="banner"
                type="file"
                accept="image/*"
                onChange={(event) => setBanner(event.target.files?.[0] ?? null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gallery">Add Gallery Images</Label>

              <Input
                id="gallery"
                type="file"
                accept="image/*"
                multiple
                onChange={(event) => setGallery(Array.from(event.target.files ?? []))}
              />

              {gallery.length > 0 ? (
                <p className="text-xs text-muted-foreground">
                  {gallery.length} new gallery image
                  {gallery.length === 1 ? "" : "s"}
                </p>
              ) : null}
            </div>

            {project?.images?.length ? (
              <div className="space-y-3">
                <Label>Existing Gallery</Label>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  {project.images.map((imageUrl, index) => (
                    <div key={`${imageUrl}-${index}`} className="overflow-hidden rounded-lg border">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imageUrl}
                        alt={`${project.title} ${index + 1}`}
                        className="aspect-video w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" disabled={isLoading} onClick={() => router.back()}>
            Cancel
          </Button>

          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? mode === "edit"
                ? "Saving..."
                : "Creating..."
              : mode === "edit"
                ? "Save Changes"
                : "Create Project"}
          </Button>
        </div>
      </form>
    </div>
  );
}
