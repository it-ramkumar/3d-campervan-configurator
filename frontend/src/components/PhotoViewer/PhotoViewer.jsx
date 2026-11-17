"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard, Zoom } from "swiper/modules";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "swiper/css";
import "swiper/css/zoom";
import { bbvt } from "@/lib/bbvt";

// Full-screen, swipeable photo viewer (Nov 2026). Opens when a visitor taps a van photo
// (the tracker showed hundreds of taps on photos that did nothing). Swipe or use the
// arrows/keyboard, pinch or double-tap to zoom, Esc / X / tap the dark edge to close.
export default function PhotoViewer({ images = [], start = 0, title = "", onClose }) {
  const [index, setIndex] = useState(start);
  const swiperRef = useRef(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    bbvt("photo_open", { n: images.length, i: start, t: title.slice(0, 60) });
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (typeof document === "undefined" || !images.length) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photos`}
      data-lenis-prevent
      className="fixed inset-0 z-[10050] flex flex-col bg-black/95 text-white"
      style={{ paddingTop: "env(safe-area-inset-top, 0px)", paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 px-4 py-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-bold uppercase tracking-wide">{title}</p>
          <p className="text-xs text-white/60 tabular-nums">
            {index + 1} / {images.length}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photos"
          data-bbvt-click="photo_close"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X size={22} />
        </button>
      </div>

      <div className="relative min-h-0 flex-1">
        <Swiper
          modules={[Keyboard, Zoom]}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3 }}
          initialSlide={start}
          spaceBetween={12}
          onSwiper={(s) => (swiperRef.current = s)}
          onSlideChange={(s) => setIndex(s.activeIndex)}
          className="h-full w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={`${src}-${i}`} className="!flex h-full w-full items-center justify-center">
              <div className="swiper-zoom-container">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} photo ${i + 1}`}
                  loading={Math.abs(i - start) < 2 ? "eager" : "lazy"}
                  className="max-h-full max-w-full select-none object-contain"
                  draggable={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={index === 0}
              className="absolute left-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 sm:flex"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={index === images.length - 1}
              className="absolute right-2 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-30 sm:flex"
            >
              <ChevronRight size={28} />
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex shrink-0 justify-center gap-1.5 px-4 py-4" aria-hidden="true">
          {images.slice(0, 20).map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === index ? "w-5 bg-white" : "w-1.5 bg-white/35"}`} />
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
