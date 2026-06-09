'use client';

import { AnimateIn } from './AnimateIn';
import Image from 'next/image';
import Link from 'next/link';

export default function GalleryWithText({ project }) {
  const allImages = project.images || [];
  const previewImages = allImages.slice(0, 5);

  const detailBlocks = project.details
    ? project.details
        .split(/\n+/)
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  // -----------------------------
  // BUILD SAFE STRUCTURE (NO LOOKAHEAD BUGS)
  // -----------------------------
  const items = [];
  let textIdx = 0;

  for (let i = 0; i < previewImages.length; i++) {
    const img = previewImages[i];
    const isFeature = i === 0 || i === previewImages.length - 1;

    // FEATURE IMAGE
    if (isFeature) {
      items.push({
        type: 'feature',
        src: img,
        idx: i,
      });
      continue;
    }

    // PAIR LOGIC (SAFE: consume both images here)
    if (i < previewImages.length - 1) {
      const nextImg = previewImages[i + 1];

      items.push({
        type: 'pair',
        left: {
          src: img,
          idx: i,
        },
        right: {
          src: nextImg,
          idx: i + 1,
        },
      });

      i++; // ✅ safe skip (ONLY inside loop, not render)
      continue;
    }

    // fallback single image
    items.push({
      type: 'image',
      src: img,
      idx: i,
    });
  }

  return (
    <div className="space-y-20">
      {items.map((item, i) => {
        // -----------------------------
        // TEXT BLOCKS (optional future extension)
        // -----------------------------
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

        // -----------------------------
        // FEATURE IMAGE
        // -----------------------------
        if (item.type === 'feature') {
          return (
            <AnimateIn key={`feature-${item.idx}`}>
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

        // -----------------------------
        // PAIR IMAGE BLOCK
        // -----------------------------
        if (item.type === 'pair') {
          return (
            <AnimateIn key={`pair-${item.left.idx}`}>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* LEFT */}
                <div className="flex justify-center max-h-[420px]">
                  <Image
                    src={`${item.left.src}?v=${project.updatedAt || ''}`}
                    alt=""
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={82}
                    unoptimized
                    className="w-full h-auto max-h-[420px] object-contain transition duration-700 hover:scale-105"
                  />
                </div>

                {/* RIGHT */}
                <div className="flex justify-center max-h-[420px]">
                  <Image
                    src={`${item.right.src}?v=${project.updatedAt || ''}`}
                    alt=""
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 50vw"
                    quality={82}
                    unoptimized
                    className="w-full h-auto max-h-[420px] object-contain transition duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </AnimateIn>
          );
        }

        // -----------------------------
        // SINGLE IMAGE FALLBACK
        // -----------------------------
        return (
          <AnimateIn key={`img-${item.idx}`}>
            <div className="w-full flex justify-center max-h-[420px] overflow-hidden">
              <Image
                src={imageSrc}
                alt=""
                width={800}
                height={600}
                sizes="100vw"
                quality={82}
                unoptimized
                className="w-full h-auto max-h-[420px] object-contain transition duration-700 hover:scale-105"
              />
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
