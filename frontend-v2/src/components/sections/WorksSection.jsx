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

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.75) 0%,
    rgba(0, 0, 0, 0) 100%
  );

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

// ProjectBlock Component - Defined OUTSIDE (Important!)
const ProjectBlock = ({ project }) => {
  if (!project) {
    return (
      <div className="sl-card-img-wrap" style={{ background: '#e8e4df' }} />
    );
  }

  const version = project.updatedAt ? `?v=${project.updatedAt}` : '';

  const imageSrc = project.image
    ? `${project.image}${version}`
    : project.images?.[0]
      ? `${project.images[0]}${version}`
      : '/placeholder.jpg';

  return (
    <Link href={`/project/${project.slug}`} className="sl-card">
      <div className="sl-card-img-wrap">
        <Image
          src={imageSrc}
          alt={project.title}
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
              fontSize: '22px', // was 17px
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          <span
            style={{
              fontSize: '11px', // was 9px
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
              fontSize: '11px', // was 9px
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

export const WorksSection = () => {
  const { data: projectsData, isLoading } = useGetPublicProjectsQuery({
    page: 1,
    limit: 20,
  });
  const rawProjects = projectsData?.data ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Sort projects
  const projects = [...rawProjects].sort((a, b) => {
    const fa = a.featured ? 1 : 0;
    const fb = b.featured ? 1 : 0;
    if (fa !== fb) return fb - fa;
    return (a.priority ?? 0) - (b.priority ?? 0);
  });

  const projectMap = new Map(projects.map((p) => [p.slug, p]));

  // ← Edit these slugs to choose which project goes where
  const layoutProjects = {
    goel: projectMap.get('goels-residence-gurugram'),
    innerHouse: projectMap.get('the-inner-house'),
    khannaLaw: projectMap.get('vinay-khanna-law-chambers-panchsheel-park'),
    cmShowroom: projectMap.get('chhabra-marble-and-sanitary-showroom'),
    skyView: projectMap.get('sky-view-restaurant-lucknow'),
    tropical: projectMap.get('guptas-residence-ii'),
    pitampura: projectMap.get('nagpals-residence-pitampura'),
    sehaj: projectMap.get('sehaj'),
    geetanjali: projectMap.get('khannas-residence-geetanjali-marg'),
  };

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

  return (
    <>
      <style>{SKELETON_STYLES}</style>

      <section
        id="works"
        style={{
          width: '100%',
          overflowX: 'hidden',
          padding: '0 15px 15px 15px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: '100%',
            margin: '0 auto',
          }}
        >
          {isMobile ? (
            <div
              style={{
                display: 'grid',
                gap: GAP,
                gridTemplateColumns: '1fr',
              }}
            >
              {/* TROPICAL - Featured Wide Block */}
              <div style={{ aspectRatio: '2 / 1' }}>
                <ProjectBlock project={layoutProjects.tropical} />
              </div>

              {/* INNER HOUSE - Tall Block */}
              <div style={{ aspectRatio: '1 / 1.4' }}>
                <ProjectBlock project={layoutProjects.innerHouse} />
              </div>

              <div className="text-block">
                <p>{TEXTS[0]}</p>
              </div>

              {/* KHANNA LAW */}
              <div style={{ aspectRatio: '1 / 1' }}>
                <ProjectBlock project={layoutProjects.khannaLaw} />
              </div>

              {/* CM SHOWROOM - Featured Wide Block */}
              <div style={{ aspectRatio: '2 / 1' }}>
                <ProjectBlock project={layoutProjects.cmShowroom} />
              </div>

              {/* SKY VIEW */}
              <div style={{ aspectRatio: '1 / 1' }}>
                <ProjectBlock project={layoutProjects.skyView} />
              </div>

              {/* GOEL - Featured Wide Block */}
              <div style={{ aspectRatio: '2 / 1' }}>
                <ProjectBlock project={layoutProjects.goel} />
              </div>
              <div className="text-block">
                <p>{TEXTS[1]}</p>
              </div>

              {/* PITAMPURA - Tall */}
              <div style={{ aspectRatio: '1 / 1.4' }}>
                <ProjectBlock project={layoutProjects.pitampura} />
              </div>

              {/* SEHAJ - Large Featured */}
              <div style={{ aspectRatio: '1 / 1.4' }}>
                <ProjectBlock project={layoutProjects.sehaj} />
              </div>

              <div className="text-block">
                <p>{TEXTS[2]}</p>
              </div>

              {/* GEETANJALI */}
              <div style={{ aspectRatio: '2 / 1' }}>
                <ProjectBlock project={layoutProjects.geetanjali} />
              </div>
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
              {' '}
              <div style={{ gridColumn: 'span 2' }}>
                <ProjectBlock project={layoutProjects.tropical} />
              </div>
              <div style={{ gridRow: 'span 2' }}>
                <ProjectBlock project={layoutProjects.innerHouse} />
              </div>
              <div className="text-block">
                <p>{TEXTS[0]}</p>
              </div>
              <ProjectBlock project={layoutProjects.khannaLaw} />
              <div style={{ gridColumn: 'span 2' }}>
                <ProjectBlock project={layoutProjects.cmShowroom} />
              </div>
              <ProjectBlock project={layoutProjects.skyView} />
              <div style={{ gridColumn: 'span 2' }}>
                <ProjectBlock project={layoutProjects.goel} />
              </div>
              <div className="text-block">
                <p>{TEXTS[1]}</p>
              </div>
              <div style={{ gridRow: 'span 2' }}>
                <ProjectBlock project={layoutProjects.pitampura} />
              </div>
              <div style={{ gridColumn: 'span 2', gridRow: 'span 2' }}>
                <ProjectBlock project={layoutProjects.sehaj} />
              </div>
              <div className="text-block">
                <p>{TEXTS[2]}</p>
              </div>
              <div style={{ gridColumn: 'span 2' }}>
                <ProjectBlock project={layoutProjects.geetanjali} />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
