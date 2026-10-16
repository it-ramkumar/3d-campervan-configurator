"use client";

import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ImageWithSkeleton({
  src,
  alt = "big bear vans",
  className = "",
  wrapperClassName = "",
  zoom = false,
  priority = false,
  sizes,
  overlay = true,
  skeleton = true,
  width,
  height,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finalSrc = error ? "/images/blackLogo.webp" : src;

  const imageSrc = finalSrc || src;

  return (
    <>
      {/* Main Image */}
      <div
        className={`relative overflow-hidden bg-gray-100 ${wrapperClassName} ${
          zoom ? "cursor-zoom-in" : ""
        }`}
        onClick={() => zoom && setIsModalOpen(true)}
      >
        {/* Loading skeleton: shimmer + faint van mark (same van as the site loader) */}
        {skeleton && !loaded && (
          <div
            className="bbv-skeleton absolute inset-0 z-10 flex items-center justify-center overflow-hidden"
            role="status"
            aria-label="Loading image"
          >
            <svg viewBox="64 40 194 90" className="w-16 max-w-[30%] h-auto" aria-hidden="true">
              <path
                d="M70 112 L70 61 Q70 52 79 52 L200 52 Q209 52 215 59 L231 84 L245 89 Q252 92 252 100 L252 112 Z"
                fill="#001F3D"
                opacity="0.12"
              />
              <circle cx="100" cy="112" r="13" fill="#001F3D" opacity="0.12" />
              <circle cx="218" cy="112" r="13" fill="#001F3D" opacity="0.12" />
            </svg>
          </div>
        )}

        {width && height ? (
          <Image
            src={imageSrc}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes}
            className={`
              w-full h-auto object-cover object-center
              transition-opacity duration-500
              ${loaded ? "opacity-100" : "opacity-0"}
              ${className}
            `}
            quality={60}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <Image
            src={imageSrc}
            alt={alt}
            width={1200}
            height={800}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes={sizes || "100vw"}
            className={`
              w-full h-auto object-cover object-center
              transition-opacity duration-500
              ${loaded ? "opacity-100" : "opacity-0"}
              ${className}
            `}
            quality={60}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}

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
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-6 text-white text-4xl z-10"
            >
              ✕
            </button>

            <div
              className="relative w-[95vw] h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imageSrc}
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