"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import GalleryWithText from "@/components/GalleryText";
import { AnimateIn } from "@/components/AnimateIn";

import {
  useGetProjectBySlugQuery,
  useGetPublicProjectsQuery,
} from "@/api/projectsApi";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useGetProjectBySlugQuery(slug, {
    skip: !slug,
  });

  const project = projectResponse?.data ?? null;

  const { data: projectsList = [], isLoading: isListLoading } =
    useGetPublicProjectsQuery(
      { page: 1, limit: 100 },
      {
        selectFromResult: ({ data }) => ({
          data: data?.data || [],
        }),
      },
    );

  if (isProjectLoading || isListLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-[#d9af61] rounded-full"></div>
      </div>
    );
  }

  if (isProjectError || !project || !slug) {
    notFound();
  }

  const currentIndex = projectsList.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null;
  const nextProject =
    currentIndex < projectsList.length - 1 && currentIndex !== -1
      ? projectsList[currentIndex + 1]
      : null;

  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="bg-white pt-0 pb-12 md:pb-16 px-0">
        <div className="w-full">
          {/* 🔥 BIGGER FULL-WIDTH BANNER */}
          <div className="relative w-full aspect-[18/9] md:aspect-[26/9] overflow-hidden group">
            <Image
              src={project.banner || "/placeholder.jpg"}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              quality={90}
              unoptimized
              className="object-cover transition duration-700"
            />
          </div>
          <div className="max-w-6xl mx-auto mt-10 md:mt-12 px-4 sm:px-6 md:px-12 lg:px-16">
            <div className="px-1 md:px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-3xl">
                {project.title}
              </h1>
              <div className="text-[10px] sm:text-xs tracking-[3px] uppercase text-[#d9af61] mb-3">
                {project.category}
              </div>
            </div>

            <div className="mt-10 md:mt-12 flex justify-center">
              <div className="inline-grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 md:gap-x-12 gap-y-6 text-xs sm:text-sm md:text-base text-center">
                {project.location && (
                  <div>
                    <span className="text-[#d9af61] uppercase tracking-wider text-[10px] block mb-1">
                      Location
                    </span>
                    {project.location}
                  </div>
                )}

                <div>
                  <span className="text-[#d9af61] uppercase tracking-wider text-[10px] block mb-1">
                    Year
                  </span>
                  {project.year || new Date(project.createdAt).getFullYear()}
                </div>

                {project.area && (
                  <div>
                    <span className="text-[#d9af61] uppercase tracking-wider text-[10px] block mb-1">
                      Area
                    </span>
                    {project.area}
                  </div>
                )}

                {project.scope && (
                  <div>
                    <span className="text-[#d9af61] uppercase tracking-wider text-[10px] block mb-1">
                      Scope
                    </span>
                    {project.scope}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimateIn>
            <div className="prose prose-lg md:prose-xl max-w-none text-gray-700">
              <p className="text-2xl md:text-3xl font-light leading-snug mb-12 text-black">
                {project.description}
              </p>

              <div className="w-12 h-px bg-[#d9af61] mb-12" />

              {project.details && (
                <div className="whitespace-pre-line text-lg md:text-xl leading-relaxed text-gray-600 space-y-6">
                  {project.details}
                </div>
              )}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <section className="px-6 md:px-12 pb-32 pt-16">
          <div className="max-w-7xl mx-auto">
            <GalleryWithText project={project} />
          </div>
        </section>
      )}

      {/* NAVIGATION */}
      <section className="border-t py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {prevProject ? (
            <Link
              href={`/project/${prevProject.slug}`}
              className="flex items-center gap-4 group"
            >
              <ArrowLeft className="group-hover:-translate-x-1 transition" />
              <div>
                <div className="text-xs uppercase text-gray-500">Previous</div>
                <div className="text-xl font-light group-hover:text-[#d9af61] transition">
                  {prevProject.title}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/project/${nextProject.slug}`}
              className="flex items-center gap-4 group"
            >
              <div className="text-right">
                <div className="text-xs uppercase text-gray-500">Next</div>
                <div className="text-xl font-light group-hover:text-[#d9af61] transition">
                  {nextProject.title}
                </div>
              </div>
              <ArrowRight className="group-hover:translate-x-1 transition" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>
    </main>
  );
}
