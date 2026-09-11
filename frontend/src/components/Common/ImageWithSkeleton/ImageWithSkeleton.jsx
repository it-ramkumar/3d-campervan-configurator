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
        className={`relative overflow-hidden bg-gray-100 ${
          zoom ? "cursor-zoom-in" : ""
        }`}
        onClick={() => zoom && setIsModalOpen(true)}
      >
        {/* Skeleton */}
        {skeleton && !loaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
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