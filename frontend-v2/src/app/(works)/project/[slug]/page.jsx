'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

// ─── Full-bleed image ────────────────────────────────────────────────────────
const FullBleedImage = ({ src, alt = 'Project image', className = '' }) => {
  const finalSrc = getImageSrc(src);
  return (
    <div className={`relative overflow-hidden bg-[#f3f0eb] ${className}`}>
      <Image
        src={finalSrc}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        className="object-cover"
      />
    </div>
  );
};

// ─── Full-bleed wrapper ───────────────────────────────────────────────────────
const FullBleed = ({ children, className = '' }) => (
  <div className={`w-screen relative left-1/2 -translate-x-1/2 ${className}`}>
    {children}
  </div>
);

// ─── Text Block ──────────────────────────────────────────────────────────────
const TextBlock = ({ title, meta, children }) => {
  if (!children && !title && !meta) return null;

  return (
    <section className="py-8 md:py-[35px] px-5 md:px-[35px]">
      <div className="w-full">
        {(title || meta) && (
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6 md:mb-8">
            {title && (
              <h2 className="text-2xl sm:text-3xl md:text-6xl font-light leading-tight text-black w-full lg:w-auto lg:max-w-[60%]">
                {title}
              </h2>
            )}
            {meta && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm md:text-base lg:flex lg:flex-wrap lg:justify-end">
                {meta}
              </div>
            )}
          </div>
        )}

        {children && (
          <div className="w-full text-base md:text-xl leading-relaxed text-gray-700 whitespace-pre-line">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const {
    data: projectResponse,
    isLoading: isProjectLoading,
    isError: isProjectError,
  } = useGetProjectBySlugQuery(slug, { skip: !slug });

  const { data: projectsList = [] } = useGetPublicProjectsQuery(
    { page: 1, limit: 100 },
    {
      selectFromResult: ({ data }) => ({
        data: data?.data || [],
      }),
    },
  );

  if (isProjectLoading) return <ProjectDetailSkeleton />;

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
  const recommendedProjects = projectsList
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  return (
    <main className="bg-white overflow-x-hidden">
      {/* HERO */}
      <section className="relative w-full h-[55vh] sm:h-[70vh] md:h-[85vh]">
        <Image
          src={project.banner || images[0] || '/placeholder.jpg'}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          quality={95}
          className="object-cover"
        />
      </section>
      {/* TITLE + META + DESCRIPTION */}
      <TextBlock
        title={project.title}
        meta={
          <>
            {project.location && (
              <div className="min-w-[80px]">
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Location
                </span>
                {project.location}
              </div>
            )}
            <div className="min-w-[50px]">
              <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                Year
              </span>
              {project.year || new Date(project.createdAt).getFullYear()}
            </div>
            {project.area && (
              <div className="min-w-[60px]">
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Area
                </span>
                {project.area}
              </div>
            )}
            {project.scope && (
              <div className="min-w-[60px]">
                <span className="block text-[#d9af61] uppercase tracking-[3px] text-[10px] mb-1">
                  Scope
                </span>
                {project.scope}
              </div>
            )}
            {project.category && (
              <div className="min-w-[70px]">
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
      {/* TWO SQUARES */}
      {images.length >= 2 && (
        <FullBleed className="pb-[10px]">
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
        </FullBleed>
      )}{' '}
      {/* WIDE RECTANGLE 1 */}
      {images.length >= 3 && (
        <FullBleed className="pb-[10px]">
          <FullBleedImage
            src={images[2]}
            alt={`${project.title} wide image 1`}
            className="w-full h-[260px] sm:h-[420px] md:h-[800px]"
          />
        </FullBleed>
      )}
      {/* DETAILS */}
      {project.details && <TextBlock>{project.details}</TextBlock>}
      {/* WIDE RECTANGLE 2 */}
      {images.length >= 4 && (
        <FullBleed className="pb-[10px]">
          <FullBleedImage
            src={images[3]}
            alt={`${project.title} wide image 2`}
            className="w-full h-[260px] sm:h-[420px] md:h-[800px]"
          />
        </FullBleed>
      )}
      {/* TWO SQUARES AGAIN */}
      {images.length >= 6 && (
        <FullBleed>
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
        </FullBleed>
      )}
      {/* MIXED LAYOUT (Portrait + Text + Square) */}
      {images.length >= 7 && (
        <FullBleed className="pt-[6px] pb-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[10px]">
            {/* Portrait */}
            <div className="md:row-span-2">
              <FullBleedImage
                src={images[6]}
                alt={`${project.title} portrait image`}
                className="w-full h-[500px] md:h-full"
              />
            </div>

            {/* Text */}
            {/* Text (Square) */}
            <div className="w-full aspect-square p-5 md:p-12 flex items-center justify-center">
              <AnimateIn>
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-base md:text-xl leading-relaxed text-gray-700 whitespace-pre-line text-center">
                    {project.moreDetails}
                  </p>
                </div>
              </AnimateIn>
            </div>
            {/* Square */}
            {images.length >= 8 && (
              <FullBleedImage
                src={images[7]}
                alt={`${project.title} square image`}
                className="aspect-square w-full"
              />
            )}
          </div>
        </FullBleed>
      )}{' '}
      {/* RECOMMENDED PROJECTS */}
      {recommendedProjects.length > 0 && (
        <section className="pt-14 pb-20 md:pt-20 md:pb-32 px-5 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {recommendedProjects.map((item) => (
                <Link
                  key={item._id || item.slug}
                  href={`/project/${item.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square w-full mb-4 overflow-hidden bg-[#f3f0eb]">
                    <Image
                      src={
                        item.thumbnail ||
                        item.banner ||
                        getImageSrc(item.images?.[0]) ||
                        '/placeholder.jpg'
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      quality={85}
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>

                  <h3 className="text-lg md:text-2xl font-light mb-1 group-hover:text-[#d9af61] transition">
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
