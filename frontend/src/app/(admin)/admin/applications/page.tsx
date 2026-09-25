"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, FileText, MoreHorizontal, Search, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useDeleteApplicationMutation,
  useGetApplicationsQuery,
  useGetDashboardStatsQuery,
  useUpdateApplicationStatusMutation,
  type Application,
  type ApplicationStatus,
} from "@/api/applicationsApi";

const STATUS_OPTIONS: ApplicationStatus[] = ["PENDING", "REVIEWING", "SHORTLISTED", "REJECTED", "HIRED"];

function normalizeStatus(status?: string) {
  return status?.toUpperCase() || "PENDING";
}

function formatStatus(status?: string) {
  const normalized = normalizeStatus(status);

  return normalized.charAt(0) + normalized.slice(1).toLowerCase();
}

function getStatusVariant(status?: string): "default" | "secondary" | "outline" | "accent" {
  switch (normalizeStatus(status)) {
    case "HIRED":
      return "default";

    case "REJECTED":
      return "accent";

    case "SHORTLISTED":
      return "secondary";

    case "REVIEWING":
      return "outline";

    case "PENDING":
    default:
      return "outline";
  }
}

function getApplicationId(application: Application) {
  return application.id ?? application._id ?? "";
}

function formatDate(date?: string) {
  if (!date) {
    return "—";
  }

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading, isFetching, isError, refetch } = useGetApplicationsQuery();

  const { data: dashboardStats, isLoading: statsLoading } = useGetDashboardStatsQuery();

  const [updateApplicationStatus, { isLoading: updatingStatus }] = useUpdateApplicationStatusMutation();

  const [deleteApplication, { isLoading: deletingApplication }] = useDeleteApplicationMutation();

  const applications = data?.applications ?? [];

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const matchesSearch =
        !query ||
        application.name?.toLowerCase().includes(query) ||
        application.email?.toLowerCase().includes(query) ||
        application.phone?.toLowerCase().includes(query) ||
        application.designation?.toLowerCase().includes(query) ||
        application.interestedIn?.toLowerCase().includes(query);

      const matchesStatus = statusFilter === "ALL" || normalizeStatus(application.status) === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  async function handleStatusChange(application: Application, status: ApplicationStatus) {
    const id = getApplicationId(application);

    if (!id) {
      return;
    }

    try {
      await updateApplicationStatus({
        id,
        status,
      }).unwrap();
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  }

  async function handleDelete(application: Application) {
    const id = getApplicationId(application);

    if (!id) {
      return;
    }

    const confirmed = window.confirm(`Delete application from ${application.name}? This action cannot be undone.`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteApplication(id).unwrap();
    } catch (error) {
      console.error("Failed to delete application:", error);
    }
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Careers</p>

          <h1 className="mt-2 font-serif text-4xl tracking-tight text-primary">Applications</h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Review candidates, manage recruitment status, and access submitted resumes.
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/admin">Back to dashboard</Link>
        </Button>
      </header>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Total"
          value={dashboardStats?.total ?? data?.total ?? applications.length}
          loading={statsLoading}
        />

        <StatCard label="Pending" value={dashboardStats?.pending ?? 0} loading={statsLoading} />

        <StatCard label="Reviewing" value={dashboardStats?.reviewing ?? 0} loading={statsLoading} />

        <StatCard label="Shortlisted" value={dashboardStats?.shortlisted ?? 0} loading={statsLoading} />

        <StatCard label="Rejected" value={dashboardStats?.rejected ?? 0} loading={statsLoading} />

        <StatCard label="Hired" value={dashboardStats?.hired ?? 0} loading={statsLoading} />
      </section>

      {/* APPLICATIONS */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-background">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <CardTitle>Career applications</CardTitle>

              <CardDescription className="mt-1">
                {filteredApplications.length} application
                {filteredApplications.length === 1 ? "" : "s"} shown
                {data?.total ? ` · ${data.total} total` : ""}
              </CardDescription>
            </div>

            <Button variant="outline" size="sm" onClick={() => refetch()} disabled={isFetching}>
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-5 pt-6">
          {/* FILTERS */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name, email, phone, designation..."
                className="pl-9"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="ALL">All statuses</SelectItem>

                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {formatStatus(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ERROR */}
          {isError ? (
            <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
              <p className="font-medium text-destructive">Failed to load applications.</p>

              <p className="mt-1 text-sm text-muted-foreground">Please check the API connection and try again.</p>

              <Button variant="outline" size="sm" className="mt-4" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : null}

          {/* LOADING */}
          {isLoading ? (
            <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
              Loading applications...
            </div>
          ) : null}

          {/* TABLE */}
          {!isLoading && !isError ? (
            <div className="overflow-hidden rounded-lg border">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                      <TableHead>Candidate</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Interest</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead className="w-[70px]" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {filteredApplications.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-40 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <FileText className="mb-2 size-6 text-muted-foreground" />

                            <p className="font-medium">No applications found</p>

                            <p className="text-sm text-muted-foreground">Try changing your search or status filter.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredApplications.map((application) => {
                        const id = getApplicationId(application);

                        return (
                          <TableRow key={id} className="group">
                            {/* CANDIDATE */}
                            <TableCell>
                              <div className="min-w-[190px]">
                                <p className="font-medium text-primary">{application.name}</p>

                                <p className="mt-0.5 text-xs text-muted-foreground">{application.email}</p>
                              </div>
                            </TableCell>

                            {/* POSITION */}
                            <TableCell>
                              <div className="min-w-[180px]">
                                <p className="font-medium">{application.designation || "—"}</p>

                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {application.interestedIn || "—"}
                                </p>
                              </div>
                            </TableCell>

                            {/* INTEREST */}
                            <TableCell>
                              <Badge variant="secondary" className="font-normal">
                                {application.interestedIn || "—"}
                              </Badge>
                            </TableCell>

                            {/* CONTACT */}
                            <TableCell>
                              <div className="min-w-[160px] text-sm">
                                <p>{application.phone || "—"}</p>

                                <p className="mt-0.5 max-w-[180px] truncate text-xs text-muted-foreground">
                                  {application.email}
                                </p>
                              </div>
                            </TableCell>

                            {/* STATUS */}
                            <TableCell>
                              <Select
                                value={normalizeStatus(application.status)}
                                onValueChange={(value) => handleStatusChange(application, value as ApplicationStatus)}
                                disabled={updatingStatus || deletingApplication}
                              >
                                <SelectTrigger className="w-[145px]">
                                  <SelectValue>
                                    <Badge variant={getStatusVariant(application.status)} className="font-normal">
                                      {formatStatus(application.status)}
                                    </Badge>
                                  </SelectValue>
                                </SelectTrigger>

                                <SelectContent>
                                  {STATUS_OPTIONS.map((status) => (
                                    <SelectItem key={status} value={status}>
                                      {formatStatus(status)}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </TableCell>

                            {/* DATE */}
                            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                              {formatDate(application.createdAt)}
                            </TableCell>

                            {/* ACTIONS */}
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="size-8">
                                    <MoreHorizontal className="size-4" />
                                    <span className="sr-only">Open actions</span>
                                  </Button>
                                </DropdownMenuTrigger>

                                <DropdownMenuContent align="end">
                                  {application.resume ? (
                                    <DropdownMenuItem asChild>
                                      <a href={application.resume} target="_blank" rel="noreferrer">
                                        <FileText className="mr-2 size-4" />
                                        View resume
                                        <ExternalLink className="ml-auto size-3" />
                                      </a>
                                    </DropdownMenuItem>
                                  ) : null}

                                  {application.coverLetter ? (
                                    <DropdownMenuItem onClick={() => window.alert(application.coverLetter)}>
                                      <FileText className="mr-2 size-4" />
                                      View cover letter
                                    </DropdownMenuItem>
                                  ) : null}

                                  {application.resume || application.coverLetter ? <DropdownMenuSeparator /> : null}

                                  <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => handleDelete(application)}
                                    disabled={deletingApplication}
                                  >
                                    <Trash2 className="mr-2 size-4" />
                                    Delete application
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : null}

          {/* PAGINATION INFO */}
          {!isLoading && data ? (
            <div className="flex flex-col gap-2 border-t pt-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Showing {filteredApplications.length} of {data.total} applications
              </p>

              <p>
                Page {data.page}
                {data.limit ? ` · ${data.limit} per page` : ""}
              </p>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ label, value, loading }: { label: string; value: number; loading?: boolean }) {
  return (
    <Card className="transition-colors hover:border-primary/20">
      <CardHeader className="pb-2">
        <CardDescription>{label}</CardDescription>

        <CardTitle className="text-3xl font-semibold tracking-tight text-primary">{loading ? "—" : value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
