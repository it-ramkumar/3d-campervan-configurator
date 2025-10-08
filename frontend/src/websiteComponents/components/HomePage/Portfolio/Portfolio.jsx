"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Image sources for the layout
const images = [
  { id: 1, src: "/images/p1.jpg", alt: "Spacious custom van interior with wood paneling" },
  { id: 2, src: "/images/p2.jpg", alt: "Overhead view of a custom van kitchen and seating area" },
  { id: 3, src: "/images/p3.jpg", alt: "Detailed shot of a compact van kitchenette" },
  { id: 4, src: "/images/p4.jpg", alt: "Cozy sleeping nook inside a custom camper van" },
  { id: 5, src: "/images/p5.jpg", alt: "Van interior showing storage solutions and seating" },
];

export default function Portfolio() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const imageGridRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate heading and description
      gsap.fromTo(
        [headingRef.current, subHeadingRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // --- UPDATED: More dynamic staggered reveal for images (Desktop) ---
      // Apply these animations only to the desktop-specific grid
      if (imageGridRef.current) {
        const imageElements = gsap.utils.toArray(imageGridRef.current.querySelectorAll(".image-container"));
        gsap.fromTo(
          imageElements,
          { y: 60, opacity: 0, scale: 0.95, rotation: 'random(-5, 5)' },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: imageGridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        gsap.to(imageGridRef.current, {
          y: "-5vh",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });

        // --- UPDATED: Advanced 3D Tilt + Glow hover effects for each image (Desktop) ---
        imageElements.forEach((container) => {
          const image = container.querySelector('img');
          const tl = gsap.timeline({ paused: true });

          tl.to(container, {
            rotationY: container.dataset.side === 'left' ? -8 : 8,
            rotationX: 5,
            boxShadow: "0px 25px 40px -15px rgba(0,0,0,0.4)",
            duration: 0.6,
            ease: "power3.out",
          }).to(image, {
            scale: 1.1,
            filter: "brightness(1.1)",
            duration: 0.6,
            ease: "power3.out",
          }, 0);

          container.addEventListener("mouseenter", () => tl.play());
          container.addEventListener("mouseleave", () => tl.reverse());
        });
      }

      // --- UPDATED: Button hover effect ---
      const button = buttonRef.current;
      if (button) {
        const shimmer = button.querySelector(".shimmer");

        const buttonTl = gsap.timeline({ paused: true });
        buttonTl.fromTo(shimmer,
          { x: "-110%", skewX: -25 },
          { x: "110%", duration: 0.7, ease: "power2.inOut" }
        );

        button.addEventListener("mouseenter", () => buttonTl.restart());
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className="container mx-auto px-4">
        {/* Heading + Desc */}
        <div className="text-center md:mb-16 mb-10">
          <h2
            ref={headingRef}
           className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight font-serif"
          >
            From Dream to Your Driveway
          </h2>
          <p
            ref={subHeadingRef}
            className="font-serif sm:text-base text-sm  text-black/70 max-w-4xl mx-auto mt-4"
          >
            Take a look at some of our best custom vans.
          </p>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div
          ref={imageGridRef}
          className="mx-auto max-w-screen-xl h-[725px] hidden lg:block"
          style={{ perspective: "1500px" }}
        >
          <div className="flex h-full gap-4">
            {/* Left Column (Image 1) */}
        <div
  className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[492px] h-[725px]"
  style={{ transformStyle: "preserve-3d" }}
  data-side="left"
>
  <img
    src={images[0].src}
    alt={images[0].alt}
    className="w-full h-full object-cover"
    style={{ filter: "contrast(1.05) saturate(1.1)" }}
  />
</div>


            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Top Image (Image 2) */}
             <div
  className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[699px] h-[402px]"
  style={{ transformStyle: "preserve-3d" }}
  data-side="right"
>
  <img
    src={images[1].src}
    alt={images[1].alt}
    className="w-full h-full object-cover"
    style={{ filter: "contrast(1.05) saturate(1.1)" }}
  />
</div>

              {/* Bottom Row Images (3, 4, 5) */}
              <div className="flex-1 flex gap-4">
                {images.slice(2).map((image) => (
              <div
  key={image.id}
  className="image-container relative rounded-[28px] overflow-hidden border-2 border-gray-800 shadow-2xl w-[227px] h-[313px]"
  style={{ transformStyle: "preserve-3d" }}
  data-side="right"
>
  <img
    src={image.src}
    alt={image.alt}
    className="w-full h-full object-cover"
    style={{ filter: "contrast(1.05) saturate(1.1)" }}
  />
</div>

                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="block lg:hidden mt-8">
          {/* First row: 2 images */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            {images.slice(0, 2).map((image) => (
            <div
  key={image.id}
  className="relative h-64 rounded-xl overflow-hidden shadow-lg border-2 border-gray-800"
>
  <img
    src={image.src}
    alt={image.alt}
    className="w-full h-full object-cover"
  />
</div>

            ))}
          </div>
          {/* Second row: 3 images */}
          <div className="grid grid-cols-3 gap-4">
            {images.slice(2).map((image) => (
             <div
  key={image.id}
  className="relative h-40 rounded-xl overflow-hidden shadow-lg border-2 border-gray-800"
>
  <img
    src={image.src}
    alt={image.alt}
    className="w-full h-full object-cover"
    style={{ filter: "contrast(1.05) saturate(1.1)" }} // optional effect
  />
</div>

            ))}
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center mt-16">
          <Link to="/layouts">
          <button
            ref={buttonRef}
            className="relative flex items-center cursor-pointer justify-center text-white bg-[#2761FD] rounded-md font-serif font-bold text-sm h-12 w-48 transition-transform transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-blue-500/50 overflow-hidden"
          >
            <span className="shimmer absolute top-0 left-0 w-full h-full bg-white/20 block"></span>
            <span className="relative z-10">View Our Portfolio</span>
          </button></Link>
        </div>
      </div>
    </section>
  );
}