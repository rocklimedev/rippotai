import type { Metadata } from "next";

import ProjectPageClient from "./ProjectPageClient";

export const metadata: Metadata = {
  title: "Project | Rippotai Architecture",
  description: "Explore a Rippotai Architecture project.",
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <ProjectPageClient slug={slug} />;
}
