"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetAllUsersQuery } from "@/api/usersApi";
import { useGetAllRolesQuery } from "@/api/rolesApi";
import { useGetQueriesQuery } from "@/api/queriesApi";
import { useGetProjectsQuery } from "@/api/projectsApi";
import { useGetApplicationsQuery } from "@/api/applicationsApi";

export default function AdminHome() {
  const { data: projectsResponse, isLoading: projectsLoading } = useGetProjectsQuery({
    page: 1,
    limit: 100,
  });

  const { data: users = [], isLoading: usersLoading } = useGetAllUsersQuery();

  const { data: roles = [], isLoading: rolesLoading } = useGetAllRolesQuery();

  // Explicitly pass undefined because the API accepts string | undefined.
  // This requests queries without a branch filter.
  const { data: queries = [], isLoading: queriesLoading } = useGetQueriesQuery(undefined);

  const { data: applicationsResponse, isLoading: applicationsLoading } = useGetApplicationsQuery();

  /**
   * API response:
   *
   * {
   *   applications: [],
   *   total: 5,
   *   page: 1,
   *   limit: 10
   * }
   */
  const applications = Array.isArray(applicationsResponse?.applications) ? applicationsResponse.applications : [];

  const projects = projectsResponse?.data?.data ?? [];

  const featuredProjects = projects.filter((project) => project.featured);

  const publishedProjects = projects.filter(
    (project) => project.status?.toLowerCase() === "published" || project.status?.toLowerCase() === "active",
  );

  /**
   * Normalize status because API currently returns:
   * "Pending", "Reviewing", "Hired"
   */
  const pendingApplications = applications.filter((application) => application.status?.toLowerCase() === "pending");

  const reviewingApplications = applications.filter((application) => application.status?.toLowerCase() === "reviewing");

  const hiredApplications = applications.filter((application) => application.status?.toLowerCase() === "hired");

  const unreadOrOpenQueries = queries.filter(
    (query) => !query.status || !["resolved", "closed", "completed"].includes(query.status.toLowerCase()),
  );

  const projectCategories = projects.reduce<Record<string, number>>((acc, project) => {
    const category = project.category || "Uncategorized";

    acc[category] = (acc[category] ?? 0) + 1;

    return acc;
  }, {});

  const isLoading = projectsLoading || usersLoading || rolesLoading || queriesLoading || applicationsLoading;

  const cards = [
    {
      label: "Projects",
      value: projects.length,
      hint: `${featuredProjects.length} featured`,
      href: "/admin/projects",
    },
    {
      label: "Users",
      value: users.length,
      hint: `${roles.length} roles configured`,
      href: "/admin/users",
    },
    {
      label: "Queries",
      value: queries.length,
      hint: `${unreadOrOpenQueries.length} open`,
      href: "/admin/queries",
    },
    {
      label: "Applications",
      value: applicationsResponse?.total ?? applications.length,
      hint: `${pendingApplications.length} pending`,
      href: "/admin/applications",
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Rippotai</p>

          <h1 className="font-serif text-4xl text-primary">Admin overview</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Live overview of projects, users, enquiries and career applications.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/">Open site</Link>
        </Button>
      </header>

      {/* LOADING */}
      {isLoading ? (
        <div className="rounded-lg border bg-muted/20 p-4 text-sm text-muted-foreground">Loading dashboard data...</div>
      ) : null}

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link key={card.label} href={card.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <CardDescription>{card.label}</CardDescription>

                <CardTitle className="text-4xl text-primary">{card.value}</CardTitle>
              </CardHeader>

              <CardContent className="text-xs text-muted-foreground">{card.hint}</CardContent>
            </Card>
          </Link>
        ))}
      </section>

      {/* TABS */}
      <Tabs defaultValue="projects">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>

          <TabsTrigger value="team">Users</TabsTrigger>

          <TabsTrigger value="applications">Applications</TabsTrigger>

          <TabsTrigger value="queries">Queries</TabsTrigger>
        </TabsList>

        {/* PROJECTS */}
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects by category</CardTitle>

              <CardDescription>Current project distribution from the API.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex flex-wrap gap-3">
                {Object.entries(projectCategories).length === 0 ? (
                  <p className="text-sm text-muted-foreground">No projects available.</p>
                ) : (
                  Object.entries(projectCategories).map(([category, count]) => (
                    <Badge key={category} variant="secondary" className="px-3 py-1 text-sm">
                      {category} · {count}
                    </Badge>
                  ))
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Total</p>

                  <p className="mt-1 text-2xl font-semibold">{projects.length}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Featured</p>

                  <p className="mt-1 text-2xl font-semibold">{featuredProjects.length}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Published / Active</p>

                  <p className="mt-1 text-2xl font-semibold">{publishedProjects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* USERS */}
        {/* USERS */}
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>

              <CardDescription>Users and their currently assigned roles.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              {users.length === 0 ? (
                <p className="text-sm text-muted-foreground">No users available.</p>
              ) : (
                users.slice(0, 10).map((user) => {
                  const roleName = typeof user.role === "string" ? user.role : user.role?.name;

                  return (
                    <div
                      key={user.id}
                      className="flex items-center justify-between rounded-md border px-3 py-3 text-sm"
                    >
                      <div>
                        <p className="font-medium text-primary">{user.name || "Unnamed user"}</p>

                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>

                      <Badge variant={roleName ? "default" : "outline"}>{roleName || "No role"}</Badge>
                    </div>
                  );
                })
              )}

              {users.length > 10 ? (
                <div className="pt-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/admin/users">View all users</Link>
                  </Button>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </TabsContent>

        {/* APPLICATIONS */}
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Career applications</CardTitle>

              <CardDescription>Current recruitment pipeline.</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Total</p>

                  <p className="mt-1 text-2xl font-semibold">{applicationsResponse?.total ?? applications.length}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Pending</p>

                  <p className="mt-1 text-2xl font-semibold">{pendingApplications.length}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Reviewing</p>

                  <p className="mt-1 text-2xl font-semibold">{reviewingApplications.length}</p>
                </div>

                <div className="rounded-lg border p-4">
                  <p className="text-sm text-muted-foreground">Hired</p>

                  <p className="mt-1 text-2xl font-semibold">{hiredApplications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* QUERIES */}
        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Website enquiries</CardTitle>

              <CardDescription>Latest enquiries received through the website.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              {queries.length === 0 ? (
                <p className="text-sm text-muted-foreground">No enquiries available.</p>
              ) : (
                queries.slice(0, 10).map((query) => (
                  <div key={query._id} className="flex items-center justify-between gap-4 rounded-md border px-3 py-3">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{query.subject}</p>

                      <p className="truncate text-xs text-muted-foreground">
                        {query.name} · {query.email}
                      </p>
                    </div>

                    <Badge variant="outline">{query.status || "Open"}</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
