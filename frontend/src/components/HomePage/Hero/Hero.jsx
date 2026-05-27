"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { slides } from "@/DataUseInComp/homeSlider";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Fallback check agar slides array khali ya undefined ho taake build crash na ho
  const validSlides = slides && slides.length > 0 ? slides : [];

  useEffect(() => {
    if (validSlides.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [validSlides.length]);

  const handleNext = () => {
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % validSlides.length);
      setAnimating(false);
    }, 300);
  };

  const handleDotClick = (index) => {
    if (index === currentSlide) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setAnimating(false);
    }, 300);
  };

  if (validSlides.length === 0) {
    return <div className="min-h-screen bg-primary" />;
  }

  const activeSlide = validSlides[currentSlide];

  // Pure JavaScript Title String formatting
  const renderTitle = (titleText) => {
    if (!titleText) return "";
    const words = titleText.split(" ");
    if (words.length <= 1) return titleText;

    const lastWord = words[words.length - 1];
    const remainingText = words.slice(0, -1).join(" ");

    return (
      <>
        {remainingText} <br />
        <span className="text-hover">{lastWord}.</span>
      </>
    );
  };

  return (
    <section className="relative w-full min-h-screen bg-primary text-secondary overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-16 gap-8 lg:gap-6 pt-24 pb-20 lg:pt-0 lg:pb-0">
      {/* dot grid pattern */}
      <div className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

      {/* LEFT CONTENT — Typography & Actions */}
      <div
        className={`relative z-10 flex flex-col lg:col-span-5 pr-0 lg:pr-6 transition-all duration-500 transform order-1 lg:order-1 ${
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        }`}
      >
        {/* slogan */}
        <p className="text-hover text-[16px] md:text-[22px] italic tracking-[0.03em] mb-2 md:mb-3 font-normal">
          {activeSlide.slogan}
        </p>
        {/* heading */}
        <h1 className="text-[clamp(34px,5.5vw,68px)] font-black italic uppercase leading-[1.0] tracking-tight mb-4 lg:mb-5">
          {renderTitle(activeSlide.title)}
        </h1>

        {/* accent line */}
        <div className="w-11 h-0.5 bg-hover rounded-full mb-4 lg:mb-5" />

        {/* description */}
        <p className="text-sm leading-[1.85] text-white/80 max-w-sm mb-6 lg:mb-9 min-h-[auto] lg:min-h-[60px]">
          {activeSlide.desc}
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-4 mb-6 lg:mb-10 flex-wrap">
          <Link
            href={activeSlide.link || "#"}
            className="bg-hover text-primary text-[11px] font-bold uppercase tracking-[0.1em] px-7 py-3.5 rounded hover:opacity-90 transition-opacity"
          >
            {activeSlide.btnText}
          </Link>

          <Link
            href="/van-layouts"
            className="border border-white/10 text-white/65 text-[11px] font-semibold uppercase tracking-[0.1em] px-6 py-3.5 rounded hover:border-white/25 hover:text-white transition-all"
          >
            Explore layouts →
          </Link>
        </div>

        {/* rating card (Static) */}
        <div className="inline-flex items-center gap-4 bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4 w-fit">
          <div className="flex -space-x-2.5">
            {["#7C6D5A", "#9E8B72", "#B5A488"].map((bg, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#080A0B] flex items-center justify-center text-[10px] font-bold text-white"
                style={{ background: bg }}
              >
                {["J", "M", "R"][i]}
              </div>
            ))}
          </div>
          <div>
            <div className="flex items-center gap-1 mb-0.5">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-3 h-3 text-[#D4A843]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-white/80 text-[11px] font-semibold ml-1">
                5.0
              </span>
            </div>
            <p className="text-white/40 text-[10px] leading-tight">
              200+ happy customers
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT — Aesthetic Slider Display */}
      {/* Mobile par h-[35vh] ya h-[40vh] responsive handle kiya hai taake image full-width aur clean dikhe */}
      <div className="relative w-full h-[35vh] sm:h-[45vh] lg:h-[85vh] lg:col-span-7 flex items-center justify-center z-10 order-2 lg:order-2">
        {validSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id || index}
              className={`absolute w-full h-full flex items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isActive
                  ? "opacity-100 pointer-events-auto translate-x-0 scale-100 lg:scale-105"
                  : "opacity-0 pointer-events-none translate-x-12 scale-95 blur-sm"
              }`}
            >
              <div className="w-full h-full select-none flex items-center justify-center">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={1500}
                  height={1000}
                  priority={index === 0}
                  quality={95}
                  className="w-full h-full object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)] lg:drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Dots Indicator */}
      <div className="absolute bottom-6 lg:bottom-10 left-6 md:left-16 z-20 flex items-center gap-3">
        {validSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className="group relative flex h-4 items-center justify-center focus:outline-none"
            aria-label={`Switch to slide ${index + 1}`}
          >
            <span
              className={`h-[3px] rounded-full transition-all duration-500 ease-out ${
                index === currentSlide
                  ? "w-10 bg-[#D4A843]"
                  : "w-4 bg-white/20 group-hover:bg-white/40"
              }`}
            />
          </button>
        ))}
      </div>

      {/* Soft Bottom Cinematic Gradient */}
      <div className="absolute bottom-0 left-0 w-full h-24 lg:h-32 bg-gradient-to-t from-[#080A0B] via-[#080A0B]/60 to-transparent pointer-events-none z-10" />
    </section>
  );
}
