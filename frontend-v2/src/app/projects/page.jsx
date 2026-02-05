// app/projects/page.jsx   ← Server Component (no "use client")
export const dynamic = "force-dynamic";
import { Suspense } from "react";
import ProjectsContent from "./ProjectsContent"; // ← new file, see below

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      {/* Hero Section */}
      <section className="projects-hero" />

      {/* Main Content with Suspense */}
      <section className="our-project-wrapper">
        <div className="custom-container">
          <div className="custom-row">
            <div className="custom-col-12">
              <div className="heading text-center">
                <h2>Our Projects</h2>
                <p>
                  Explore our diverse portfolio across residential and
                  institutional developments.
                </p>
              </div>
            </div>
          </div>

          {/* Suspense wraps the dynamic part */}
          <Suspense
            fallback={
              <div className="text-center py-10">
                <p>Loading projects and filters...</p>
              </div>
            }
          >
            <ProjectsContent />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
