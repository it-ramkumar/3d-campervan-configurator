"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion"; // 🟢 Added Motion

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

  // Animation Variants for Reveal Effect
  const imageReveal = {
    hidden: { opacity: 0, y: 30, scale: 1.05 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <>
      {/* ======= Thumbnail Wrapper ======= */}
      {/* Wrapper isliye takay overflow-hidden se image reveal cool lage */}
      <div className="overflow-hidden rounded-md h-full w-full">
        <motion.img
          initial={priority ? false : "hidden"} // Priority images foran dikhengi
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={imageReveal}

          src={finalSrc}
          alt={alt}
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}

          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          onClick={() => !click && setIsModalOpen(true)}

          className={`
            ${className}
            border border-gray-300 object-cover
            transition-all duration-300 ease-in-out
            ${!loaded && !priority ? "bg-gray-200 animate-pulse" : ""}
            cursor-pointer
          `}
          style={{ borderRadius: '8px' }} // Normal rounded borders as requested
          sizes={sizes}
        />
      </div>

      {/* ======= True Fullscreen Modal (via Portal) ======= */}
      {!click && isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
}