"use client";

import Link from "next/link";

import { ExternalLink, FolderKanban, ImageIcon, MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useDeleteProjectMutation, useGetProjectsQuery } from "@/api/projectsApi";

export default function AdminProjects() {
  const { data, isLoading, isFetching, isError, error } = useGetProjectsQuery({
    page: 1,
    limit: 100,
  });

  const [deleteProject, { isLoading: isDeleting }] = useDeleteProjectMutation();

  const projects = data?.data?.data ?? [];

  async function handleDeleteProject(projectId: string, projectTitle: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${projectTitle}"?\n\nThis action cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(projectId).unwrap();
    } catch (deleteError) {
      console.error("Failed to delete project:", deleteError);

      window.alert("Failed to delete the project. Please try again.");
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <PageHeader />

        <Card>
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center text-center">
              <FolderKanban className="mb-3 size-8 text-muted-foreground" />

              <p className="font-medium">Loading projects...</p>

              <p className="mt-1 text-sm text-muted-foreground">Fetching your project portfolio.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8">
        <PageHeader />

        <Card>
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>

            <CardDescription>There was a problem fetching the project portfolio.</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-5">
              <p className="text-sm font-medium text-destructive">Failed to fetch projects.</p>

              {error ? (
                <pre className="mt-3 max-h-48 overflow-auto rounded-md bg-background/70 p-3 text-xs text-muted-foreground">
                  {JSON.stringify(error, null, 2)}
                </pre>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader />

      {/* SUMMARY */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Total projects" value={projects.length} />

        <StatCard label="Featured" value={projects.filter((project) => project.featured).length} />

        <StatCard
          label="With images"
          value={projects.filter((project) => project.images && project.images.length > 0).length}
        />
      </section>

      {/* PROJECT TABLE */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-background">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Project portfolio</CardTitle>

              <CardDescription className="mt-1">
                {projects.length} {projects.length === 1 ? "entry" : "entries"} · order matches the public projects grid
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {isFetching ? <span className="text-xs text-muted-foreground">Refreshing...</span> : null}

              <Button asChild variant="outline" size="sm">
                <Link href="/projects">
                  View public projects
                  <ExternalLink className="ml-2 size-3.5" />
                </Link>
              </Button>

              <Button asChild size="sm">
                <Link href="/admin/projects/workspace">
                  <Plus className="mr-2 size-4" />
                  Add Project
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead className="w-20">Cover</TableHead>

                  <TableHead>Name</TableHead>

                  <TableHead>Type</TableHead>

                  <TableHead>Location</TableHead>

                  <TableHead className="w-16 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {projects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-40 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <FolderKanban className="mb-2 size-7 text-muted-foreground" />

                        <p className="font-medium">No projects found</p>

                        <p className="text-sm text-muted-foreground">There are currently no projects to display.</p>

                        <Button asChild size="sm" className="mt-4">
                          <Link href="/admin/projects/workspace">
                            <Plus className="mr-2 size-4" />
                            Add Project
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  projects.map((project) => (
                    <TableRow key={project.projectId} className="group">
                      {/* COVER */}
                      <TableCell>
                        {project.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={project.image}
                            alt=""
                            className="h-11 w-16 rounded-md border object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex h-11 w-16 items-center justify-center rounded-md border bg-muted text-muted-foreground">
                            <ImageIcon className="size-4" />
                          </div>
                        )}
                      </TableCell>

                      {/* NAME + SLUG */}
                      <TableCell>
                        <div className="min-w-[240px]">
                          <div className="flex flex-wrap items-center gap-2">
                            <Link
                              href={`/projects/${project.slug}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {project.title}
                            </Link>

                            {project.featured ? (
                              <Badge variant="accent" className="font-normal">
                                Featured
                              </Badge>
                            ) : null}
                          </div>

                          <span className="mt-1 block max-w-[280px] truncate font-mono text-xs text-muted-foreground">
                            /{project.slug}
                          </span>
                        </div>
                      </TableCell>

                      {/* TYPE */}
                      <TableCell>
                        <Badge variant="secondary" className="font-normal">
                          {project.category ?? "—"}
                        </Badge>
                      </TableCell>

                      {/* LOCATION */}
                      <TableCell>
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                          {project.location ?? "—"}
                        </span>
                      </TableCell>

                      {/* ACTIONS */}
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="size-8"
                              aria-label={`Actions for ${project.title}`}
                            >
                              <MoreHorizontal className="size-4" />

                              <span className="sr-only">Open project actions</span>
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-44">
                            {/* VIEW */}
                            <DropdownMenuItem asChild>
                              <Link href={`/projects/${project.slug}`} target="_blank" rel="noreferrer">
                                <ExternalLink className="mr-2 size-4" />
                                View project
                              </Link>
                            </DropdownMenuItem>

                            {/* EDIT */}
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/projects/workspace?projectId=${project.projectId}`}>
                                <Pencil className="mr-2 size-4" />
                                Edit project
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* DELETE */}
                            <DropdownMenuItem
                              disabled={isDeleting}
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              onClick={() => handleDeleteProject(project.projectId, project.title)}
                            >
                              <Trash2 className="mr-2 size-4" />

                              {isDeleting ? "Deleting..." : "Delete project"}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function PageHeader() {
  return (
    <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Portfolio</p>

        <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Projects</h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage and review the projects displayed across the public Rippōtai Architecture portfolio.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/admin">Back to dashboard</Link>
        </Button>

        <Button asChild>
          <Link href="/admin/projects/workspace">
            <Plus className="mr-2 size-4" />
            Add Project
          </Link>
        </Button>
      </div>
    </header>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="transition-colors hover:border-primary/20">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>

        <CardTitle className="text-3xl font-semibold tracking-tight text-primary">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
