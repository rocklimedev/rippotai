'use client';

import Link from 'next/link';
import { format } from 'date-fns';
import {
  FileText,
  MessageSquare,
  Users,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

import { useGetProjectsQuery } from '@/api/projectsApi';
import { useGetApplicationsQuery } from '@/api/applicationsApi';
import { useGetQueriesQuery } from '@/api/queriesApi';
import { useGetProfileQuery } from '@/api/authApi';

const BRANCH = 'rippotai';

export default function AdminDashboard() {
  // API Calls
  const { data: projectsRes, isLoading: pLoading } = useGetProjectsQuery({
    page: 1,
    limit: 5,
  });

  const { data: appsRes, isLoading: aLoading } = useGetApplicationsQuery();
  const { data: queriesRes, isLoading: qLoading } = useGetQueriesQuery(BRANCH);
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();

  // Safe Data Extraction
  const projects = projectsRes?.data?.data ?? [];
  const applications = appsRes?.data ?? [];
  const queries = queriesRes?.data ?? [];

  const isLoading = pLoading || aLoading || qLoading || profileLoading;

  // Stats with better icons and colors
  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
      link: '/admin/projects',
    },
    {
      title: 'New Inquiries',
      value: queries.length,
      icon: MessageSquare,
      color: 'text-amber-600',
      bg: 'bg-amber-100',
      link: '/admin/queries',
    },
    {
      title: 'Applications',
      value: applications.length,
      icon: Users,
      color: 'text-emerald-600',
      bg: 'bg-emerald-100',
      link: '/admin/applications',
    },
  ];

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-80" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-96 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-2 border-white shadow">
            <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              {profile?.name ? profile.name[0].toUpperCase() : 'A'}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {profile?.name?.split(' ')[0] || 'Admin'} 👋
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">
              Here&apos;s what&apos;s happening with your platform today.
            </p>
          </div>
        </div>

        <Button asChild size="lg" className="gap-2">
          <Link href="/admin/projects">
            Manage Projects <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards - More modern with subtle gradients */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/20 overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <Link
                  href={stat.link}
                  className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                >
                  View all <ArrowRight className="h-4 w-4" />
                </Link>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-muted-foreground tracking-wide">
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h2 className="text-5xl font-semibold tracking-tighter">
                    {stat.value}
                  </h2>
                  <TrendingUp className="h-5 w-5 text-emerald-500" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <RecentCard
          title="Recent Projects"
          icon={FileText}
          link="/admin/projects"
          items={projects}
          empty="No projects created yet"
          render={(item) => (
            <div className="flex justify-between items-start">
              <div className="space-y-1 flex-1 min-w-0">
                <p className="font-semibold truncate pr-4">
                  {item.title || 'Untitled Project'}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {item.category || 'General'}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {item.createdAt
                      ? format(new Date(item.createdAt), 'dd MMM yyyy')
                      : '—'}
                  </span>
                </div>
              </div>
            </div>
          )}
        />

        {/* Recent Inquiries */}
        <RecentCard
          title="Recent Inquiries"
          icon={MessageSquare}
          link="/admin/queries"
          items={queries}
          empty="No new inquiries"
          render={(item) => (
            <div className="space-y-1">
              <p className="font-semibold truncate">
                {item.subject || 'No subject provided'}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {item.name || 'Anonymous'} • {item.email}
              </p>
              <p className="text-xs text-muted-foreground">
                {item.createdAt
                  ? format(new Date(item.createdAt), 'dd MMM, hh:mm a')
                  : '—'}
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
}

// Reusable Recent Card - Improved with icon in header
function RecentCard({ title, icon: Icon, items, render, empty, link }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>

        <Button variant="ghost" size="sm" asChild>
          <Link href={link} className="flex items-center gap-1">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="p-0">
        {items?.length > 0 ? (
          <div className="divide-y">
            {items.slice(0, 5).map((item) => (
              <div
                key={item._id || item.id}
                className="p-5 hover:bg-muted/50 transition-colors"
              >
                {render(item)}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-muted-foreground">{empty}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
