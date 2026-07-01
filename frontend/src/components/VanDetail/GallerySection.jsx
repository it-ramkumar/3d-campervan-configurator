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

  // 🛑 FALLBACK UI
  if (!hasImages) {
    return (
      <div
        className="relative flex flex-col items-center justify-center text-center p-8 rounded-xl min-h-[450px]"
        style={{
          background: "rgba(2,12,24,0.72)",
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="relative w-40 h-16 opacity-80 mb-4 animate-pulse">
          <Image
            src="https://www.bigbearvans.com/images/blackLogo.webp"
            alt="Big Bear Vans Logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-2 max-w-sm">
          <span className="inline-flex items-center gap-1.5 bg-[#ED985F]/10 text-[#ED985F] text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-[#ED985F]/20">
            <ImageIcon size={12} className="stroke-[2.5]" /> Structural Asset
          </span>
          <h3 className="text-xl font-black text-[#FBFBF9] uppercase tracking-tight pt-2">
            Visuals Coming Soon
          </h3>
          <p className="text-[#FBFBF9]/60 text-xs font-medium leading-relaxed">
            Our engineering studio is currently processing the high-fidelity
            render maps for the {title || "requested signature layout"}.
          </p>
        </div>

        <div
          className="mt-8 pt-6 w-full max-w-xs"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          <span className="block text-[10px] font-bold text-[#FBFBF9]/40 uppercase tracking-widest mb-1">
            The Artisan Promise
          </span>
          <p className="text-sm font-extrabold text-[#ED985F] italic uppercase tracking-wider">
            "You Dream It, We Build It."
          </p>
        </div>
      </div>
    );
  }

  // 🖼️ ACTUAL GALLERY UI
  return (
    <div className="space-y-4">
      {/* <div className="hidden" aria-hidden="true">
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
          ) : null,
        )}
      </div> */}

      {/* MAIN IMAGE CONTAINER */}
<div className="relative flex items-center justify-center overflow-hidden rounded-lg w-full h-auto min-h-[600px] max-h-[850px]">
  {/* RENDER ALL IMAGES & TOGGLE OPACITY INSTANTLY */}
  {gallery.map((img, i) => (
    <Image
      key={img}
      src={img}
      fill
      alt={`${title} - image ${i + 1}`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
      onClick={() => activeImage === i && setIsFullscreen(true)}
      className={`object-contain transition-opacity duration-200 ${
        activeImage === i
          ? "opacity-100 z-10 cursor-zoom-in"
          : "opacity-0 z-0 pointer-events-none"
      }`}
      priority={i === 0}
    />
  ))}

  {/* Navigation Overlays (Keep these exactly as you have them) */}
  {gallery.length > 1 && (
    <>
      <button
        onClick={prevImage}
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-colors"
        style={{
          background: "rgba(2,12,24,0.72)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <ChevronLeft size={20} className="text-[#FBFBF9]" />
      </button>

      <button
        onClick={nextImage}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full z-20 transition-colors"
        style={{
          background: "rgba(2,12,24,0.72)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <ChevronRight size={20} className="text-[#FBFBF9]" />
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
              // FIX 2: Removed "opacity-40 hover:opacity-80" from the inactive state string below
              className={`aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === i
                  ? "border-[#ED985F] scale-[0.98]"
                  : "border-transparent hover:border-[#ED985F]/50"
              }`}
              style={
                activeImage === i
                  ? { boxShadow: "0 0 12px rgba(237,152,95,0.25)" }
                  : {}
              }
            >
              <Image
                src={img}
                width={120}
                height={120}
                alt={`Thumbnail ${i}`}
                className="w-full h-full object-cover"
                priority={i < 5}
              />
            </div>
          ))}
        </div>
      )}

      {/* FULLSCREEN BOX */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-[#020C18]/95 z-[9999] flex items-center justify-center">
          <Image
            key={currentImage}
            src={currentImage}
            width={1400}
            height={1000}
            alt={title}
            className="max-h-[90vh] w-auto object-contain"
          />

          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 text-[#FBFBF9] text-3xl hover:text-[#ED985F] hover:scale-110 transition-all"
          >
            ✕
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[#FBFBF9] p-3 rounded-full transition-colors"
                style={{
                  background: "rgba(13,38,71,0.4)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <ChevronLeft size={32} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#FBFBF9] p-3 rounded-full transition-colors"
                style={{
                  background: "rgba(13,38,71,0.4)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
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
