"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const VanGallery = ({ gallery = [], title = "" }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentImage = gallery?.[activeImage] || "";

  // NEXT
  const nextImage = () => {
    if (!gallery.length) return;
    setActiveImage((prev) => (prev + 1) % gallery.length);
  };

  // PREV
  const prevImage = () => {
    if (!gallery.length) return;
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (
    <div className="space-y-4">

      {/* MAIN IMAGE */}
      <div className="relative flex items-center justify-center overflow-hidden bg-white rounded-lg">

        {/* BACKGROUND IMAGE (fills empty space) */}
        <Image
          src={currentImage}
          fill
          alt={title}
          className="object-cover blur-2xl scale-110 opacity-50"
        />

        {/* FOREGROUND IMAGE (actual clean image) */}
        <Image
          src={currentImage}
          width={1000}
          height={800}
          alt={title}
          onClick={() => setIsFullscreen(true)}
          className="relative max-h-full w-auto object-contain cursor-zoom-in"
        />

        {/* PREV */}
        <button
          onClick={prevImage}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow z-20"
        >
          <ChevronLeft size={20} />
        </button>

        {/* NEXT */}
        <button
          onClick={nextImage}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow z-20"
        >
          <ChevronRight size={20} />
        </button>

      </div>

      {/* THUMBNAILS */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i)}
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${activeImage === i
                  ? "border-[#ED3500]"
                  : "border-transparent opacity-60 hover:opacity-100"
                }`}
            >
              <Image
                src={img}
                width={120}
                height={120}
                alt={`Thumbnail ${i}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">

          {/* IMAGE (KEY FIX FOR INSTANT UPDATE) */}
          <Image
            key={currentImage}
            src={currentImage}
            width={1400}
            height={1000}
            alt={title}
            className="max-h-[90vh] w-auto object-contain"
          />

          {/* CLOSE */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 text-white text-3xl"
          >
            ✕
          </button>

          {/* PREV */}
          <button
            onClick={prevImage}
            className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full"
          >
            <ChevronLeft size={32} />
          </button>

          {/* NEXT */}
          <button
            onClick={nextImage}
            className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full"
          >
            <ChevronRight size={32} />
          </button>

        </div>
      )}

    </div>
  );
};

export default VanGallery;