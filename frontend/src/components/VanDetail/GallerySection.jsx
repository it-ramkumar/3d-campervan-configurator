"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronDown, Image as ImageIcon, Maximize2 } from "lucide-react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PhotoViewer from "@/components/PhotoViewer/PhotoViewer";

const VanGallery = ({ gallery = [], title = "" }) => {
  const [activeImage, setActiveImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasMoreThumbs, setHasMoreThumbs] = useState(false);
  const mainSwiperRef = useRef(null);
  const fullscreenSwiperRef = useRef(null);
  const thumbScrollRef = useRef(null);

  const checkThumbOverflow = useCallback(() => {
    const el = thumbScrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 4;
    setHasMoreThumbs(el.scrollHeight > el.clientHeight + 4 && !atBottom);
  }, []);

  useEffect(() => {
    setActiveImage(0);
    checkThumbOverflow();
  }, [gallery, checkThumbOverflow]);

  useEffect(() => {
    if (mainSwiperRef.current && mainSwiperRef.current.activeIndex !== activeImage) {
      mainSwiperRef.current.slideTo(activeImage);
    }
    if (fullscreenSwiperRef.current && fullscreenSwiperRef.current.activeIndex !== activeImage) {
      fullscreenSwiperRef.current.slideTo(activeImage);
    }
  }, [activeImage]);

  const hasImages = gallery && gallery.length > 0;

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
            sizes="160px"
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

      {/* MAIN IMAGE CONTAINER */}
<div className="relative flex items-center justify-center overflow-hidden rounded-lg w-full h-auto aspect-square bg-[#020C18]/95">
  {/* SWIPER: touch/swipe on mobile, arrow buttons below still work via ref */}
  <Swiper
    onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
    onSlideChange={(swiper) => setActiveImage(swiper.activeIndex)}
    onClick={(swiper) => {
      // A tap (not a swipe) on the photo opens the full-screen viewer.
      if (typeof swiper.clickedIndex === "number") setActiveImage(swiper.clickedIndex);
      setIsFullscreen(true);
    }}
    initialSlide={activeImage}
    className="absolute inset-0 h-full w-full cursor-zoom-in"
  >
    {gallery.map((img, i) => (
      <SwiperSlide key={img} className="relative h-full w-full">
        <Image
          src={img}
          fill
          alt={`${title} - image ${i + 1}`}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          className="object-contain"
          priority={i === 0}
        />
      </SwiperSlide>
    ))}
  </Swiper>

  {/* EXPAND / FULL VIEW ICON */}
  <button
    onClick={() => setIsFullscreen(true)}
    className="absolute bottom-3 right-3 p-2 rounded-full z-20 transition-colors hover:border-[#ED985F]/50"
    style={{
      background: "rgba(2,12,24,0.72)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.07)",
    }}
    aria-label="View photos full screen"
    data-bbvt-click="gallery_expand"
  >
    <Maximize2 size={16} className="text-[#FBFBF9]" />
  </button>

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
        <div className="relative">
          <div
            ref={thumbScrollRef}
            onScroll={checkThumbOverflow}
            role="region"
            aria-label="Image thumbnails — scroll to see more"
            tabIndex={0}
className="!scrollbar grid max-h-[180px] grid-cols-5 gap-3 !overflow-y-scroll !overscroll-y-contain !p-1 sm:max-h-[320px] !focus-visible:outline-5 !focus-visible:outline-hover"          >
            {gallery.map((img, i) => (
              <button
                type="button"
                key={i}
                aria-label={`Photo ${i + 1} of ${gallery.length}`}
                data-bbvt-click="gallery_thumb"
                onClick={() => {
                  setActiveImage(i);
                  // On phones/tablets a thumbnail tap opens the swipeable full-screen viewer.
                  if (window.matchMedia?.("(pointer: coarse)").matches) setIsFullscreen(true);
                }}
                // FIX 2: Removed "opacity-40 hover:opacity-80" from the inactive state string below
                className={`block w-full p-0 aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === i
                    ? "border-hover opacity-40 scale-[0.98]"
                    : "border-transparent hover:border-hover/50"
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
              </button>
            ))}
          </div>

          {/* MORE THUMBS INDICATOR */}
          {hasMoreThumbs && (
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 flex h-8 items-end justify-center rounded-b-lg"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(2,12,24,0) 0%, rgba(2,12,24,0.85) 100%)",
              }}
            >
              <ChevronDown
                size={14}
                className="mb-0.5 text-[#ED985F] animate-bounce"
              />
            </div>
          )}
        </div>
      )}

      {/* FULLSCREEN VIEWER: swipe, pinch/double-tap zoom, Esc or X to close */}
      {isFullscreen && (
        <PhotoViewer images={gallery} start={activeImage} title={title} onClose={() => setIsFullscreen(false)} />
      )}
    </div>
  );
};

export default VanGallery;
