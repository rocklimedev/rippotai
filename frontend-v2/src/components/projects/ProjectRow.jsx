import Image from 'next/image';
import Link from 'next/link';

export default function ProjectRow({ project, reverse }) {
  const displayImage = project.banner || '/placeholder-project.jpg';
  const displayDesc =
    project.description?.substring(0, 160) ||
    "A thoughtful integration of form and function, designed to resonate with those who inhabit the space — reflecting the cube's clarity and versatility.";
  console.log(project);
  return (
    <Link
      href={`/project/${project.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      prefetch={true}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: reverse ? '1fr 1.4fr' : '1.4fr 1fr',
          gap: '60px',
          alignItems: 'center',
          marginBottom: '100px',
          cursor: 'pointer',
        }}
        className="project-row-grid"
      >
        {/* Image Column */}
        <div style={{ overflow: 'hidden', order: reverse ? 2 : 1 }}>
          <Image
            src={displayImage}
            alt={project.title || 'Project image'}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 58vw"
            quality={85}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'cover',
              transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
            className="project-hover-zoom"
          />
        </div>

        {/* Text Column */}
        <div style={{ order: reverse ? 1 : 2, padding: '20px 0' }}>
          <div
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '11px',
              fontWeight: 400,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#d9af61',
              marginBottom: '16px',
            }}
          >
            {project.category ? project.category.toUpperCase() : 'PROJECT'}
          </div>
          <h2
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 400,
              color: '#1a3c34',
              letterSpacing: '1px',
              lineHeight: 1.3,
              margin: 0,
              marginBottom: '20px',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            {project.title}
            <span
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: 0,
                height: '1px',
                backgroundColor: '#d9af61',
                width: '0%',
                transition: 'width 0.5s ease',
              }}
              className="underline-expand"
            />
          </h2>
          <p
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: '15px',
              fontWeight: 300,
              color: '#666666',
              lineHeight: 1.9,
              margin: 0,
              maxWidth: '400px',
            }}
          >
            {displayDesc}
          </p>
          <div
            style={{
              marginTop: '32px',
              fontFamily: "'Lato', sans-serif",
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#1a3c34',
              transition: 'color 0.3s ease',
            }}
            className="view-project-text"
          >
            VIEW PROJECT →
          </div>
        </div>
      </div>

      <style jsx>{`
        .project-row-grid:hover .project-hover-zoom {
          transform: scale(1.04);
        }
        .project-row-grid:hover .underline-expand {
          width: 100% !important;
        }
        .project-row-grid:hover .view-project-text {
          color: #d9af61 !important;
        }
      `}</style>
    </Link>
  );
}
