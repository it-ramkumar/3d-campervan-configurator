"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
// Props mein 'priority' add karein (default false rakhein)
export default function ImageWithSkeleton({
  src,
  alt,
  className = "",
  click = false,
  priority = false,// 🟢 New Prop
  sizes,

}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const finalSrc = error ? "/no-image.png" : src;

  return (
    <>
      {/* ======= Thumbnail Image ======= */}
      <img
        src={finalSrc}
        alt={alt}
        // 🟢 Priority instructions
        fetchPriority={priority ? "high" : "low"}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}

        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        onClick={() => !click && setIsModalOpen(true)}

        className={`
    ${className}
    border border-gray-300 rounded-md object-cover
    transition-all duration-300 ease-in-out
    ${!loaded && !priority ? "bg-gray-200 animate-pulse" : ""}
    ${priority ? "opacity-100" : (loaded ? "opacity-100" : "opacity-0")}
  `}
        sizes={sizes}
      />

      {/* ======= True Fullscreen Modal (via Portal) ======= */}
      {!click && isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative w-full h-full bg-black flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-8 text-white text-4xl font-bold hover:text-gray-400 z-10"
              >
                ✕
              </button>

              <img
                src={finalSrc}
                alt={alt}
                className="max-w-[95%] max-h-[90%] object-contain rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
