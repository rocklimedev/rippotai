interface ProjectLightboxProps {
  images: string[];
  name: string;
}

/**
 * Full-screen viewer driven by Behavior.ts.
 * Deep green veil — never black.
 */
export default function ProjectLightbox({ images, name }: ProjectLightboxProps) {
  const safeImages = images.filter(Boolean);

  return (
    <div
      className="pd-lb"
      id="lb"
      aria-hidden="true"
      role="dialog"
      aria-label={`${name} gallery`}
      data-images={JSON.stringify(safeImages)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="lbimg" src={safeImages[0] || ""} alt="" />

      <div className="pd-lb-bar">
        <span className="nm">{name}</span>

        <span className="ct">
          <b id="lbn">01</b>

          {" / "}

          {String(safeImages.length).padStart(2, "0")}
        </span>
      </div>

      <button className="pd-lb-btn prev" id="lbprev" aria-label="Previous image" data-m="" type="button">
        ←
      </button>

      <button className="pd-lb-btn next" id="lbnext" aria-label="Next image" data-m="" type="button">
        →
      </button>

      <button className="pd-lb-close" id="lbclose" aria-label="Close" data-m="" type="button">
        Close
      </button>
    </div>
  );
}
