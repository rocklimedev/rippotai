"use client";

import { useScopedBehavior } from "@/lib/scope";
import { useCallback } from "react";
import { useGetPublicProjectsQuery } from "@/api/projectsApi";
import type { Scope } from "@/lib/scope";
import init from "./projectsBehavior";

/** Refresh DOM bindings when the asynchronously loaded projects are rendered. */
export default function Behavior() {
  const { data, isLoading, isError } = useGetPublicProjectsQuery({ page: 1, limit: 100 });
  const initialize = useCallback((scope: Scope) => init(scope), [data, isLoading, isError]);
  useScopedBehavior(initialize);
  return null;
}
