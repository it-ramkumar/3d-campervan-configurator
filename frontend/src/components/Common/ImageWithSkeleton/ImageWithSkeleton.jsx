"use client";

import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ImageWithSkeleton({
  src,
  alt = "big bear vans",
  className = "",
  zoom = false,
  priority = false,
  sizes,
  overlay = true,
  skeleton = true,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finalSrc = error ? "/images/blackLogo.jpg" : src;
  // console.log(src,"scr")

  return (
    <>
      {/* Main Image */}
      <div
        className="relative w-full h-full overflow-hidden bg-gray-100"
        onClick={() => zoom && setIsModalOpen(true)}
      >
        {/* Skeleton */}
        {skeleton && !loaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        <Image
          src={finalSrc || src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`
            object-cover object-center
            transition-opacity duration-500
            ${loaded ? "opacity-100" : "opacity-0"}
            ${zoom ? "cursor-zoom-in" : ""}
            ${className}
          `}
          quality={60}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />

        {/* Optional Overlay */}
        {overlay && (
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        )}
      </div>

      {/* Modal */}
      {zoom &&
        isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] bg-black/90 flex items-center justify-center"
            onClick={() => setIsModalOpen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-6 text-white text-4xl z-10"
            >
              ✕
            </button>

            {/* Fullscreen Image */}
            <div
              className="relative w-[95vw] h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={finalSrc || src}
                alt={alt}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}