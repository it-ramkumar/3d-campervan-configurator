"use client";

import React, { useEffect, useState } from "react";
import { Heading1, RichParagraph, PrimaryButton, SecondaryButton } from "../../Common/Common";

// The 3D build animation lives in public/van-hero (plain three.js). It runs in an iframe with
// ?embed=1 so it hides its own headline and loading text; the headline sits here in the page for SEO.
const HERO_SRC = "/van-hero/index.html?embed=1";
// Never leave the hero covered if the iframe can't report back (blocked script, very slow network)
const LOADER_TIMEOUT_MS = 20000;

export default function VanHero() {
  const [ready, setReady] = useState(false);
  const [loaderGone, setLoaderGone] = useState(false);

  useEffect(() => {
    const onMessage = (e) => {
      if (e.origin !== window.location.origin || e.data?.source !== "van-hero") return;
      if (e.data.type === "ready" || e.data.type === "error") setReady(true);
    };
    window.addEventListener("message", onMessage);
    const timer = setTimeout(() => setReady(true), LOADER_TIMEOUT_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, []);

  return (
    <section className="van-hero relative w-full overflow-hidden bg-[#0E2C49]">
      <iframe
        src={HERO_SRC}
        title="Animation: an empty van being fitted out with a kitchen, shower, bed and storage"
        className="absolute inset-0 h-full w-full border-0"
        loading="eager"
      />

      {/* Headline and buttons (pointer events only on the content, so the van stays draggable) */}
      <div className="van-hero-copy pointer-events-none absolute z-10 text-white">
        <div className="pointer-events-auto">
          <RichParagraph variant="sub" textColor="!text-hover" className="uppercase font-bold mb-3">
            Empty van in. Home on wheels out.
          </RichParagraph>
          <Heading1 as="h1" variant="hero" textColor="text-white" className="!text-[28px] sm:!text-4xl lg:!text-5xl">
            California&apos;s Best Custom Camper Van Builder
            <span className="block text-secondary/60">Big Bear Vans</span>
          </Heading1>
          <div className="w-12 h-[3px] bg-hover rounded-full my-4" />
          <RichParagraph variant="hero" textColor="text-secondary/80" className="hidden sm:block max-w-[44ch] !text-base md:!text-lg">
            We take your van from zero to road-ready, all built in-house in Big Bear, California: electric elevator
            beds, moto vans with garages for your bikes, kitchens, showers, off-grid power and everything in between.
          </RichParagraph>
          <div className="flex flex-row flex-wrap gap-3 mt-6">
            <PrimaryButton
              label="Build Your Own Van"
              link="/build-your-own-camper-van"
              className="!bg-hover !border-hover !text-primary hover:!bg-secondary hover:!border-secondary"
            />
            <SecondaryButton
              label="See Vans For Sale"
              link="/camper-vans-for-sale"
              className="!bg-transparent !text-secondary !border-secondary/40 hover:!bg-secondary hover:!text-primary"
            />
          </div>
        </div>
      </div>

      {/* Skeleton where the van appears, until the 3D scene is on screen (headline stays visible) */}
      {!loaderGone && (
        <div
          role="status"
          aria-live="polite"
          className={`van-hero-skel pointer-events-none absolute z-[5] flex flex-col items-center justify-center gap-4 transition-opacity duration-500 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
          onTransitionEnd={() => ready && setLoaderGone(true)}
        >
          <svg viewBox="64 40 194 90" className="w-[38%] max-w-[220px] h-auto" aria-hidden="true">
            <path
              d="M70 112 L70 61 Q70 52 79 52 L200 52 Q209 52 215 59 L231 84 L245 89 Q252 92 252 100 L252 112 Z"
              fill="none"
              stroke="#8FC8F0"
              strokeOpacity="0.45"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <circle cx="100" cy="112" r="13" fill="none" stroke="#8FC8F0" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 3" />
            <circle cx="218" cy="112" r="13" fill="none" stroke="#8FC8F0" strokeOpacity="0.45" strokeWidth="1.5" strokeDasharray="4 3" />
          </svg>
          <span className="font-ui text-[11px] uppercase tracking-[0.3em] font-semibold text-[#A9C1D6]">
            Loading 3D scene…
          </span>
        </div>
      )}

      <style>{`
        .van-hero { height: calc(100svh - 65px); min-height: 600px; }
        /* Same spots the iframe leaves free: left of the van on wide screens, above it on narrow/portrait ones */
        .van-hero-copy {
          left: clamp(20px, 6vw, 88px);
          top: 50%;
          transform: translateY(-50%);
          max-width: min(560px, 44vw);
        }
        @media (max-width: 820px), (orientation: portrait) {
          .van-hero-copy { top: 28px; right: 20px; left: 20px; transform: none; max-width: none; }
        }
        /* Skeleton sits where the iframe draws the van: right of the copy, or below it on narrow screens */
        .van-hero-skel {
          left: 70%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: min(46vw, 640px);
          aspect-ratio: 16 / 10;
          border-radius: 16px;
          border: 1px dashed rgba(143, 200, 240, 0.3);
          background: rgba(127, 200, 255, 0.04);
          overflow: hidden;
        }
        .van-hero-skel::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(100deg, transparent 20%, rgba(143, 200, 240, 0.12) 50%, transparent 80%);
          transform: translateX(-100%);
          animation: van-hero-shimmer 1.6s ease-in-out infinite;
        }
        @keyframes van-hero-shimmer { to { transform: translateX(100%); } }
        @media (max-width: 820px), (orientation: portrait) {
          .van-hero-skel { left: 50%; top: 72%; width: 88vw; }
        }
        @media (prefers-reduced-motion: reduce) {
          .van-hero-skel::after { animation: none; }
        }
      `}</style>
    </section>
  );
}
