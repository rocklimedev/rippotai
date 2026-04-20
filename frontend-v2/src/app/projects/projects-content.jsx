"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetPublicProjectsQuery } from "@/api/projectsApi";
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
import { AnimateIn } from "../../components/AnimateIn";

export default function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ Read directly from URL (no extra state needed)
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const selectedCategory = searchParams.get("category") || null;

  const limit = 6;

  // ================= API CALL =================
  const {
    data: apiResponse,
    isLoading,
    isError,
    error,
  } = useGetPublicProjectsQuery(
    {
      page: currentPage,
      limit,
      ...(selectedCategory && { category: selectedCategory }),
    },
    { refetchOnMountOrArgChange: true },
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

  // ================= URL UPDATE =================
  const updateURL = (page, category) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page);
    if (category) params.set("category", category);

    const queryString = params.toString();
    router.push(`/projects${queryString ? `?${queryString}` : ""}`, {
      scroll: false,
    });
  };

  // ================= HANDLERS =================
  const handleCategoryChange = (cat) => {
    const newCategory = selectedCategory === cat ? null : cat;
    updateURL(1, newCategory);
  };

  const handlePageChange = (page) => {
    updateURL(page, selectedCategory);
  };

  const handlePrevious = () => {
    if (hasPrevious) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (hasNext) handlePageChange(currentPage + 1);
  };

  // ================= PAGINATION LOGIC =================
  const pageNumbers = useMemo(() => {
    const pages = [];
    const delta = 2;

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
  }, [currentPage, totalPages]);

  return (
    <>
      {/* Banner */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          backgroundColor: "#0a0a0a",
        }}
      >
        <img
          src={projectsImage}
          alt="Our Projects"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
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
              color: "#fff",
            }}
          >
            Our Projects
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section style={{ padding: "80px 48px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <AnimateIn>
            <p
              style={{
                fontFamily: "'Lato', sans-serif",
                fontSize: "16px",
                color: "#666",
                lineHeight: 1.8,
              }}
            >
              A curated selection of our work across architecture, interiors,
              and furniture design.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Category Filters */}
      <section style={{ padding: "0 48px 40px" }}>
        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {["Residential", "Commercial", "Institutional", "Hospitality"].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  backgroundColor: "transparent",
                  color: selectedCategory === cat ? "#c6a15b" : "#1a3c34",
                  cursor: "pointer",
                  fontSize: "13.5px",
                  letterSpacing: "0.5px",
                  border: "none",
                  borderBottom:
                    selectedCategory === cat
                      ? "2px solid #c6a15b"
                      : "2px solid transparent",
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>
      </section>

      {/* Projects List */}
      <section style={{ padding: "0 48px 120px", backgroundColor: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {isLoading ? (
            <div style={{ textAlign: "center", padding: "120px 0" }}>
              Loading projects...
            </div>
          ) : isError ? (
            <div style={{ textAlign: "center", color: "red" }}>
              {error?.data?.message || "Failed to load projects"}
            </div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: "center", padding: "100px 0" }}>
              No projects found.
            </div>
          ) : (
            <>
              {projects.map((project, idx) => (
                <AnimateIn key={project._id || project.slug}>
                  <ProjectRow project={project} reverse={idx % 2 !== 0} />
                </AnimateIn>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ marginTop: "100px" }}>
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePrevious}
                          className={
                            !hasPrevious ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>

                      {pageNumbers.map((page, i) => (
                        <PaginationItem key={i}>
                          {page === "ellipsis" ? (
                            <PaginationEllipsis />
                          ) : (
                            <PaginationLink
                              isActive={page === currentPage}
                              onClick={() => handlePageChange(page)}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}

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
