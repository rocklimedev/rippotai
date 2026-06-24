'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGetPublicProjectsQuery } from '@/api/projectsApi';

const SKELETON_STYLES = `
.sl-card {
  display: block;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.sl-card-img-wrap { 
  overflow: hidden; 
  position: relative; 
  background: #1e1e1c; 
  width: 100%;
  height: 100%;
}

.sl-card-img-wrap img { 
  transition: transform .9s cubic-bezier(.25,.46,.45,.94) !important; 
}

.sl-card:hover .sl-card-img-wrap img { 
  transform: scale(1.05) !important; 
}

.sl-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 100%);
  opacity: 0;
  transition: opacity .4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 18px;
}

.sl-card:hover .sl-overlay { 
  opacity: 1; 
}

.text-block {
  padding: 32px 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f8f6f2;
}

.text-block p {
  font-size: clamp(15px, 2.5vw, 18px);
  line-height: 1.55;
  color: #2c2c2c;
  margin: 0;
}
`;

const TEXTS = [
  'Translating ideas into built realities through discipline, detail, and design integrity.',
  'Shaping environments that endure beyond time and trend — clarity of form, purposeful materiality, and spatial intelligence.',
  'Our process begins with listening. Good design comes from collaboration and thoughtful execution.',
];

const ProjectBlock = ({ project }) => {
  if (!project) return null;

  const version = project.updatedAt ? `?v=${project.updatedAt}` : '';
  const imageSrc = project.image
    ? `${project.image}${version}`
    : project.images?.[0]
      ? `${project.images[0]}${version}`
      : '/placeholder.jpg';

  const altText = project.title
    ? `${project.title} - ${project.category || 'Project'} by Rippotai`
    : 'Architectural interior project';

  return (
    <Link href={`/project/${project.slug}`} className="sl-card">
      <div className="sl-card-img-wrap">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          quality={88}
          unoptimized
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <div className="sl-overlay">
          <h3
            style={{
              color: '#fff',
              margin: '0 0 10px',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.75)',
              marginBottom: '6px',
            }}
          >
            {project.category}
          </span>
          <span
            style={{
              fontSize: '11px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.75)',
              borderBottom: '1px solid rgba(255,255,255,.4)',
              paddingBottom: '3px',
            }}
          >
            View Project →
          </span>
        </div>
      </div>
    </Link>
  );
};

