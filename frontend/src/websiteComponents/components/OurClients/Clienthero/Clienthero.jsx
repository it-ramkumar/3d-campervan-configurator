"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const heroImage = "/OurClients/client.png";
const newTitleText = "Our Clients at Big Bear Vans";
// REMOVED: const newDescriptionText

export default function HeroV() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Background Parallax/Ken Burns Effect (kept as is)
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

      // Text Entrance Animation (Simplified to only animate title)
      tl.from(".title-char", {
        y: 80,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power3.out",
      });

      // REMOVED: .from(".anim-item", ...) as those elements are gone
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Function to render text with word-wrapping awareness (kept as is)
  const renderTitle = (text) => {
    const words = text.split(" ");

    return words.map((word, wordIndex) => (
      <span key={wordIndex} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className="inline-block title-char"
            style={{ whiteSpace: "pre" }}
          >
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 && (
          <span
            className="inline-block title-char"
            style={{ whiteSpace: "pre" }}
          >
            {" "}
          </span>
        )}
      </span>
    ));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden "
    >
      <img
        src={heroImage}
        alt="Camper Vans For Sale"
        className="absolute inset-0 w-full h-full object-cover z-0 bg-image object-top md:object-center"
      />
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 md:px-8">
        <div className="max-w-4xl text-center">
          <h1
            className="text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight md:leading-normal font-serif text-white"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)" }}
          >
            {/* *** THIS IS THE FIX ***
              Removed 'inline-block' and 'whitespace-nowrap' from this div.
              This allows the title to wrap naturally on mobile,
              while the 'text-center' on the parent div handles alignment.
            */}
            <div
              className="" // <--- CLASSES REMOVED
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {renderTitle(newTitleText)}
            </div>
          </h1>

          {/* REMOVED: Description Block */}

          {/* REMOVED: New Button Block */}
        </div>
      </div>
    </div>
  );
}