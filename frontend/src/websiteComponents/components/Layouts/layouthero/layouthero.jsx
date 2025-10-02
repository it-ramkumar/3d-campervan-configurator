"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// A more relevant placeholder image for van layouts.
const heroImage = "/heroSlider/layouthero.jpg";

// Text content for the new heading
const part1Text = "Explore Layouts of Our";
const part2Text = "Custom Vans";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP context for safe cleanup
    const ctx = gsap.context(() => {
      // Background image animation (Ken Burns effect)
      gsap.fromTo(
        ".bg-image",
        { scale: 1, x: 0, y: 0 },
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

      // Text animation timeline
      const tl = gsap.timeline();
      
      // Animate the two lines of the heading sequentially
      tl.from(".anim-line", {
        y: 100, // Animate from bottom
        opacity: 0,
        stagger: 0.2, // Small delay between each line
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    // Cleanup function to revert animations when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    // The ref is attached here for GSAP's context
    <div ref={containerRef} className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        className="bg-image absolute inset-0 w-full h-full object-cover"
      />

      {/* UPDATED: Overlay opacity increased to make text pop */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex flex-col items-start justify-center h-full text-left px-8 md:px-16 lg:px-24">
        {/* UPDATED: Font weight is now 'font-black' and drop-shadow is stronger */}
        <h1 className="font-serif font-black text-5xl md:text-6xl lg:text-[64px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
          {/* First line of text */}
          <span className="anim-line block text-white">
            {part1Text}
          </span>
          {/* Second line of text with specified blue color */}
          <span className="anim-line block text-[#2761FD]">
            {part2Text}
          </span>
        </h1>
      </div>
    </div>
  );
}