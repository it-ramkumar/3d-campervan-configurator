"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const heroImage = "/heroSlider/CampervansLayoutforFamilyhero.webp";

const line1Text = "Campervans Layouts";
const line2Part1Text = "for Family ";
const line2Part2Text = "(For 2+)";

export default function FamilyLayoutHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1 },
        {
          scale: 1.1,
          x: "random(-3%, 3%)",
          y: "random(-3%, 3%)",
          duration: 15,
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );

      const tl = gsap.timeline();
      tl.from(".anim-line", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="bg-image absolute inset-0 w-full h-full object-cover"
        loading="eager"
        decoding="async"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      {/* MODIFIED: Adjusted horizontal padding for better mobile spacing */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-6 sm:px-8 md:px-16 lg:px-24">
        {/* MODIFIED: Made font size responsive for mobile */}
        <h1 className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          <span className="anim-line block text-white">{line1Text}</span>
          <span className="anim-line block text-white">
            {line2Part1Text}
            <span className="text-[#2761FD]">{line2Part2Text}</span>
          </span>
        </h1>
      </div>
    </div>
  );
}