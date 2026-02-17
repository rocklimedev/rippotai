// app/projects/[slug]/page.jsx
"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AnimateIn } from "@/components/AnimateIn"; // adjust path as needed

import {
  useGetProjectBySlugQuery,
  useGetPublicProjectsQuery,
} from "@/api/rippotaiApi";
// Gallery overlay texts (can be moved to a constants file later)
const galleryTexts = [
  {
    heading: "Material & Light",
    body: "A dialogue between natural materials and carefully orchestrated light — each surface chosen to age gracefully, each opening designed to frame the sky.",
  },
  {
    heading: "Spatial Rhythm",
    body: "Spaces that breathe. The interplay of volume, proportion, and restraint creates a quiet rhythm throughout the home.",
  },
  {
    heading: "Crafted Details",
    body: "Every joint, every edge, every threshold is considered — where architecture meets the precision of craft.",
  },
];

export default function ProjectDetailPage({ params }) {
  const { slug } = useParams(params);

  // Fetch the current project
  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
    error: projectError,
  } = useGetProjectBySlugQuery(slug, {
    skip: !slug,
  });

  const project = projectResponse?.data;

  console.log("Current slug:", slug);
  console.log("Project data:", project);
  // Fetch list of projects for prev/next navigation
  const { data: projectsList = [], isLoading: isListLoading } =
    useGetPublicProjectsQuery(
      { page: 1, limit: 100 }, // high limit — adjust based on your backend
      {
        selectFromResult: ({ data }) => ({
          data: data?.data || [], // assuming your /public endpoint returns { data: [...] }
        }),
      },
    );

  // ──────────────────────────────────────────────
  // Loading / Error / Not Found states
  // ──────────────────────────────────────────────
  if (isProjectLoading || isListLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#d9af61] mx-auto mb-6"></div>
          <p className="text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (isProjectError) {
    console.error("Project fetch error:", projectError);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md px-6">
          <h2 className="text-2xl font-light text-gray-800 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't load this project. Please try again later.
          </p>
          <Link
            href="/projects"
            className="inline-block px-6 py-3 bg-[#1a3c34] text-white hover:bg-[#2a4c44] transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Navigation logic
  const currentIndex = projectsList.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsList.length - 1 && currentIndex !== -1
      ? projectsList[currentIndex + 1]
      : null;

  return (
    <main className="bg-white">
      {/* Hero Banner */}
      <section className="relative w-full h-[85vh] min-h-[500px] overflow-hidden bg-[#0a0a0a]">
        <Image
          src={project.image || "/placeholder-hero.jpg"}
          alt={project.title}
          fill
          priority
          quality={85}
          sizes="(max-width: 768px) 100vw, 85vw"
          className="object-cover object-center"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/OhPPQAJJAPXdxCaAAAAAElFTkSuQmCC"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

        <div className="absolute bottom-16 left-12 right-12 z-10 text-white">
          <div className="text-xs font-normal tracking-[3px] uppercase text-[#d9af61] mb-4">
            PROJECT {String(project.id || currentIndex + 1).padStart(2, "0")} /{" "}
            {project.category}
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-[2px] leading-tight">
            {project.title}
          </h1>
          <div className="w-10 h-px bg-[#d9af61] mt-8" />
        </div>
      </section>

      {/* Project Info */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            {/* Meta */}
            <AnimateIn delay={0} distance={40} duration={1}>
              <div className="space-y-10">
                {[
                  { label: "Location", value: project.location },
                  { label: "Area", value: project.area },
                  { label: "Year", value: project.year },
                  { label: "Type", value: project.category },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-xs font-medium tracking-[3px] uppercase text-[#d9af61] mb-2">
                      {item.label}
                    </div>
                    <div className="text-lg font-light text-[#1a3c34]">
                      {item.value || "—"}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>

            {/* Description */}
            <AnimateIn
              delay={0.2}
              distance={40}
              duration={1.2}
              className="lg:col-span-2"
            >
              <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images?.length > 0 && (
        <section className="px-6 md:px-12 pb-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <AnimateIn delay={0} distance={30} duration={1}>
              <h2 className="text-sm font-medium tracking-[4px] uppercase text-[#1a3c34] mb-12">
                Project Gallery
              </h2>
            </AnimateIn>

            <GalleryWithText project={project} />
          </div>
        </section>
      )}

      {/* Prev / Next Navigation */}
      <section className="border-t border-[#1a3c34]/10 py-16 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-12">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 text-left hover:opacity-80 transition-opacity"
            >
              <ArrowLeft size={20} className="text-[#1a3c34]" />
              <div>
                <div className="text-xs font-medium tracking-[2px] uppercase text-gray-500">
                  Previous Project
                </div>
                <div className="text-xl font-normal text-[#1a3c34] mt-1 group-hover:underline">
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center gap-4 text-right hover:opacity-80 transition-opacity"
            >
              <div>
                <div className="text-xs font-medium tracking-[2px] uppercase text-gray-500">
                  Next Project
                </div>
                <div className="text-xl font-normal text-[#1a3c34] mt-1 group-hover:underline">
                  {nextProject.title}
                </div>
              </div>
              <ArrowRight size={20} className="text-[#1a3c34]" />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </main>
  );
}

// ──────────────────────────────────────────────
// Gallery Component
// ──────────────────────────────────────────────
function GalleryWithText({ project }) {
  const gallery = project.images || [];
  const total = gallery.length;
  const items = [];
  let textIdx = 0;

  gallery.forEach((img, idx) => {
    const isFeature = idx === 0 || idx === total - 1;
    items.push({ type: "image", src: img, idx, isFeature });

    if (
      (idx + 1) % 2 === 0 &&
      idx < total - 1 &&
      textIdx < galleryTexts.length
    ) {
      items.push({ type: "text", ...galleryTexts[textIdx] });
      textIdx++;
    }
  });

  return (
    <div className="space-y-16 md:space-y-24">
      {items.map((item, i) => {
        if (item.type === "text") {
          return (
            <AnimateIn key={`text-${i}`} delay={0.1} distance={30} duration={1}>
              <div className="max-w-2xl mx-auto px-4 text-center md:text-left">
                <div className="w-8 h-px bg-[#d9af61] mb-6 mx-auto md:mx-0" />
                <h3 className="text-sm font-medium tracking-[3px] uppercase text-[#1a3c34] mb-4">
                  {item.heading}
                </h3>
                <p className="text-base md:text-lg font-light text-gray-600 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </AnimateIn>
          );
        }

        if (item.isFeature) {
          return (
            <AnimateIn
              key={`img-${item.idx}`}
              delay={0.1}
              distance={40}
              duration={1.2}
            >
              <div className="overflow-hidden bg-[#f0eeea]">
                <Image
                  src={item.src}
                  alt={`${project.title} - ${item.idx + 1}`}
                  width={1400}
                  height={900}
                  sizes="(max-width: 768px) 100vw, 90vw"
                  quality={85}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </AnimateIn>
          );
        }

        // Pair of images
        const nextItem = items[i + 1];
        const hasNext =
          nextItem && nextItem.type === "image" && !nextItem.isFeature;

        return (
          <AnimateIn
            key={`pair-${item.idx}`}
            delay={0.1}
            distance={40}
            duration={1.2}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="overflow-hidden bg-[#f0eeea]">
                <Image
                  src={item.src}
                  alt={`${project.title} - ${item.idx + 1}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 45vw"
                  quality={85}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {hasNext && (
                <div className="overflow-hidden bg-[#f0eeea]">
                  <Image
                    src={nextItem.src}
                    alt={`${project.title} - ${nextItem.idx + 1}`}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    quality={85}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              )}
            </div>
          </AnimateIn>
        );
      })}
    </div>
  );
}
