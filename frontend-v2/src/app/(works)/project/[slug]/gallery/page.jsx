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
      {/* HERO BANNER (same as detail page) */}
      {project?.banner && (
        <section className="bg-white pt-0 pb-16">
          <div className="relative w-full aspect-[18/9] md:aspect-[26/9] overflow-hidden group">
            <Image
              src={project.banner}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              quality={90}
              unoptimized
              className="object-cover transition duration-700"
            />
          </div>
        </section>
      )}

      {/* CONTENT */}
      <section className="px-6 md:px-12 py-24 md:py-28">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16 flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-start">
            <h1 className="text-4xl md:text-5xl font-light text-[#1a3c34] leading-tight sm:max-w-[65%]">
              {isLoading
                ? 'Loading...'
                : project?.title
                  ? `${project.title} — Gallery`
                  : 'Gallery'}
            </h1>

            {slug && (
              <Link
                href={`/project/${slug}`}
                className="shrink-0 mt-2 sm:mt-4 group inline-flex items-center gap-3 text-gray-700 hover:text-[#1a3c34] transition-colors"
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
