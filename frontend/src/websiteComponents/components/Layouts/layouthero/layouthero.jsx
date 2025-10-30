"use client";
import { useEffect, useRef } from "react";

const heroImage = "/heroSlider/layouthero.webp";
const part1Text = "Explore Layouts of Our";
const part2Text = "Custom Vans";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Smooth scroll behavior for the whole page
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden"
    >
      {/* Background Image with slight zoom animation */}
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="absolute inset-0 w-full h-full object-cover animate-kenburns"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-8 md:px-16 lg:px-24">
        <h1 className="font-serif font-black text-5xl md:text-6xl lg:text-[64px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <span className="block text-white animate-fadeInUp">
            {part1Text}
          </span>
          <span className="block text-[#2761FD] animate-fadeInUp delay-200">
            {part2Text}
          </span>
        </h1>
      </div>
    </div>
  );
}
