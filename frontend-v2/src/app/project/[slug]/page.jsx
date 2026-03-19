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

  if (isProjectError || !project) {
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
      <section className="relative w-full h-[85vh] min-h-[500px]">
        <Image
          src={project.image || "/placeholder.jpg"}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10" />

        <div className="absolute bottom-16 left-12 text-white">
          <h1 className="text-6xl font-light">{project.title}</h1>
          <div className="text-xs tracking-[3px] uppercase text-[#d9af61] mb-4">
            {project.category}
          </div>
        </div>
      </section>

      {/* INFO */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-20">
          <AnimateIn>
            <div className="space-y-10">
              {[
                { label: "Location", value: project.location },
                { label: "Area", value: project.area },
                { label: "Year", value: project.year },
                { label: "Type", value: project.category },
                { label: "Scope", value: project.scope },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-xs tracking-[3px] uppercase text-[#d9af61] mb-2">
                    {item.label}
                  </div>
                  <div className="text-lg text-[#1a3c34]">
                    {item.value || "—"}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>

          <AnimateIn className="lg:col-span-2">
            <p className="text-xl text-gray-700 leading-relaxed">
              {project.description}
            </p>

            {project.details && (
              <div className="mt-10 text-gray-700 whitespace-pre-line">
                {project.details}
              </div>
            )}
          </AnimateIn>
        </div>
      </section>

      {/* GALLERY */}
      {project.images?.length > 0 && (
        <section className="px-6 md:px-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-sm tracking-[4px] uppercase mb-12">
              Project Gallery
            </h2>

            <GalleryWithText project={project} />
          </div>
        </section>
      )}

      {/* NAVIGATION */}
      <section className="border-t py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between">
          {prevProject ? (
            <Link
              href={`/project/${prevProject.slug}`}
              className="flex items-center gap-3"
            >
              <ArrowLeft size={20} />
              <div>
                <div className="text-xs uppercase text-gray-500">Previous</div>
                <div className="text-lg">{prevProject.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextProject ? (
            <Link
              href={`/project/${nextProject.slug}`}
              className="flex items-center gap-3"
            >
              <div className="text-right">
                <div className="text-xs uppercase text-gray-500">Next</div>
                <div className="text-lg">{nextProject.title}</div>
              </div>
              <ArrowRight size={20} />
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
      textIdx < galleryTexts.length
    ) {
      items.push({
        type: "text",
        ...galleryTexts[textIdx],
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
                <h3 className="text-sm uppercase tracking-[3px] mb-4">
                  {item.heading}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.body}</p>
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
