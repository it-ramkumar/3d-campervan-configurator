"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AnimatedBorderStyles = () => (
  <style jsx global>{`
    @keyframes rotate {
      from {
        --angle: 0deg;
      }
      to {
        --angle: 360deg;
      }
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

export default function SoldVans({ soldVans = [] }) {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const gridCardsRef = useRef([]);

  useEffect(() => {
    if (!soldVans.length) return;

    const ctx = gsap.context(() => {
      gsap.from(textContentRef.current.children, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: textContentRef.current,
          start: "top 85%",
        },
      });

      gsap.from(gridCardsRef.current, {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotationZ: 3,
        duration: 1,
        ease: "back.out(1.4)",
        stagger: {
          amount: 0.5,
          from: "start",
        },
        scrollTrigger: {
          trigger: gridCardsRef.current[0],
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [soldVans]);

  return (
    <section
      ref={sectionRef}
      className="bg-white pt-0 pb-4 px-4 md:px-8 overflow-hidden"
    >
      <AnimatedBorderStyles />
      <div className="max-w-screen-2xl mx-auto">
        {/* Text Content */}
        <div ref={textContentRef} className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-black leading-tight">
            A Showcase of our Sold Camper Vans
          </h2>
          <p className="max-w-4xl mx-auto mt-4 font-serif text-lg md:text-xl text-black opacity-70 leading-relaxed">
            The camper vans below have already found their happy owners. We’ve
            proudly built over 105 camper vans, with a consistent five-star
            rating and a reputation for quality. <br /> These builds show the
            craftsmanship we invest in every project. Check our past builds to
            get inspired for your custom van.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
          {soldVans?.length > 0 ? (
            soldVans.map((van, index) => (
              <div
                key={van._id || index}
                ref={(el) => (gridCardsRef.current[index] = el)}
                className="relative w-full aspect-[4/3] p-0.5 rounded-[18px] shadow-lg shadow-gray-700/50 animated-border-wrap transition-transform duration-300 ease-in-out transform hover:scale-110 hover:z-10"
              >
<Link to={`/van-detail/${van.slug}`}>
    <div className="relative w-full h-full rounded-[17.5px] overflow-hidden group">
  <img loading="lazy"
    src={van?.gallery?.[0] || "/images/default-placeholder.jpg"}
    alt={van?.van_listing?.model_name || "Sold camper van image"}
    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
  />

  {/* SOLD Stamp */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute transform rotate-[-30deg] bg-red-600/80 text-white font-extrabold text-xl sm:text-3xl px-10 py-2 rounded-md shadow-lg border-2 border-white">
      SOLD
    </div>
  </div>

  {/* Dark overlay & text */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 group-hover:from-black/80"></div>
  <div className="absolute inset-0 p-4 flex flex-col justify-end">
    <h3 className="font-serif text-base sm:text-2xl font-semibold text-white leading-tight transform transition-all duration-300 ease-in-out sm:translate-y-8 sm:opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
      {van?.van_listing?.title || "Unnamed Model"}
    </h3>
  </div>
</div></Link>

              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No sold vans found.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
