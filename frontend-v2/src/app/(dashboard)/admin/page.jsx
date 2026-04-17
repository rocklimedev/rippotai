"use client";

import Link from "next/link";
import { format } from "date-fns";
import { FileText, MessageSquare, Users, ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

import { useGetProjectsQuery } from "@/api/projectsApi";
import { useGetApplicationsQuery } from "@/api/applicationsApi";
import { useGetQueriesQuery } from "@/api/queriesApi";
import { useGetProfileQuery } from "@/api/authApi";

const BRANCH = "rippotai";

export default function AdminDashboard() {
  // ─────────────── API Calls ───────────────
  const { data: projectsRes, isLoading: pLoading } = useGetProjectsQuery({
    page: 1,
    limit: 5,
  });

  const { data: appsRes, isLoading: aLoading } = useGetApplicationsQuery();

  const { data: queriesRes, isLoading: qLoading } = useGetQueriesQuery(BRANCH);

  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

  // ─────────────── Safe Data Extraction ───────────────
  const projects = projectsRes?.data?.data ?? [];
  const applications = appsRes?.data ?? [];
  const queries = queriesRes?.data ?? [];

  const isLoading = pLoading || aLoading || qLoading || profileLoading;

  // ─────────────── Stats ───────────────
  const stats = [
    {
      title: "Projects",
      value: projects.length,
      icon: FileText,
      link: "/admin/projects",
    },
    {
      title: "Inquiries",
      value: queries.length,
      icon: MessageSquare,
      link: "/admin/queries",
    },
    {
      title: "Applications",
      value: applications.length,
      icon: Users,
      link: "/admin/applications",
    },
  ];

  // ─────────────── Loading UI ───────────────
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back
          {profile?.name ? `, ${profile.name.split(" ")[0]}` : ""} 👋
        </h1>
        <p className="text-muted-foreground mt-1">
          Here’s what’s happening today.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;

          return (
            <Card key={i} className="hover:shadow-md transition">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="p-2 bg-muted rounded-lg">
                  <Icon className="h-5 w-5" />
                </div>

                <Link
                  href={stat.link}
                  className="text-sm text-muted-foreground flex items-center gap-1 hover:text-primary"
                >
                  View <ArrowRight size={14} />
                </Link>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold">{stat.value}</h2>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <RecentCard
          title="Recent Projects"
          link="/admin/projects"
          items={projects}
          empty="No projects found"
          render={(item) => (
            <>
              <p className="font-medium truncate">{item.title || "Untitled"}</p>
              <div className="text-xs text-muted-foreground flex gap-2">
                <Badge variant="secondary">{item.category || "General"}</Badge>
                <span>
                  {item.createdAt
                    ? format(new Date(item.createdAt), "dd MMM yyyy")
                    : "—"}
                </span>
              </div>
            </>
          )}
        />

        {/* Queries */}
        <RecentCard
          title="Recent Inquiries"
          link="/admin/queries"
          items={queries}
          empty="No inquiries"
          render={(item) => (
            <>
              <p className="font-medium truncate">
                {item.subject || "No subject"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {item.name || "Anonymous"} • {item.email || "—"}
              </p>
            </>
          )}
        />
      </div>
    </div>
  );
}

// ─────────────── Reusable Recent Card ───────────────
function RecentCard({ title, items, render, empty, link }) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>

        <Link
          href={link}
          className="text-sm text-primary flex items-center gap-1"
        >
          View all <ArrowRight size={14} />
        </Link>
      </CardHeader>

      <CardContent>
        {items?.length ? (
          <div className="divide-y">
            {items.slice(0, 5).map((item) => (
              <div
                key={item._id || item.id}
                className="py-3 hover:bg-muted/50 px-2 rounded-md transition"
              >
                {render(item)}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-6">
            {empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
