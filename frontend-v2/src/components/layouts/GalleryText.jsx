'use client';

import { AnimateIn } from './AnimateIn';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryWithText({ project }) {
  const allImages = project.images || [];
  const previewImages = allImages.slice(0, 5);
  const total = previewImages.length;

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
      type: 'image',
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
        type: 'text',
        body: detailBlocks[textIdx],
      });
      textIdx++;
    }
  });

  return (
    <div className="space-y-20">
      {items.map((item, i) => {
        // TEXT BLOCK
        if (item.type === 'text') {
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

        const imageSrc = `${item.src}?v=${project.updatedAt || ''}`;

        // ✅ FEATURE IMAGE (NO CROP, CONTROLLED HEIGHT)
        if (item.isFeature) {
          return (
            <AnimateIn key={`img-${item.idx}`}>
              <div className="w-full flex justify-center max-h-[600px] overflow-hidden">
                <Image
                  src={imageSrc}
                  alt=""
                  width={1400}
                  height={900}
                  sizes="100vw"
                  quality={82}
                  unoptimized
                  className="w-full h-auto max-h-[600px] object-contain transition duration-700 hover:scale-[1.03]"
                />
              </div>
            </AnimateIn>
          );
        }

        // CHECK FOR PAIR
        const nextItem = items[i + 1];
        const hasNext =
          nextItem && nextItem.type === 'image' && !nextItem.isFeature;

        return (
          <AnimateIn key={`pair-${item.idx}`}>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* LEFT IMAGE */}
              <div className="flex justify-center max-h-[420px]">
                <Image
                  src={imageSrc}
                  alt=""
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={82}
                  unoptimized
                  className="w-full h-auto max-h-[420px] object-contain transition duration-700 hover:scale-105"
                />
              </div>

              {/* RIGHT IMAGE */}
              {hasNext && (
                <div className="flex justify-center max-h-[420px]">
                  <Image
                    src={`${nextItem.src}?v=${project.updatedAt || ''}`}
                    alt=""
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={82}
                    unoptimized
                    className="w-full h-auto max-h-[420px] object-contain transition duration-700 hover:scale-105"
                  />
                </div>
              )}
            </div>
          </AnimateIn>
        );
      })}

      {/* CTA */}
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
