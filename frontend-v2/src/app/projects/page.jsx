"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import ProjectsContent from "./projects-content";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div style={{ padding: 100 }}>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
