"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { useGetProjectBySlugQuery } from "@/api/rippotaiApi";

export default function ProjectGalleryPage() {
  // Normalize slug properly
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  // Safe query call
  const { data, isLoading } = useGetProjectBySlugQuery(slug, {
    skip: !slug || typeof slug !== "string",
  });

  const project = data?.data;
  const images = project?.images || [];

  return (
    <main className="min-h-screen bg-white px-6 md:px-12 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <h1 className="text-4xl md:text-5xl font-light text-[#1a3c34]">
            {isLoading
              ? "Loading..."
              : project?.title
                ? `${project.title} — Gallery`
                : "Gallery"}
          </h1>

          {/* Guard Link */}
          {slug && (
            <Link
              href={`/project/${slug}`}
              className="group inline-flex items-center gap-2 text-gray-700 hover:text-[#1a3c34] transition-colors"
            >
              <span className="text-xl">←</span>
              <span className="text-lg font-light tracking-wide group-hover:underline">
                Back to Project
              </span>
            </Link>
          )}
        </div>

        {/* Gallery */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            Loading gallery...
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No images available for this project.
          </div>
        ) : (
          <PhotoProvider maskOpacity={0.92} photoClosable speed={() => 320}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
              {images.map((img, i) => (
                <PhotoView key={i} src={img}>
                  <div className="cursor-zoom-in overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300 aspect-[4/3] relative">
                    <Image
                      src={img}
                      alt={`Gallery image ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                      quality={82}
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </PhotoProvider>
        )}
      </div>
    </main>
  );
}
