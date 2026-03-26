"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { AnimateIn } from "@/components/AnimateIn";

import {
  useGetProjectBySlugQuery,
  useGetPublicProjectsQuery,
} from "@/api/rippotaiApi";

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
      <section className="bg-white pt-16 md:pt-20 pb-12 md:pb-16 px-4 sm:px-6 md:px-12 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="relative w-full max-w-6xl mx-auto aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg md:rounded-xl">
            <Image
              src={project.banner || "/placeholder.jpg"}
              alt={project.title}
              fill
              priority
              quality={90}
              className="object-cover transition duration-700 hover:scale-105"
            />
          </div>

          <div className="max-w-6xl mx-auto mt-10 md:mt-12">
            <div className="px-1 md:px-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light leading-tight max-w-3xl">
                {project.title}
              </h1>
              <div className="text-[10px] sm:text-xs tracking-[3px] uppercase text-[#d9af61] mb-3">
                {project.category}
              </div>
            </div>

            <div className="mt-10 md:mt-12 flex justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 md:gap-x-12 gap-y-6 text-xs sm:text-sm md:text-base text-center">
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

                {project.status && (
                  <div>
                    <span className="text-[#d9af61] uppercase tracking-wider text-[10px] block mb-1">
                      Status
                    </span>
                    <span className="capitalize">{project.status}</span>
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

function GalleryWithText({ project }) {
  const allImages = project.images || [];
  const previewImages = allImages.slice(0, 5);
  const total = previewImages.length;

  // 🔥 Convert details string → paragraphs
  const detailBlocks = project.details
    ? project.details
        .split(/\n+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const items = [];
  let textIdx = 0;

  previewImages.forEach((img, idx) => {
    const isFeature = idx === 0 || idx === total - 1;

    items.push({
      type: "image",
      src: img,
      idx,
      isFeature,
    });

    if (
      (idx + 1) % 2 === 0 &&
      idx < total - 1 &&
      textIdx < detailBlocks.length
    ) {
      items.push({
        type: "text",
        body: detailBlocks[textIdx],
      });
      textIdx++;
    }
  });

  return (
    <div className="space-y-20">
      {items.map((item, i) => {
        if (item.type === "text") {
          return (
            <AnimateIn key={`text-${i}`}>
              <div className="max-w-2xl mx-auto text-center md:text-left">
                <div className="w-8 h-px bg-[#d9af61] mb-6" />
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                  {item.body}
                </p>
              </div>
            </AnimateIn>
          );
        }

        if (item.isFeature) {
          return (
            <AnimateIn key={`img-${item.idx}`}>
              <Image
                src={item.src}
                alt=""
                width={1400}
                height={900}
                className="w-full object-cover"
              />
            </AnimateIn>
          );
        }

        const nextItem = items[i + 1];
        const hasNext =
          nextItem && nextItem.type === "image" && !nextItem.isFeature;

        return (
          <AnimateIn key={`pair-${item.idx}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <Image
                src={item.src}
                alt=""
                width={800}
                height={600}
                className="object-cover"
              />

              {hasNext && (
                <Image
                  src={nextItem.src}
                  alt=""
                  width={800}
                  height={600}
                  className="object-cover"
                />
              )}
            </div>
          </AnimateIn>
        );
      })}

      {allImages.length > 5 && (
        <div className="text-center pt-10">
          <Link
            href={`/project/${project.slug}/gallery`}
            className="inline-block px-8 py-4 border border-[#1a3c34] text-[#1a3c34] hover:bg-[#1a3c34] hover:text-white transition"
          >
            See Full Gallery
          </Link>
        </div>
      )}
    </div>
  );
}
