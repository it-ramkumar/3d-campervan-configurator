"use client";
import Image from "next/image";
import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  click = false,
  priority = false,
  sizes,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finalSrc = error ? "/no-image.png" : src;

  return (
    <>
      <div className="relative w-full h-full group overflow-hidden rounded-md bg-gray-100">
        <Image
          src={finalSrc}
          alt={alt}
          // LCP Optimization: Priority images should load immediately
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={() => !click && setIsModalOpen(true)}
          // IMPORTANT: Agar images external hain to 'unoptimized' sahi hai,
          // lekin agar local hain to ise hata dein taaki Next.js compress kar sake.
          unoptimized
          className={`
            ${className}
            w-full h-full object-cover transition-opacity duration-700
            ${priority ? "opacity-100" : (loaded ? "opacity-100" : "opacity-0")}
          `}
          sizes={sizes || (priority ? "100vw" : "(max-width: 768px) 100vw, 50vw")}
          width={800}
          height={600}
        />

        {/* Aesthetic Overlays - Pointer events none taaki Swiper drag ho sake */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
      </div>
      {/* ======= Fullscreen Modal (No changes here) ======= */}
      {!click && isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-8 text-white text-4xl font-light hover:text-gray-400 z-10"
              >
                ✕
              </button>

              <Image
                src={finalSrc}
                alt={alt}
                unoptimized
                className="max-w-[95%] max-h-[90%] object-contain rounded-xl shadow-2xl"
                width={1200}
                height={900}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}