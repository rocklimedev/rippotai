import { AnimateIn } from "./AnimateIn";
import Image from "next/image";
import Link from "next/link";
export default function GalleryWithText({ project }) {
  const allImages = project.images || [];
  const previewImages = allImages.slice(0, 5);
  const total = previewImages.length;

  // 🔥 Convert details string → paragraphs
  const detailBlocks = project.details
    ? project.details
        .split(/\n+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const items = [];
  let textIdx = 0;

  previewImages.forEach((img, idx) => {
    const isFeature = idx === 0 || idx === total - 1;

    items.push({
      type: "image",
      src: img,
      idx,
      isFeature,
    });

    if (
      (idx + 1) % 2 === 0 &&
      idx < total - 1 &&
      textIdx < detailBlocks.length
    ) {
      items.push({
        type: "text",
        body: detailBlocks[textIdx],
      });
      textIdx++;
    }
  });

  return (
    <div className="space-y-20">
      {items.map((item, i) => {
        if (item.type === "text") {
          return (
            <AnimateIn key={`text-${i}`}>
              <div className="max-w-2xl mx-auto text-center md:text-left">
                <div className="w-8 h-px bg-[#d9af61] mb-6" />
                <p className="text-gray-600 leading-relaxed text-lg md:text-xl">
                  {item.body}
                </p>
              </div>
            </AnimateIn>
          );
        }

        if (item.isFeature) {
          return (
            <AnimateIn key={`img-${item.idx}`}>
              <Image
                src={item.src}
                alt=""
                width={1400}
                height={900}
                className="w-full object-cover"
              />
            </AnimateIn>
          );
        }

        const nextItem = items[i + 1];
        const hasNext =
          nextItem && nextItem.type === "image" && !nextItem.isFeature;

        return (
          <AnimateIn key={`pair-${item.idx}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <Image
                src={item.src}
                alt=""
                width={800}
                height={600}
                className="object-cover"
              />

              {hasNext && (
                <Image
                  src={nextItem.src}
                  alt=""
                  width={800}
                  height={600}
                  className="object-cover"
                />
              )}
            </div>
          </AnimateIn>
        );
      })}

      {allImages.length > 5 && (
        <div className="text-center pt-10">
          <Link
            href={`/project/${project.slug}/gallery`}
            className="inline-block px-8 py-4 border border-[#1a3c34] text-[#1a3c34] hover:bg-[#1a3c34] hover:text-white transition"
          >
            See Full Gallery
          </Link>
        </div>
      )}
    </div>
  );
}
