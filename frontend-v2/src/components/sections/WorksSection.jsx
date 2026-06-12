'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimateIn } from '../layouts/AnimateIn';
import { useGetPublicProjectsQuery } from '@/api/projectsApi';

const FILTER_GROUPS = [
  {
    label: 'Architecture',
    categories: ['Residential', 'Institutional', 'Mixed Use'],
  },
  {
    label: 'Interiors',
    categories: ['Commercial', 'Hospitality', 'Retail', 'F&B'],
  },
];

// ─── Editorial quotes (rotate by project index) ──────────────────────────────
const EDITORIAL_QUOTES = [
  {
    text: 'Every detail is deliberate. From material selection to spatial proportions, we approach design with an architect exactness.',
  },
  {
    text: 'Translating vision into spatial concepts through rigorous design exploration and iteration.',
  },
  {
    text: 'Where structure meets sensibility — spaces that speak before words do.',
  },
];

// ─── Row layouts ──────────────────────────────────────────────────────────────
// Each "row" in the editorial grid is one of these patterns.
// Items are consumed from the projects array in order.
//
// 'full'        → 1 card spanning full width (tall portrait)
// 'duo'         → 2 cards side-by-side, left tall / right shorter
// 'duo-inv'     → 2 cards side-by-side, left shorter / right tall
// 'quote+card'  → floating quote block (no image) + 1 card
// 'trio-bottom' → 1 wider card left + 2 stacked small cards right
const ROW_PATTERNS = [
  'duo',
  'quote+card', // quote floats, 1 project card
  'full',
  'duo-inv',
  'quote+card',
  'duo',
  'full',
];

// How many project slots each pattern consumes
const PATTERN_SLOTS = {
  full: 1,
  duo: 2,
  'duo-inv': 2,
  'quote+card': 1,
  'trio-bottom': 3,
};

