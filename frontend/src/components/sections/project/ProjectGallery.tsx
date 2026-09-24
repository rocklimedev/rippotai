import type { Project } from "@/api/projectsApi";
import { planGallery } from "./layout";

type GalleryProject = Project & {
  gallery: string[];
  details: string[];
};

const Img = ({ src, index, name, eager }: { src: string; index: number; name: string; eager?: boolean }) => (
  <button className="pd-shot" data-i={index} data-m="" aria-label={`Open image ${index + 1} of ${name}`} type="button">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src={src} alt={`${name} — image ${index + 1}`} loading={eager ? "eager" : "lazy"} decoding="async" />
  </button>
);

/**
 * Planned full-bleed / 65-35 gallery
 * with the project story interleaved.
 */
export default function ProjectGallery({ project }: { project: GalleryProject }) {
  const rows = planGallery(project.gallery, project.details);

  return (
    <section className="pd-gallery" id="gallery">
      {rows.map((r, k) => {
        if (r.kind === "full") {
          return (
            <div key={k} className="pd-full" data-rev="">
              <div className="par">
                <Img src={r.src} index={r.index} name={project.title} eager={k === 0} />
              </div>
            </div>
          );
        }

        if (r.kind === "pair") {
          return (
            <div key={k} className={`wrap pd-pair${r.flip ? " flip" : ""}`}>
              <div className="w" data-rev="">
                <Img src={r.wide.src} index={r.wide.index} name={project.title} />
              </div>

              <div className="n" data-rev="">
                <Img src={r.narrow.src} index={r.narrow.index} name={project.title} />
              </div>
            </div>
          );
        }

        return (
          <div key={k} className="wrap pd-text">
            <span className="pd-n" data-rev="">
              {String(r.n).padStart(2, "0")}
            </span>

            <p data-rev="">{r.body}</p>
          </div>
        );
      })}
    </section>
  );
}
