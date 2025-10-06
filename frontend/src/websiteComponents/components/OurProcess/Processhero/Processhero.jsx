"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

// A more relevant placeholder image for van layouts.
const heroImage = "/heroSlider/processhero.png";

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

      // Animate the new content elements sequentially
      tl.from(".anim-content", {
        y: 80, // Animate from bottom
        opacity: 0,
        stagger: 0.2, // Small delay between each element
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text Content - Centered */}
      {/* CHANGED: Removed 'z-10' to prevent overlap with the mobile navigation menu */}
      <div className="relative flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <h1 className="anim-content font-serif font-extrabold text-4xl md:text-[64px] text-white leading-none drop-shadow-xl max-w-[981px]">
          Our Process At Big Bear Vans
        </h1>

        {/* Subheading */}
        <p className="anim-content mt-4 font-serif font-normal text-lg md:text-[28px] text-white opacity-90 leading-none drop-shadow-lg max-w-[902px]">
          A complete process of how we customize your dream custom van
        </p>

        {/* Button */}
      <Link to={"/contact"}>  <button className="anim-content mt-8 px-5 py-2.5 bg-[#2761FD] rounded-[5px] transition-colors hover:bg-blue-700">
          <span className="font-sans font-bold text-sm text-white leading-none">
            Contact Us
          </span>
        </button></Link>

      </div>
    </div>
  );
}