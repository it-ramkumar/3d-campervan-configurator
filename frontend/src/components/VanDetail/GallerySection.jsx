"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const VanGallery = ({ gallery = [], title = "" }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setActiveImage(0);
  }, [gallery]);

  const hasImages = gallery && gallery.length > 0;
  const currentImage = hasImages ? gallery[activeImage] : "";

  const nextImage = useCallback(() => {
    if (!hasImages) return;
    setActiveImage((prev) => (prev + 1) % gallery.length);
  }, [hasImages, gallery.length]);

  const prevImage = useCallback(() => {
    if (!hasImages) return;
    setActiveImage((prev) => (prev - 1 + gallery.length) % gallery.length);
  }, [hasImages, gallery.length]);

  // 🛑 FALLBACK UI: Agar array khali ho toh yeh box render hoga
  if (!hasImages) {
    return (
      <div
        className="relative flex flex-col items-center justify-center text-center p-8 rounded-xl border border-slate-200/60 shadow-inner min-h-[450px]"
        style={{ backgroundColor: '#F5F5F0' }} // Aapke pure layout ka background color match kiya hai
      >
        {/* Big Bear Vans Brand Logo Watermark Layer */}
        <div className="relative w-40 h-16 opacity-80 mb-4 animate-pulse">
          <Image
            src="https://www.bigbearvans.com/images/blackLogo.webp"
            alt="Big Bear Vans Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Informational Status Frame */}
        <div className="space-y-2 max-w-sm">
          <span className="inline-flex items-center gap-1.5 bg-[#ED985F]/10 text-[#ED985F] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-[#ED985F]/20">
            <ImageIcon size={12} className="stroke-[2.5]" /> Structural Asset
          </span>
          <h3 className="text-xl font-black text-[#001F3D] uppercase tracking-tight pt-2">
            Visuals Coming Soon
          </h3>
          <p className="text-slate-500 text-xs font-medium leading-relaxed">
            Our engineering studio is currently processing the high-fidelity render maps for the {title || "requested signature layout"}.
          </p>
        </div>

        {/* ⚡ BBV SLOGAN SECTION */}
        <div className="mt-8 pt-6 border-t border-slate-300/60 w-full max-w-xs">
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            The Artisan Promise
          </span>
          <p className="text-sm font-extrabold text-[#001F3D] italic uppercase tracking-wider">
            "You Dream It, We Build It."
          </p>
        </div>
      </div>
    );
  }

  // 🖼️ ACTUAL GALLERY UI (Jab data majood ho)
  return (
    <div className="space-y-4">

      {/* Hidden preload: sab full-size images pehle se Next.js cache mein process ho jati hain */}
      <div className="hidden" aria-hidden="true">
        {gallery.map((img, i) =>
          i !== activeImage ? (
            <Image
              key={img}
              src={img}
              width={1000}
              height={800}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
              alt=""
            />
          ) : null
        )}
      </div>

      {/* MAIN IMAGE */}
      <div className="relative flex items-center justify-center overflow-hidden bg-white rounded-lg h-[450px]">

        {/* BACKGROUND IMAGE (fills empty space) */}
        <Image
          src={currentImage}
          fill
          alt=""
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover blur-2xl scale-110 opacity-50"
        />

        {/* FOREGROUND IMAGE — key change se instant switch with fade */}
        <Image
          key={currentImage}
          src={currentImage}
          width={1000}
          height={800}
          alt={title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          onClick={() => setIsFullscreen(true)}
          className="relative max-h-full w-auto object-contain cursor-zoom-in z-10 p-2 animate-fadeIn"
          priority
        />

        {/* Navigation Overlays — Renders only if multi-image set exists */}
        {gallery.length > 1 && (
          <>
            {/* PREV */}
            <button
              onClick={prevImage}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow z-20 hover:bg-white transition-colors"
            >
              <ChevronLeft size={20} className="text-[#001F3D]" />
            </button>

            {/* NEXT */}
            <button
              onClick={nextImage}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow z-20 hover:bg-white transition-colors"
            >
              <ChevronRight size={20} className="text-[#001F3D]" />
            </button>
          </>
        )}

      </div>

      {/* THUMBNAILS */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {gallery.map((img, i) => (
            <div
              key={i}
              onClick={() => setActiveImage(i)}
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === i
                  ? "border-[#ED985F] scale-[0.98] shadow-sm" // Sycned with your parent detail page theme color
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

      {/* FULLSCREEN BOX */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center">

          {/* IMAGE */}
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
            className="absolute top-5 right-5 text-white text-3xl hover:scale-110 transition-transform"
          >
            ✕
          </button>

          {gallery.length > 1 && (
            <>
              {/* PREV */}
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronLeft size={32} />
              </button>

              {/* NEXT */}
              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 text-white p-3 rounded-full hover:bg-white/30 transition-colors"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}

        </div>
      )}

      </div>
  );
};

export default VanGallery;