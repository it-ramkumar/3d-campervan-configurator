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
      {/* Container to hold Image + Overlay */}
      <div className="relative w-full h-full group overflow-hidden rounded-md">

        {/* ======= Thumbnail Image ======= */}
        <Image
          src={finalSrc}
          alt={alt}
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={() => !click && setIsModalOpen(true)}
          unoptimized
          className={`
            ${className}
            w-full h-full border border-gray-300 object-cover
            transition-all duration-500 ease-in-out
            ${!loaded && !priority ? "bg-gray-200 animate-pulse" : ""}
            ${priority ? "opacity-100" : (loaded ? "opacity-100" : "opacity-0")}
          `}
          sizes={sizes}
          width={800}
          height={600}
        />

        {/* ======= ✅ Aesthetic Black Overlay ======= */}
        {/* Is layer se image par neeche se halka black gradient aayega */}
        <div
          className="absolute inset-0 pointer-events-none
          bg-gradient-to-t from-black/50 via-black/10 to-transparent
          opacity-80 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Optional: Agar aapko bilkul halki black layer chahiye poori image pe */}
        <div className="absolute inset-0 pointer-events-none bg-black/5 mix-blend-multiply" />
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