export const WorksSection = () => {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useGetPublicProjectsQuery({ page: 1, limit: 20 });
  const rawProjects = projectsData?.data ?? [];

  const [activeGroup, setActiveGroup] = useState(null);
  const [activeLeaf, setActiveLeaf] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const projects = rawProjects
    .filter((p) => {
      if (activeLeaf)
        return p.category?.toLowerCase() === activeLeaf.toLowerCase();
      if (activeGroup) {
        const group = FILTER_GROUPS.find((g) => g.label === activeGroup);
        return group?.categories.some(
          (c) => c.toLowerCase() === p.category?.toLowerCase(),
        );
      }
      return true;
    })
    .sort((a, b) => {
      const fa = a.featured ? 1 : 0;
      const fb = b.featured ? 1 : 0;
      if (fa !== fb) return fb - fa;
      return (a.priority ?? 0) - (b.priority ?? 0);
    })
    .slice(0, 12);

  const handleGroupClick = (groupLabel) => {
    if (activeGroup === groupLabel && !activeLeaf) {
      setActiveGroup(null);
      setActiveLeaf(null);
    } else {
      setActiveGroup(groupLabel);
      setActiveLeaf(null);
    }
  };
  const handleLeafClick = (cat) => {
    if (activeLeaf === cat) {
      setActiveLeaf(null);
    } else {
      const group = FILTER_GROUPS.find((g) => g.categories.includes(cat));
      setActiveGroup(group?.label ?? null);
      setActiveLeaf(cat);
    }
  };

  if (isLoading)
    return (
      <section
        style={{ padding: '80px 20px', textAlign: 'center', color: '#1a3c34' }}
      >
        Loading Projects…
      </section>
    );
  if (isError) return null;

  // Build rows by consuming projects
  let projectCursor = 0;
  let quoteIndex = 0;
  const rows = [];

  for (
    let i = 0;
    i < ROW_PATTERNS.length && projectCursor < projects.length;
    i++
  ) {
    const pattern = ROW_PATTERNS[i];
    const slots = PATTERN_SLOTS[pattern];
    if (projectCursor + slots > projects.length && pattern !== 'quote+card') {
      // fallback: if not enough projects for this pattern, use 'full' for remaining
      if (projectCursor < projects.length) {
        rows.push({
          pattern: 'full',
          projects: [projects[projectCursor]],
          quoteIndex: null,
        });
        projectCursor++;
      }
      continue;
    }
    if (pattern === 'quote+card') {
      rows.push({
        pattern,
        projects: [projects[projectCursor]],
        quoteIndex: quoteIndex % EDITORIAL_QUOTES.length,
      });
      quoteIndex++;
      projectCursor += 1;
    } else {
      rows.push({
        pattern,
        projects: projects.slice(projectCursor, projectCursor + slots),
        quoteIndex: null,
      });
      projectCursor += slots;
    }
  }

  return (
    <>
      <style>{`
        /* ── Filter nav ───────────────────────────────────── */
        .sl-btn-group {
          background: none; border: none; cursor: pointer;
          font-size: 10px; letter-spacing: 3.5px; text-transform: uppercase;
          padding: 0 0 6px; font-family: inherit; transition: color .2s, border-color .2s;
          border-bottom: 1.5px solid transparent; color: #1a3c34;
        }
        .sl-btn-group.active { border-bottom-color: #c6a15b; color: #c6a15b !important; }
        .sl-btn-group:hover { color: #c6a15b !important; }
        .sl-btn-leaf {
          background: none; border: none; cursor: pointer;
          font-size: 10px; letter-spacing: 2.5px; text-transform: uppercase;
          padding: 0; font-family: inherit; transition: color .2s; color: #9a9a9a;
        }
        .sl-btn-leaf.active { color: #1a3c34 !important; font-weight: 600; }
        .sl-btn-leaf:hover { color: #1a3c34 !important; }

        /* ── Card image zoom ─────────────────────────────── */
        .sl-card { display: block; text-decoration: none; color: inherit; }
        .sl-card-img-wrap { overflow: hidden; position: relative; background: #1e1e1c; }
        .sl-card-img-wrap img { transition: transform .9s cubic-bezier(.25,.46,.45,.94) !important; }
        .sl-card:hover .sl-card-img-wrap img { transform: scale(1.05) !important; }

        /* ── Card overlay on hover ───────────────────────── */
        .sl-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,.7) 0%, rgba(0,0,0,0) 50%);
          opacity: 0; transition: opacity .4s ease;
          display: flex; flex-direction: column; justify-content: flex-end;
          padding: 20px 18px;
        }
        .sl-card:hover .sl-overlay { opacity: 1; }

        /* ── Editorial quote block ───────────────────────── */
        .sl-quote {
          display: flex; align-items: center; justify-content: center;
          background: #0e1210; padding: 40px 28px;
        }
        .sl-quote p {
          font-size: 14px; line-height: 1.75; color: #c8c0b4;
          letter-spacing: .02em; margin: 0;
          font-style: italic; font-family: Georgia, serif;
          border-left: 2px solid #c6a15b; padding-left: 18px;
        }

        /* ── Card meta text ──────────────────────────────── */
        .sl-meta {
          font-size: 9px; letter-spacing: 3px; text-transform: uppercase;
          color: #b0a898; margin-bottom: 5px;
        }
        .sl-title {
          margin: 0; font-weight: 400; line-height: 1.25; letter-spacing: -.01em; color: #1a1a1a;
        }

        /* ── Row layout containers ───────────────────────── */
        .sl-row { margin-bottom: 12px; }
        .sl-row-duo { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .sl-row-duo-left { display: grid; grid-template-columns: 3fr 2fr; gap: 12px; }
        .sl-row-duo-right { display: grid; grid-template-columns: 2fr 3fr; gap: 12px; }
        .sl-row-quote-card { display: grid; grid-template-columns: 5fr 7fr; gap: 12px; }

        @media (max-width: 640px) {
          .sl-row-duo,
          .sl-row-duo-left,
          .sl-row-duo-right { grid-template-columns: 1fr 1fr !important; }
          .sl-row-quote-card { grid-template-columns: 1fr !important; }
          .sl-quote { padding: 28px 20px; }
          .sl-quote p { font-size: 12px; }
        }
      `}</style>

      <section
        id="works"
        style={{
          background: '#f5f2ee',
          padding: isMobile ? '48px 0 72px' : '100px 0 120px',
        }}
      >
        <div
          style={{
            maxWidth: '1400px',
            margin: '0 auto',
            padding: isMobile ? '0 12px' : '0 32px',
          }}
        >
          {/* ── Section header ────────────────────────────────────── */}
          <AnimateIn delay={0}>
            <div
              style={{
                marginBottom: isMobile ? '40px' : '64px',
                textAlign: 'center',
              }}
            >
              <p
                style={{
                  fontSize: '9px',
                  letterSpacing: '4px',
                  textTransform: 'uppercase',
                  color: '#c6a15b',
                  margin: '0 0 14px',
                }}
              >
                Selected Works
              </p>
              <h2
                style={{
                  fontSize: isMobile ? '28px' : '42px',
                  fontWeight: 300,
                  color: '#1a1a1a',
                  margin: '0 0 32px',
                  letterSpacing: '-.02em',
                  lineHeight: 1.1,
                }}
              >
                Built With Precision
              </h2>

              {/* Filter nav */}
              <nav>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: isMobile ? '20px' : '48px',
                    flexWrap: 'wrap',
                    marginBottom: '16px',
                  }}
                >
                  <button
                    onClick={() => {
                      setActiveGroup(null);
                      setActiveLeaf(null);
                    }}
                    className={`sl-btn-group${!activeGroup ? ' active' : ''}`}
                  >
                    All
                  </button>
                  {FILTER_GROUPS.map((g) => (
                    <button
                      key={g.label}
                      onClick={() => handleGroupClick(g.label)}
                      className={`sl-btn-group${activeGroup === g.label ? ' active' : ''}`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: isMobile ? '14px' : '28px',
                    flexWrap: 'wrap',
                    minHeight: '18px',
                    opacity: activeGroup ? 1 : 0,
                    transition: 'opacity .3s',
                    pointerEvents: activeGroup ? 'auto' : 'none',
                  }}
                >
                  {activeGroup &&
                    FILTER_GROUPS.find(
                      (g) => g.label === activeGroup,
                    )?.categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleLeafClick(cat)}
                        className={`sl-btn-leaf${activeLeaf === cat ? ' active' : ''}`}
                      >
                        {cat}
                      </button>
                    ))}
                </div>

                <div
                  style={{
                    height: '1px',
                    background: '#dedad3',
                    maxWidth: '280px',
                    margin: '20px auto 0',
                  }}
                />
              </nav>
            </div>
          </AnimateIn>

          {/* ── Editorial grid ──────────────────────────────────── */}
          {rows.map((row, rowIdx) => (
            <AnimateIn key={rowIdx} delay={rowIdx * 0.06}>
              <div className="sl-row">
                {row.pattern === 'full' && (
                  <ProjectCard
                    project={row.projects[0]}
                    aspectRatio="21/9"
                    isMobile={isMobile}
                  />
                )}

                {row.pattern === 'duo' && (
                  <div className="sl-row-duo">
                    <ProjectCard
                      project={row.projects[0]}
                      aspectRatio={isMobile ? '3/4' : '3/4'}
                      isMobile={isMobile}
                    />
                    <ProjectCard
                      project={row.projects[1]}
                      aspectRatio={isMobile ? '3/4' : '4/3'}
                      isMobile={isMobile}
                    />
                  </div>
                )}

                {row.pattern === 'duo-inv' && (
                  <div className="sl-row-duo-right">
                    <ProjectCard
                      project={row.projects[0]}
                      aspectRatio="4/3"
                      isMobile={isMobile}
                    />
                    <ProjectCard
                      project={row.projects[1]}
                      aspectRatio="3/4"
                      isMobile={isMobile}
                    />
                  </div>
                )}

                {row.pattern === 'quote+card' && (
                  <div className="sl-row-quote-card">
                    <div
                      className="sl-quote"
                      style={{ minHeight: isMobile ? '180px' : '260px' }}
                    >
                      <p>{EDITORIAL_QUOTES[row.quoteIndex].text}</p>
                    </div>
                    <ProjectCard
                      project={row.projects[0]}
                      aspectRatio={isMobile ? '1/1' : '4/3'}
                      isMobile={isMobile}
                      hideCaption
                    />
                  </div>
                )}
              </div>
            </AnimateIn>
          ))}

          {/* ── See all CTA ─────────────────────────────────────── */}
          <AnimateIn delay={0.1}>
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '10px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: '#1a3c34',
                  textDecoration: 'none',
                  borderBottom: '1px solid #1a3c34',
                  paddingBottom: '4px',
                }}
              >
                View All Projects
                <span style={{ fontSize: '14px', letterSpacing: 0 }}>→</span>
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
};

