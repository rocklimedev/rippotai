"use client";
import { useState } from "react";
import { AnimateIn } from "../../components/AnimateIn";
import { useGetPublicProjectsQuery } from "@/api/projectsApi";

// Import Shadcn Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { projectsImage } from "@/lib/config";
import ProjectRow from "@/components/ProjectRow";
export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;

  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetPublicProjectsQuery(
    { page: currentPage, limit },
    { keepUnusedDataFor: 60 },
  );

  const projects = apiResponse?.data ?? [];
  const pagination = apiResponse?.pagination ?? {
    page: 1,
    limit,
    total: 0,
    pages: 1,
  };

  const totalPages = pagination.pages || 1;
  const hasPrevious = currentPage > 1;
  const hasNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (hasPrevious) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (hasNext) setCurrentPage((prev) => prev + 1);
  };

  // Generate page numbers (with ellipsis logic)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2; // show 2 pages before/after current

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        pages.push(i);
      } else if (
        (i === currentPage - delta - 1 || i === currentPage + delta + 1) &&
        !pages.includes("ellipsis")
      ) {
        pages.push("ellipsis");
      }
    }
    return pages;
  };

  return (
    <>
      {/* Banner Section - unchanged */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
        data-testid="works-banner"
      >
        <img
          src={projectsImage}
          alt="Our Projects"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.2))",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "48px",
            zIndex: 2,
          }}
        >
          <h1
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 300,
              color: "#ffffff",
              margin: 0,
            }}
          >
            Our Projects
          </h1>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "#d9af61",
              marginTop: "20px",
            }}
          />
        </div>
      </section>

      {/* Intro Text - unchanged */}
      <section style={{ padding: "80px 48px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn delay={0} distance={30} duration={1}>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                fontWeight: 300,
                color: "#666666",
                lineHeight: 1.8,
                maxWidth: "600px",
                margin: 0,
              }}
            >
              A curated selection of our work across architecture, interiors,
              and furniture design — each project shaped by precision, purpose,
              and the enduring simplicity of the cube.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Projects Grid + Pagination */}
      <section style={{ padding: "0 48px 120px", backgroundColor: "#ffffff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {isLoading ? (
            <div
              style={{
                textAlign: "center",
                padding: "120px 0",
                fontFamily: "'Lato', sans-serif",
                color: "#1a3c34",
                fontSize: "18px",
              }}
            >
              Loading projects...
            </div>
          ) : isError ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#d32f2f",
                fontSize: "16px",
              }}
            >
              <p>Failed to load projects.</p>
              <p style={{ fontSize: "14px", marginTop: "8px" }}>
                {error?.data?.message || error?.message || "Unknown error"}
              </p>
            </div>
          ) : projects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "100px 0",
                color: "#666",
                fontSize: "17px",
              }}
            >
              No projects found at the moment.
            </div>
          ) : (
            <>
              {/* Project Rows */}
              {projects.map((project, idx) => (
                <AnimateIn
                  key={project._id || project.slug}
                  delay={0.1 * idx}
                  distance={70}
                  duration={1.3}
                >
                  <ProjectRow project={project} reverse={idx % 2 !== 0} />
                </AnimateIn>
              ))}

              {/* Shadcn Pagination */}
              {totalPages > 1 && (
                <div style={{ marginTop: "100px" }}>
                  <Pagination>
                    <PaginationContent>
                      {/* Previous Button */}
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePrevious}
                          className={
                            !hasPrevious ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>

                      {/* Page Numbers */}
                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === "ellipsis" ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

                      {/* Next Button */}
                      <PaginationItem>
                        <PaginationNext
                          onClick={handleNext}
                          className={
                            !hasNext ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
