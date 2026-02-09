// src/components/ThreeDCarousel.jsx
"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useRef } from "react";
const ThreeDCarousel = ({
  projects = [],
  rotationSpeed = 28, // seconds per 360° — higher = slower/more cinematic
  zDepth = 300, // increased a bit for stronger 3D feel
  cardWidth = 320,
  cardHeight = 420,
  borderRadius = "1.25rem",
  showBackface = false,
  pauseOnHover = true,
  autoRotate = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const rotation = useMotionValue(0);
  const animationRef = useRef(null);

  // Ensure at least 6 items with placeholders
  const displayItems = useMemo(() => {
    let arr = Array.isArray(projects) ? [...projects] : [];
    if (arr.length < 6) {
      const needed = 6 - arr.length;
      for (let i = 0; i < needed; i++) {
        arr.push({ isPlaceholder: true, id: `ph-${i}` });
      }
    }
    return arr;
  }, [projects]);

  const itemCount = displayItems.length;
  const angleStep = 360 / itemCount;

  // Auto-rotation logic
  useEffect(() => {
    if (!autoRotate) {
      animationRef.current?.stop();
      return;
    }

    const shouldPause = pauseOnHover && isHovered;
    if (shouldPause) {
      animationRef.current?.stop();
    } else {
      const current = rotation.get();
      animationRef.current = animate(rotation, current + 360, {
        duration: rotationSpeed,
        repeat: Infinity,
        ease: "linear",
      });
    }

    return () => animationRef.current?.stop();
  }, [isHovered, pauseOnHover, rotationSpeed, autoRotate, rotation]);

  return (
    <div className="three-d-carousel relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div
        className="relative flex items-center justify-center"
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        style={{
          perspective: "1400px", // increased for better depth
          perspectiveOrigin: "50% 50%",
          height: `${cardHeight + 80}px`, // reduced extra vertical space
          minHeight: "480px",
        }}
      >
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            rotateY: rotation,
          }}
        >
          {displayItems.map((item, i) => {
            const angle = i * angleStep;

            return (
              <div
                key={item.slug || item.id || i}
                className="absolute left-1/2 top-1/2 origin-center shadow-2xl transition-shadow duration-500 hover:shadow-3xl"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${zDepth}px)`,
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  borderRadius,
                  backfaceVisibility: showBackface ? "visible" : "hidden",
                  transformOrigin: "center center",
                }}
              >
                {item.isPlaceholder ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-950 rounded-[inherit] flex items-center justify-center text-gray-500 text-sm backdrop-blur-md">
                    Placeholder
                  </div>
                ) : (
                  <div className="group relative w-full h-full overflow-hidden rounded-[inherit]">
                    <LazyLoadImage
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.title || "Project"}
                      effect="blur"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      wrapperClassName="w-full h-full block"
                      height={cardHeight}
                      width={cardWidth}
                      onError={(e) => (e.target.src = "/placeholder-image.jpg")}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                      <h5 className="text-xl font-semibold line-clamp-2 drop-shadow-md">
                        {item.title}
                      </h5>
                      {item.category && (
                        <span className="text-sm opacity-90 mt-1.5 block">
                          {item.category}
                        </span>
                      )}
                      <Link
                        href={`/project/${item.slug}`}
                        className="mt-4 inline-block text-sm font-medium underline underline-offset-4 hover:text-blue-300 transition-colors"
                      >
                        View Project →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ThreeDCarousel;
