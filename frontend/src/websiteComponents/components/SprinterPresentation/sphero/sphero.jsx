"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const heroImage = "/sprinter/sphero.jpg";

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ANIMATION
      // We start scale at 1.1 to allow room for movement without showing edges
      gsap.fromTo(
        ".bg-image",
        { 
          scale: 1.1, 
          x: 0, 
          y: 0 
        },
        {
          scale: 1.2,
          xPercent: -2, // Use xPercent instead of px or vw for safer responsiveness
          yPercent: -2,
          duration: 20, // Slower, smoother
          ease: "none",
          repeat: -1,
          yoyo: true,
        }
      );

      const tl = gsap.timeline();

      tl.from(".anim-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      // CRITICAL FIXES:
      // 1. 'w-full': Takes 100% of available width, but respects scrollbars.
      // 2. 'max-w-full': Ensures it never exceeds the parent.
      // 3. 'overflow-hidden': Cuts off any image overhang immediately.
      // 4. 'm-0 p-0': Removes all spacing that creates white bars.
      className="relative w-full max-w-full h-[60vh] md:h-[90vh] overflow-hidden m-0 p-0 bg-black block"
    >
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Interior of a custom converted van"
        // 'w-full h-full' ensures it fills the container exactly
        className="bg-image absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 pb-16 md:pb-0 text-center">
        
        {/* Heading */}
        {/* REDUCED FONT SIZES: text-xl (from 2xl), sm:text-3xl (from 4xl), md:text-[56px] (from 64px) */}
        <h1 className="anim-content font-serif font-extrabold text-white leading-tight drop-shadow-xl max-w-[90%] md:max-w-[981px] mx-auto text-xl sm:text-3xl md:text-[56px]">
          Choosing The Right Sprinter Van For Custom Conversion
          <span className="text-[#2761FD]"></span>
        </h1>

      </div>
    </section>
  );
}