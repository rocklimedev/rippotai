import { Suspense } from "react";

import ProjectWorkspaceClient from "@/components/ProjectWorkspaceClient";
function ProjectWorkspaceLoading() {
  return (
    <div className="mx-auto flex min-h-64 w-full max-w-6xl items-center justify-center">
      <div className="text-sm text-muted-foreground">Loading project workspace...</div>
    </div>
  );
}

export default function ProjectWorkspacePage() {
  return (
    <Suspense fallback={<ProjectWorkspaceLoading />}>
      <ProjectWorkspaceClient />
    </Suspense>
  );
}