// ─── Project Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  aspectRatio,
  isMobile,
  hideCaption = false,
}) => {
  const imageSrc = project.image
    ? `${project.image}?v=${project.updatedAt || Date.now()}`
    : project.images?.[0]
      ? `${project.images[0]}?v=${project.updatedAt || Date.now()}`
      : '/placeholder.jpg';

  return (
    <Link href={`/project/${project.slug}`} className="sl-card">
      <div className="sl-card-img-wrap" style={{ aspectRatio, width: '100%' }}>
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
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.55)',
              marginBottom: '4px',
              display: 'block',
            }}
          >
            {project.category}
          </span>
          <h3
            style={{
              color: '#fff',
              margin: '0 0 10px',
              fontSize: isMobile ? '15px' : '19px',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>
          <span
            style={{
              fontSize: '9px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.55)',
              borderBottom: '1px solid rgba(255,255,255,.3)',
              paddingBottom: '2px',
            }}
          >
            View Project
          </span>
        </div>
      </div>

      {!hideCaption && (
        <div style={{ paddingTop: '12px', paddingBottom: '4px' }}>
          <div className="sl-meta">{project.category}</div>
          <h3
            className="sl-title"
            style={{ fontSize: isMobile ? '15px' : '18px' }}
          >
            {project.title}
          </h3>
          {project.description && (
            <p
              style={{
                margin: '6px 0 0',
                fontSize: '12px',
                color: '#7a7a7a',
                lineHeight: 1.55,
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.description}
            </p>
          )}
        </div>
      )}
    </Link>
  );
};