export const WorksSection = ({ mode = 'home', limit = 20 }) => {
  const { data: projectsData, isLoading } = useGetPublicProjectsQuery({
    page: 1,
    limit,
  });

  const rawProjects = projectsData?.data ?? [];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const sortedProjects = [...rawProjects]
    .sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return (a.priority ?? 0) - (b.priority ?? 0);
    })
    .slice(0, limit);

  if (isLoading) {
    return (
      <section
        style={{ padding: '80px 20px', textAlign: 'center', color: '#1a3c34' }}
      >
        Loading Projects…
      </section>
    );
  }

  const GAP = 15;
  const styles = <style>{SKELETON_STYLES}</style>;

  // ====================== HOME MODE ======================
  if (mode === 'home') {
    // Fallback for fewer projects
    if (sortedProjects.length < 8) {
      return (
        <>
          {styles}
          <section style={{ backgroundColor: '#fff' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
                gap: GAP * 1.5,
                maxWidth: '1400px',
                margin: '0 auto',
              }}
            >
              {sortedProjects.map((project) => (
                <div key={project.slug} style={{ aspectRatio: '16 / 13' }}>
                  <ProjectBlock project={project} />
                </div>
              ))}
            </div>
          </section>
        </>
      );
    }

    // Dynamic assignment - first projects fill the layout positions
    const getProject = (index) => sortedProjects[index] || null;

    return (
      <>
        {styles}
        <section
          id="works"
          style={{
            width: '100%',
            overflowX: 'hidden',
            padding: '0 15px 15px 15px',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ width: '100%', margin: '0 auto' }}>
            {Array.from({ length: Math.ceil(sortedProjects.length / 9) }).map(
              (_, chunkIndex) => {
                const base = chunkIndex * 9;

                return (
                  <div
                    key={chunkIndex}
                    style={{ marginTop: chunkIndex > 0 ? `${GAP}px` : 0 }}
                  >
                    {isMobile ? (
                      <div
                        style={{
                          display: 'grid',
                          gap: GAP,
                          gridTemplateColumns: '1fr',
                        }}
                      >
                        {getProject(base + 0) && (
                          <div style={{ aspectRatio: '2 / 1' }}>
                            <ProjectBlock project={getProject(base + 0)} />
                          </div>
                        )}
                        {getProject(base + 1) && (
                          <div style={{ aspectRatio: '1 / 1.4' }}>
                            <ProjectBlock project={getProject(base + 1)} />
                          </div>
                        )}

                        <div className="text-block">
                          <p>{TEXTS[0]}</p>
                        </div>

                        {getProject(base + 2) && (
                          <div style={{ aspectRatio: '1 / 1' }}>
                            <ProjectBlock project={getProject(base + 2)} />
                          </div>
                        )}
                        {getProject(base + 3) && (
                          <div style={{ aspectRatio: '2 / 1' }}>
                            <ProjectBlock project={getProject(base + 3)} />
                          </div>
                        )}
                        {getProject(base + 4) && (
                          <div style={{ aspectRatio: '1 / 1' }}>
                            <ProjectBlock project={getProject(base + 4)} />
                          </div>
                        )}
                        {getProject(base + 5) && (
                          <div style={{ aspectRatio: '2 / 1' }}>
                            <ProjectBlock project={getProject(base + 5)} />
                          </div>
                        )}

                        <div className="text-block">
                          <p>{TEXTS[1]}</p>
                        </div>

                        {getProject(base + 6) && (
                          <div style={{ aspectRatio: '1 / 1.4' }}>
                            <ProjectBlock project={getProject(base + 6)} />
                          </div>
                        )}
                        {getProject(base + 7) && (
                          <div style={{ aspectRatio: '1 / 1.4' }}>
                            <ProjectBlock project={getProject(base + 7)} />
                          </div>
                        )}

                        <div className="text-block">
                          <p>{TEXTS[2]}</p>
                        </div>

                        {getProject(base + 8) && (
                          <div style={{ aspectRatio: '2 / 1' }}>
                            <ProjectBlock project={getProject(base + 8)} />
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: 'grid',
                          gap: GAP,
                          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                          gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                          aspectRatio: '3 / 7',
                        }}
                      >
                        {getProject(base + 0) && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 0)} />
                          </div>
                        )}
                        {getProject(base + 1) && (
                          <div style={{ gridRow: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 1)} />
                          </div>
                        )}
                        <div className="text-block">
                          <p>{TEXTS[0]}</p>
                        </div>

                        {getProject(base + 2) && (
                          <ProjectBlock project={getProject(base + 2)} />
                        )}

                        {getProject(base + 3) && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 3)} />
                          </div>
                        )}
                        {getProject(base + 4) && (
                          <ProjectBlock project={getProject(base + 4)} />
                        )}

                        {getProject(base + 5) && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 5)} />
                          </div>
                        )}
                        <div className="text-block">
                          <p>{TEXTS[1]}</p>
                        </div>

                        {getProject(base + 6) && (
                          <div style={{ gridRow: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 6)} />
                          </div>
                        )}

                        {getProject(base + 7) && (
                          <div
                            style={{ gridColumn: 'span 2', gridRow: 'span 2' }}
                          >
                            <ProjectBlock project={getProject(base + 7)} />
                          </div>
                        )}
                        <div className="text-block">
                          <p>{TEXTS[2]}</p>
                        </div>

                        {getProject(base + 8) && (
                          <div style={{ gridColumn: 'span 2' }}>
                            <ProjectBlock project={getProject(base + 8)} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              },
            )}
          </div>
        </section>
      </>
    );
  }

  // ====================== ALL PROJECTS MODE ======================
  return (
    <>
      {styles}
      <section style={{ padding: '15px', backgroundColor: '#fff' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: GAP * 1.5,
            maxWidth: '1400px',
            margin: '0 auto',
            alignContent: 'start',
            gridAutoRows: 'min-content',
          }}
        >
          {sortedProjects.map((project) => (
            <div key={project.slug} style={{ aspectRatio: '16 / 13' }}>
              <ProjectBlock project={project} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
