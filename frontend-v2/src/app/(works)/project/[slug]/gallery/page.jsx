'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import { useGetProjectBySlugQuery } from '@/api/projectsApi';

export default function ProjectGalleryPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const { data, isLoading } = useGetProjectBySlugQuery(slug, {
    skip: !slug || typeof slug !== 'string',
  });

  const project = data?.data;
  const images = project?.images || [];

  return (
    <main className="min-h-screen bg-white">
      {/* HERO BANNER */}
      {project?.banner && (
        <section className="relative w-full h-[70vh] overflow-hidden">
          <Image
            src={project.banner}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            quality={90}
            unoptimized
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Title over image */}
          <div className="absolute bottom-12 left-6 md:left-16 z-10 text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {isLoading
                ? 'Loading...'
                : project?.title
                  ? `${project.title}`
                  : 'Gallery'}
            </h1>
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header Row */}
          {slug && (
            <div className="mb-14 flex items-center justify-between">
              {/* Gallery Title */}
              <h2 className="text-2xl md:text-3xl font-light text-[#1a3c34] tracking-wide">
                Gallery
              </h2>

              {/* Back Link */}
              <Link
                href={`/project/${slug}`}
                className="group inline-flex items-center gap-2 text-gray-700 hover:text-[#1a3c34] transition-colors"
              >
                <span className="text-lg">←</span>
                <span className="text-base font-light tracking-wide group-hover:underline">
                  Back to Project
                </span>
              </Link>
            </div>
          )}

          {/* Gallery */}
          {isLoading ? (
            <div className="text-center py-24 text-gray-500">
              Loading gallery...
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-24 text-gray-500">
              No images available for this project.
            </div>
          ) : (
            <PhotoProvider maskOpacity={0.92} photoClosable speed={() => 320}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {images.map((img, i) => {
                  const imageSrc = `${img}?v=${project?.updatedAt || ''}`;

                  return (
                    <PhotoView key={i} src={imageSrc}>
                      <div className="cursor-zoom-in rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center bg-white">
                        <Image
                          src={imageSrc}
                          alt={`Gallery image ${i + 1}`}
                          width={800}
                          height={600}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          quality={82}
                          unoptimized
                          className="w-full h-auto max-h-[500px] object-contain transition-transform duration-700 ease-out hover:scale-105"
                        />
                      </div>
                    </PhotoView>
                  );
                })}
              </div>
            </PhotoProvider>
          )}
        </div>
      </section>
    </main>
  );
}
