'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimateIn } from '@/components/layouts/AnimateIn';
import ProjectDetailSkeleton from '@/components/skeletons/ProjectDetailSkeleton';

import {
  useGetProjectBySlugQuery,
  useGetPublicProjectsQuery,
} from '@/api/projectsApi';

const getImageSrc = (image) => {
  if (!image) return '/placeholder.jpg';

  if (typeof image === 'string') return image;

  return (
    image.url ||
    image.image ||
    image.src ||
    image.path ||
    image.secure_url ||
    '/placeholder.jpg'
  );
};

const FullBleedImage = ({ src, alt = 'Project image', className = '' }) => {
  return (
    <div className={`relative overflow-hidden bg-[#f3f0eb] ${className}`}>
      <Image
        src={getImageSrc(src)}
        alt={alt}
        fill
        sizes="100vw"
        quality={90}
        className="object-cover"
      />
    </div>
  );
};

const TextBlock = ({ title, meta, children }) => {
  if (!children && !title && !meta) return null;

  return (
    <section className="py-[35px] px-[35px] md:px-[35px]">
      {/* REMOVE max-w-5xl constraint */}
      <div className="w-full">
        {(title || meta) && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-8">
            {title && (
              <h2 className="text-4xl md:text-6xl font-light leading-tight text-black">
                {title}
              </h2>
            )}

            {meta && (
              <div className="flex flex-nowrap items-start gap-10 text-sm md:text-base md:justify-end w-full overflow-x-auto">
                {meta}
              </div>
            )}
          </div>
        )}

        {children && (
          <div className="max-w-5xl text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-line">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
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

  const { data: projectsList = [], isLoading: isListLoading } =
    useGetPublicProjectsQuery(
      { page: 1, limit: 100 },
      {
        selectFromResult: ({ data }) => ({
          data: data?.data || [],
          isLoading: false,
        }),
      },
    );

  if (isProjectLoading || isListLoading) {
    return <ProjectDetailSkeleton />;
  }

  const project = projectResponse?.data ?? null;

  if (isProjectError || !project || !slug) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white px-6">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-light mb-4">
            Project not found
          </h1>
          <Link
            href="/projects"
            className="text-sm uppercase tracking-[3px] text-[#d9af61]"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const images = Array.from(
    new Set((project.images || []).map((img) => getImageSrc(img))),
  );

  const currentIndex = projectsList.findIndex((p) => p.slug === slug);

  const prevProject = currentIndex > 0 ? projectsList[currentIndex - 1] : null;

  const nextProject =
    currentIndex < projectsList.length - 1 && currentIndex !== -1
      ? projectsList[currentIndex + 1]
      : null;

  const recommendedProjects = projectsList
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full h-[85vh]">
        <Image
          src={project.banner || getImageSrc(images[0]) || '/placeholder.jpg'}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover"
        />
      </section>
      <TextBlock
        title={project.title}
        meta={
          <>
            {project.location && (
              <div>
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Location
                </span>
                {project.location}
              </div>
            )}

            <div>
              <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                Year
              </span>
              {project.year || new Date(project.createdAt).getFullYear()}
            </div>

            {project.area && (
              <div>
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Area
                </span>
                {project.area}
              </div>
            )}

            {project.scope && (
              <div>
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Scope
                </span>
                {project.scope}
              </div>
            )}

            {project.category && (
              <div>
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Category
                </span>
                {project.category}
              </div>
            )}
          </>
        }
      >
        {project.description}
      </TextBlock>
      {/* TWO BIG SQUARES - FULL BLEED */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          <FullBleedImage
            src={images[0]}
            alt={`${project.title} image 1`}
            className="aspect-square w-full"
          />
          <FullBleedImage
            src={images[1]}
            alt={`${project.title} image 2`}
            className="aspect-square w-full"
          />
        </div>
      </section>

      {/* RECTANGLE 1 */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-0">
        <FullBleedImage
          src={images[2]}
          alt={`${project.title} wide image 1`}
          className="w-full h-[420px] md:h-[800px]"
        />
      </section>

      {/* DETAILS 1 */}
      {project.details && <TextBlock>{project.details}</TextBlock>}

      {/* RECTANGLE 2 */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-[10px]">
        <FullBleedImage
          src={images[3]}
          alt={`${project.title} wide image 2`}
          className="w-full h-[420px] md:h-[800px]"
        />
      </section>

      {/* TWO BIG SQUARES AGAIN - FULL BLEED */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
          <FullBleedImage
            src={images[4]}
            alt={`${project.title} image 3`}
            className="aspect-square w-full"
          />
          <FullBleedImage
            src={images[5]}
            alt={`${project.title} image 4`}
            className="aspect-square w-full"
          />
        </div>
      </section>
      {/* IMAGE + TEXT */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pt-[6px] pb-[10px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px] items-center">
          <FullBleedImage
            src={images[6]}
            alt={`${project.title} feature image`}
            className="aspect-square w-full"
          />

          <div className="px-6 md:px-12 py-16 md:py-0 flex flex-col gap-[18px]">
            <AnimateIn>
              <h3 className="text-3xl md:text-5xl font-light leading-tight text-black">
                {project.highlightTitle || 'A Detailed Design Narrative'}
              </h3>

              <p className="text-lg md:text-xl leading-relaxed text-gray-700 whitespace-pre-line">
                {project.highlightDescription ||
                  project.description ||
                  project.details}
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>
      {/* RECTANGLE 3 */}
      <section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pb-0">
        <FullBleedImage
          src={images[7]}
          alt={`${project.title} wide image 3`}
          className="w-full h-[420px] md:h-[800px]"
        />
      </section>

      {/* RECOMMENDED PROJECTS */}
      {recommendedProjects.length > 0 && (
        <section className="pt-20 pb-32 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendedProjects.map((item) => (
                <Link
                  key={item._id || item.slug}
                  href={`/project/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square w-full mb-5 overflow-hidden bg-[#f3f0eb]">
                    <Image
                      src={
                        item.thumbnail ||
                        item.banner ||
                        getImageSrc(item.images?.[0]) ||
                        '/placeholder.jpg'
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={85}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-xl md:text-2xl font-light mb-2 group-hover:text-[#d9af61] transition">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.location || item.category || 'View Project'}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
