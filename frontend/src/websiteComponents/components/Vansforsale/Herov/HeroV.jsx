import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"

const heroImage = "/heroSlider/herov.jpg";
const newTitleText = "Camper Vans For Sale";
const newDescriptionText = "Buy our exclusive and ready-to-roll vans for sale Today.";


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

      // Text and Button Entrance Animation (kept as is)
      tl.from(".title-char", {
        y: 80,
        opacity: 0,
        stagger: 0.03,
        duration: 1.2,
        ease: "power3.out",
      }).from(
        ".anim-item",
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
        },
        "-=0.8"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Function to render text with character splitting for GSAP
  const renderTitle = (text) => {
    return text.split("").map((char, index) => (
      <span
        key={index}
        className="inline-block title-char"
        style={{ whiteSpace: "pre" }}
      >
        {char}
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
        {/* MODIFICATION 1: Removed space-y-* classes for individual control */}
        <div className="max-w-4xl text-center">
          <h1
            className="text-3xl md:text-5xl lg:text-[64px] font-extrabold leading-tight md:leading-normal font-serif text-white"
            style={{ textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)" }}
          >
            <div
              className="inline-block"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              {renderTitle(newTitleText)}
            </div>
          </h1>

          {/* Description Block */}
          {/* MODIFICATION 2: Added a small top margin to reduce the gap after the title */}
          <div
            className="anim-item mt-2"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <p
              className="text-base md:text-lg lg:text-[20px] font-normal font-serif text-white max-w-3xl mx-auto"
              style={{ textShadow: "1px 1px 6px rgba(0, 0, 0, 0.7)" }}
            >
              {newDescriptionText}
            </p>
          </div>

          {/* New Button Block */}
          {/* MODIFICATION 3: Added a larger top margin to create more space before the button */}
          <div
            className="anim-item mt-8"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
          >
            <Link to="/inquiry">
            <button
              className="bg-[#2761FD] cursor-pointer text-white font-bold text-[14px] px-5 py-[10px] rounded-[5px] transition duration-300 hover:bg-[#1f50c0] shadow-lg"
            >
              Get a Quote
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}