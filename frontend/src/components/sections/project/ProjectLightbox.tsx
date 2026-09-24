/** Full-screen viewer (driven by behavior.ts). Deep green veil — never black. */
export default function ProjectLightbox({ images, name }: { images: string[]; name: string }) {
  return (
    <div
      className="pd-lb"
      id="lb"
      aria-hidden="true"
      role="dialog"
      aria-label={`${name} gallery`}
      data-images={JSON.stringify(images)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img id="lbimg" src={images[0]} alt="" />
      <div className="pd-lb-bar">
        <span className="nm">{name}</span>
        <span className="ct">
          <b id="lbn">01</b> / {String(images.length).padStart(2, "0")}
        </span>
      </div>
      <button className="pd-lb-btn prev" id="lbprev" aria-label="Previous image" data-m="">
        ←
      </button>
      <button className="pd-lb-btn next" id="lbnext" aria-label="Next image" data-m="">
        →
      </button>
      <button className="pd-lb-close" id="lbclose" aria-label="Close" data-m="">
        Close
      </button>
    </div>
  );
}
