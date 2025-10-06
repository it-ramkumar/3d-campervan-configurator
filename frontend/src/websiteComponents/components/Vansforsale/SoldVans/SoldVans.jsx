"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin - ensures it's available client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data for the sold camper vans
const FEATURED_VAN = {
  id: 1,
  title: "Mercedes-Benz Sprinter 170 AWD",
  imageUrl: "/images/sold1.jpg",
};

const SOLD_VANS_GRID = [
  // { id: 1, title: "Montreal", imageUrl: "/images/Montrial.jpg" },
  { id: 2, title: "2024 Mercedes Sprinter 170 AWD", imageUrl: "/images/sold2.jpg" },
  { id: 3, title: "Mercedes-Benz Sprinter 170 AWD", imageUrl: "/images/sold3.jpg" },
  { id: 4, title: "2022 Mercedes Sprinter 144 AWD", imageUrl: "/images/sold4.jpg" },
  { id: 5, title: "2023 Mercedes Sprinter 144 Diesel", imageUrl: "/images/sold5.jpg" },
  { id: 6, title: "2024 Mercedes-Benz Sprinter 170 AWD", imageUrl: "/images/sold6.jpg" },
  { id: 7, title: "Mercedes-Benz Sprinter 144 AWD", imageUrl: "/images/sold7.jpg" },
  { id: 8, title: "White Ford Transit 148 AWD", imageUrl: "/images/sold8.jpg" },
  { id: 9, title: "Mercedes-Benz Sprinter 170 AWD", imageUrl: "/images/sold9.jpg" },
  { id: 10, title: "Mercedes-Benz Sprinter 144 AWD", imageUrl: "/images/sold10.jpg" },
];

// Create a single array with the featured van at the start.
const allVans = [FEATURED_VAN, ...SOLD_VANS_GRID];

// Custom CSS for the animated border effect
const AnimatedBorderStyles = () => (
  <style jsx global>{`
    @keyframes rotate {
      from { --angle: 0deg; }
      to { --angle: 360deg; }
    }
    .animated-border-wrap {
      --angle: 0deg;
      background: conic-gradient(
        from var(--angle),
        #000000,
        #333333,
        #999999,
        #000000
      );
      animation: rotate 5s linear infinite;
      transition: animation-duration 0.3s ease-in-out;
    }
    .animated-border-wrap:hover {
        animation-duration: 1.5s;
    }
    .animated-border-wrap > div {
      background-color: white;
    }
  `}</style>
);

export default function SoldVans() {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const featuredCardRef = useRef(null);
  const gridCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation for the main heading and paragraph
      gsap.from(textContentRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'back.out(1.7)',
        stagger: 0.2,
        scrollTrigger: {
          trigger: textContentRef.current,
          start: 'top 85%',
        },
      });

      // Animation for the large featured card (will only run on desktop)
      gsap.from(featuredCardRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationZ: -2,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: featuredCardRef.current,
          start: 'top 85%',
        },
      });

      // Animation for the grid of smaller cards
      gsap.from(gridCardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationZ: 3,
        duration: 1,
        ease: 'back.out(1.4)',
        stagger: {
            amount: 0.5,
            from: 'start',
        },
        scrollTrigger: {
          trigger: gridCardsRef.current[0],
          start: 'top 90%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-0 pb-4 px-4 md:px-8 overflow-hidden">
      <AnimatedBorderStyles />
      <div className="max-w-screen-2xl mx-auto">
        {/* Text Content */}
        <div ref={textContentRef} className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-black leading-tight">
            A Showcase of our Sold Camper Vans
          </h2>
          <p className="max-w-4xl mx-auto mt-4 font-serif text-lg md:text-xl text-black opacity-70 leading-relaxed">
            The camper vans below have already found their happy owners. We’ve proudly built over 105 camper vans, with a consistent five-star rating and a reputation for quality.
            <br />
            These builds show the craftsmanship we invest in every project. Check our past builds to get inspired for your custom van.
          </p>
        </div>

        {/* Featured Card is now hidden on mobile (hidden) and shown on small screens and up (sm:flex) */}
        <div ref={featuredCardRef} className="hidden sm:flex justify-center mb-9">
          <div
            className="relative w-full max-w-[700px] aspect-[16/9] p-1 rounded-[30px] shadow-2xl shadow-gray-700/50 animated-border-wrap transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
           <div className="relative w-full h-full rounded-[29px] overflow-hidden group">
  <img
    src={FEATURED_VAN.imageUrl}
    alt={FEATURED_VAN.title}
    quality={85}
    sizes="(max-width: 768px) 100vw, 700px"
    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-all duration-300 group-hover:from-black/90"></div>
  <div className="absolute inset-0 p-6 flex flex-col justify-end">
    <h3 className="font-serif text-4xl font-bold text-white leading-none transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
      {FEATURED_VAN.title}
    </h3>
  </div>
</div>

          </div>
        </div>

        {/* Grid of Smaller Cards -- MODIFIED HERE */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {allVans.map((van, index) => (
            <div
              key={van.id}
              ref={el => gridCardsRef.current[index] = el}
              className={`relative w-full aspect-[4/3] p-0.5 rounded-[18px] shadow-lg shadow-gray-700/50 animated-border-wrap transition-transform duration-300 ease-in-out transform hover:scale-110 hover:z-10 ${index === 0 ? 'sm:hidden' : ''}`}
            >
            <div className="relative w-full h-full rounded-[17.5px] overflow-hidden group">
  <img
    src={van.imageUrl}
    alt={van.title}
    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:from-black/80"></div>
  <div className="absolute inset-0 p-4 flex flex-col justify-end">
    <h3 className="font-serif text-base sm:text-2xl font-semibold text-white leading-tight transform transition-all duration-300 ease-in-out sm:translate-y-8 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      {van.title}
    </h3>
  </div>
</div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}