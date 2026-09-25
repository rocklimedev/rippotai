"use client";

import { useMemo, useState } from "react";

import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Eye,
  Loader2,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  User,
  X,
} from "lucide-react";

import {
  useAddNoteMutation,
  useDeleteQueryMutation,
  useGetQueriesQuery,
  useUpdateQueryMutation,
} from "@/api/queriesApi";

import type { QueryItem } from "@/api/queriesApi";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

const BRANCHES = [
  { value: "all", label: "All Branches" },
  { value: "delhi", label: "Delhi" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "rohtak", label: "Rohtak" },
];

const STATUS_OPTIONS = [
  { value: "NEW", label: "New" },
  { value: "PENDING", label: "Pending" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "RESOLVED", label: "Resolved" },
  { value: "CLOSED", label: "Closed" },
];

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusLabel(status?: string) {
  if (!status) return "New";

  return status
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusVariant(status?: string): "default" | "secondary" | "outline" | "accent" {
  switch (status?.toUpperCase()) {
    case "RESOLVED":
      return "default";

    case "CLOSED":
      return "secondary";

    case "IN_PROGRESS":
      return "accent";

    case "PENDING":
      return "outline";

    case "NEW":
    default:
      return "outline";
  }
}

function getBranchLabel(branch?: string) {
  if (!branch) return "—";

  const found = BRANCHES.find((item) => item.value.toLowerCase() === branch.toLowerCase());

  if (found) {
    return found.label;
  }

  return branch.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function QueriesPage() {
  const [branch, setBranch] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<QueryItem | null>(null);

  const queryBranch = branch === "all" ? undefined : branch;

  const { data: queries = [], isLoading, isFetching, isError, refetch } = useGetQueriesQuery(queryBranch);

  const [updateQuery, { isLoading: isUpdating }] = useUpdateQueryMutation();

  const [deleteQuery, { isLoading: isDeleting }] = useDeleteQueryMutation();

  const [addNote, { isLoading: isAddingNote }] = useAddNoteMutation();

  const [noteText, setNoteText] = useState("");
  const [actionError, setActionError] = useState("");

  const filteredQueries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    if (!normalizedSearch) {
      return queries;
    }

    return queries.filter((query) => {
      return [query.name, query.email, query.subject, query.message, query.branch, query.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedSearch));
    });
  }, [queries, search]);

  const stats = useMemo(() => {
    const total = queries.length;

    const pending = queries.filter((query) => ["NEW", "PENDING"].includes(query.status?.toUpperCase() ?? "NEW")).length;

    const inProgress = queries.filter((query) => query.status?.toUpperCase() === "IN_PROGRESS").length;

    const resolved = queries.filter((query) =>
      ["RESOLVED", "CLOSED"].includes(query.status?.toUpperCase() ?? ""),
    ).length;

    return {
      total,
      pending,
      inProgress,
      resolved,
    };
  }, [queries]);

  async function handleStatusChange(status: string) {
    if (!selectedQuery) return;

    setActionError("");

    try {
      const updated = await updateQuery({
        id: selectedQuery._id,
        branch: selectedQuery.branch,
        status,
      }).unwrap();

      setSelectedQuery(updated);
    } catch (error) {
      console.error(error);
      setActionError("Unable to update query status.");
    }
  }

  async function handleAddNote() {
    if (!selectedQuery || !noteText.trim()) return;

    setActionError("");

    try {
      const updated = await addNote({
        id: selectedQuery._id,
        branch: selectedQuery.branch,
        text: noteText.trim(),
      }).unwrap();

      setSelectedQuery(updated);
      setNoteText("");
    } catch (error) {
      console.error(error);
      setActionError("Unable to add note.");
    }
  }

  async function handleDelete() {
    if (!selectedQuery) return;

    const confirmed = window.confirm(`Delete the query from ${selectedQuery.name}? This action cannot be undone.`);

    if (!confirmed) return;

    setActionError("");

    try {
      await deleteQuery({
        id: selectedQuery._id,
        branch: selectedQuery.branch,
      }).unwrap();

      setSelectedQuery(null);
    } catch (error) {
      console.error(error);
      setActionError("Unable to delete query.");
    }
  }

  function openQuery(query: QueryItem) {
    setSelectedQuery(query);
    setActionError("");
    setNoteText("");
  }

  function closeQuery() {
    setSelectedQuery(null);
    setActionError("");
    setNoteText("");
  }

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">Customer Support</p>

          <div className="mt-2 flex items-center gap-3">
            <MessageSquare className="size-7 text-primary" />

            <h1 className="font-serif text-4xl tracking-tight text-primary">Queries</h1>
          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Manage customer enquiries, follow-ups, and internal query notes.
          </p>
        </div>

        <Button variant="outline" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`} />

          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </header>

      {/* STATS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Queries" value={stats.total} icon={<MessageSquare className="size-5" />} />

        <StatCard label="Pending" value={stats.pending} icon={<Clock3 className="size-5" />} />

        <StatCard label="In Progress" value={stats.inProgress} icon={<Loader2 className="size-5" />} />

        <StatCard label="Resolved" value={stats.resolved} icon={<CheckCircle2 className="size-5" />} />
      </section>

      {/* FILTERS */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, subject or message..."
                className="pl-9"
              />
            </div>

            <Select value={branch} onValueChange={setBranch}>
              <SelectTrigger className="w-full md:w-[220px]">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>

              <SelectContent>
                {BRANCHES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* ERROR */}
      {isError ? (
        <Card className="border-destructive/30">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-5 text-destructive" />
            </div>

            <div className="flex-1">
              <p className="font-medium">Unable to load queries</p>

              <p className="text-sm text-muted-foreground">Please check your connection and try again.</p>
            </div>

            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : null}

      {/* TABLE */}
      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-background">
          <div>
            <CardTitle>Customer Queries</CardTitle>

            <CardDescription className="mt-1">
              {filteredQueries.length} {filteredQueries.length === 1 ? "query" : "queries"} found
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-secondary/30 hover:bg-secondary/30">
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" />
                        Loading queries...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredQueries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-40 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <MessageSquare className="mb-2 size-7 text-muted-foreground" />

                        <p className="font-medium">No queries found</p>

                        <p className="mt-1 text-sm text-muted-foreground">Try changing the branch or search filter.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQueries.map((query) => (
                    <TableRow key={query._id} className="group">
                      {/* CUSTOMER */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary text-muted-foreground">
                            <User className="size-4" />
                          </div>

                          <div className="min-w-0">
                            <p className="font-medium">{query.name || "Unknown"}</p>

                            <p className="max-w-[220px] truncate text-xs text-muted-foreground">{query.email}</p>
                          </div>
                        </div>
                      </TableCell>

                      {/* SUBJECT */}
                      <TableCell>
                        <div className="max-w-[280px]">
                          <p className="truncate font-medium">{query.subject || "No subject"}</p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">{query.message}</p>
                        </div>
                      </TableCell>

                      {/* BRANCH */}
                      <TableCell>
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                          {getBranchLabel(query.branch)}
                        </span>
                      </TableCell>

                      {/* STATUS */}
                      <TableCell>
                        <Badge variant={getStatusVariant(query.status)} className="font-normal">
                          {getStatusLabel(query.status)}
                        </Badge>
                      </TableCell>

                      {/* RECEIVED */}
                      <TableCell>
                        <span className="whitespace-nowrap text-sm text-muted-foreground">
                          {formatDate(query.createdAt)}
                        </span>
                      </TableCell>

                      {/* ACTION */}
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openQuery(query)}>
                          <Eye className="mr-2 size-4" />
                          View
                          <ChevronRight className="ml-1 size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* DETAIL PANEL */}
      {selectedQuery ? (
        <div className="fixed inset-0 z-50">
          {/* BACKDROP */}
          <button
            type="button"
            aria-label="Close query details"
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={closeQuery}
          />

          {/* PANEL */}
          <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col border-l bg-background shadow-2xl">
            {/* PANEL HEADER */}
            <div className="flex shrink-0 items-center justify-between border-b px-6 py-4">
              <div className="min-w-0">
                <p className="text-lg font-semibold text-primary">Query Details</p>

                <p className="mt-0.5 text-sm text-muted-foreground">{formatDateTime(selectedQuery.createdAt)}</p>
              </div>

              <Button variant="ghost" size="icon" onClick={closeQuery} aria-label="Close query details">
                <X className="size-5" />
              </Button>
            </div>

            {/* PANEL CONTENT */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-6 p-6">
                {/* CUSTOMER */}
                <div className="rounded-lg border bg-card p-4">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
                      <User className="size-5 text-muted-foreground" />
                    </div>

                    <div className="min-w-0">
                      <p className="font-semibold">{selectedQuery.name || "Unknown"}</p>

                      <p className="truncate text-sm text-muted-foreground">{selectedQuery.email}</p>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Branch</p>

                      <p className="mt-1 text-sm">{getBranchLabel(selectedQuery.branch)}</p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Created</p>

                      <p className="mt-1 text-sm">{formatDateTime(selectedQuery.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* SUBJECT */}
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Subject
                  </p>

                  <h2 className="text-xl font-semibold tracking-tight">{selectedQuery.subject || "No subject"}</h2>
                </div>

                {/* MESSAGE */}
                <div>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Message
                  </p>

                  <div className="rounded-lg border bg-secondary/30 p-4 text-sm leading-6 whitespace-pre-wrap">
                    {selectedQuery.message || "No message provided."}
                  </div>
                </div>

                {/* STATUS */}
                <div className="space-y-2">
                  <Label>Status</Label>

                  <Select
                    value={selectedQuery.status || "NEW"}
                    onValueChange={handleStatusChange}
                    disabled={isUpdating}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>

                    <SelectContent>
                      {STATUS_OPTIONS.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {isUpdating ? (
                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Loader2 className="size-3 animate-spin" />
                      Updating status...
                    </p>
                  ) : null}
                </div>

                {/* NOTES */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">Internal Notes</p>

                      <p className="text-xs text-muted-foreground">Add notes for your team.</p>
                    </div>

                    <Badge variant="secondary">{selectedQuery.notes?.length ?? 0}</Badge>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      value={noteText}
                      onChange={(event) => setNoteText(event.target.value)}
                      placeholder="Write an internal note..."
                      rows={4}
                    />

                    <Button onClick={handleAddNote} disabled={!noteText.trim() || isAddingNote} className="w-full">
                      {isAddingNote ? (
                        <>
                          <Loader2 className="mr-2 size-4 animate-spin" />
                          Adding Note...
                        </>
                      ) : (
                        <>
                          <Plus className="mr-2 size-4" />
                          Add Note
                        </>
                      )}
                    </Button>
                  </div>

                  {selectedQuery.notes && selectedQuery.notes.length > 0 ? (
                    <div className="space-y-3">
                      {selectedQuery.notes
                        .slice()
                        .reverse()
                        .map((note, index) => (
                          <div key={note._id ?? index} className="rounded-lg border bg-card p-3">
                            <p className="text-sm leading-6 whitespace-pre-wrap">{note.text}</p>

                            <p className="mt-2 text-xs text-muted-foreground">{formatDateTime(note.createdAt)}</p>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed p-5 text-center">
                      <p className="text-sm text-muted-foreground">No internal notes yet.</p>
                    </div>
                  )}
                </div>

                {/* ACTION ERROR */}
                {actionError ? (
                  <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
                    <AlertCircle className="mt-0.5 size-4 shrink-0" />

                    <span>{actionError}</span>
                  </div>
                ) : null}

                {/* DELETE */}
                <div className="border-t pt-6">
                  <Button
                    variant="outline"
                    className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? <Loader2 className="mr-2 size-4 animate-spin" /> : <Trash2 className="mr-2 size-4" />}

                    {isDeleting ? "Deleting..." : "Delete Query"}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
  return (
    <Card className="transition-colors hover:border-primary/20">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>

          <p className="mt-1 text-3xl font-semibold tracking-tight text-primary">{value}</p>
        </div>

        <div className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">{icon}</div>
      </CardContent>
    </Card>
  );
}
