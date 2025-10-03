"use client";
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Data for the van cards
const VAN_CARDS = [
  // {
  //   id: 1,
  //   model: "Montreal 170 AWD Blue Gray",
  //   image: "/images/Montrial.jpg",
  //   link: "#",
  //   price: "$196,000",
  //   description: "Our Montreal 170 AWD blue-gray is a thoroughly insulated and winter-ready campervan, which is designed for 4-5 people.",
  // },
  {
    id: 2,
    model: "Santa Monica V6 Turbo",
    image: "/images/brown.jpg",
    link: "#",
    price: "$224,543",
    description: "The Santa Monica V6 Turbo is the ultimate adventure vehicle. With its powerful V6 Turbo engine.",
  },
];

export default function AvailableVans() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the header
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the content/description section
      gsap.from(contentRef.current.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate the van cards
      cardsRef.current.forEach((card) => {
        // Scroll-triggered reveal animation
        gsap.from(card, {
          y: 60,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse",
          }
        });

        // --- All Hover Animations (for desktop) ---
        const image = card.querySelector('img');
        const button = card.querySelector('.details-button');
        const heading = card.querySelector('h3');
        const glow = card.querySelector('.card-glow');

        const tl = gsap.timeline({ paused: true });

        tl.to(card, {
          scale: 1.03,
          boxShadow: "0px 30px 60px rgba(0,0,0,0.3)",
          duration: 0.4,
          ease: "power2.out",
        }).to(image, {
          scale: 1.08,
          duration: 0.4,
        }, 0).to([button, heading], {
          scale: 1.02,
          duration: 0.4,
        }, 0)
          .to(glow, {
            opacity: 0.4,
            duration: 0.4
          }, 0);

        card.addEventListener("mouseenter", () => tl.play());
        card.addEventListener("mouseleave", () => tl.reverse());
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style jsx>{`
        .font-noto-serif { font-family: 'Noto Serif', serif; }
        .font-noto-sans { font-family: 'Noto Sans', sans-serif; }
      `}</style>

      <section ref={sectionRef} className="bg-white pt-0 pb-0 overflow-hidden mt-20">
        <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-10 md:mb-16 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-bold font-noto-serif text-black leading-tight">
            In-Stock & Ready to Roll Vans For Sale
          </h2>
        </div>

        <div ref={contentRef} className="max-w-6xl mx-auto text-black opacity-70 mb-10 md:mb-16 px-4 md:px-8 lg:px-16">
          <p className="text-base md:text-xl font-normal font-noto-serif mb-6">
            At Big Bear Vans, our Class BRVs for sale are truly turn-key solutions. Each van has premium features, including:
          </p>
          <ul className="list-none space-y-2 mb-6 ml-4 text-base md:text-xl font-normal font-noto-serif">
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-black">Exceptional off-grid power</li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-black">Fully-equipped bathroom with hot water</li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-black">Kitchen with a microwave and a refrigerator</li>
            <li className="relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-black">Space-saving elevator & dinette bed system</li>
          </ul>
          <p className="text-base md:text-xl font-normal font-noto-serif">
            Everything is set up for you. Skip the stress of a long DIY build or waiting months for a custom conversion and check out our vans for sale.
          </p>
        </div>

        {/* Container with reduced mobile padding */}
        <div className="relative pt-6 pb-6 md:pt-10 md:pb-10">

          {/* The original blue patch. HIDDEN on mobile and ONLY visible on large screens (desktop) */}
          <div className="hidden lg:block absolute inset-x-0 top-0 h-72 bg-[#2761FD] z-0"></div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-y-12 gap-x-8 lg:gap-x-16 px-4 md:px-8 lg:px-16">

            {VAN_CARDS.map((van, index) => (
              <div
                key={van.id}
                ref={el => cardsRef.current[index] = el}
                className="relative group transform-gpu"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* MODIFICATION: This patch is now full-width on mobile.
                  - `w-screen` makes it as wide as the screen.
                  - `relative left-1/2 -translate-x-1/2` perfectly centers it.
                  - `lg:hidden` ensures it only appears on mobile.
                */}
                <div className="lg:hidden absolute top-[-24px] h-40 bg-[#2761FD] z-[-1] w-screen left-1/2 -translate-x-1/2"></div>

                <div className="card-glow absolute -inset-2.5 bg-[#2761FD] rounded-[30px] blur-2xl opacity-0 z-[-1] transition-opacity duration-300"></div>
                <div className="relative w-full h-[400px] rounded-[30px] overflow-hidden shadow-xl">
                  <img
                    src={van.image}
                    alt={van.model}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  <div className="absolute top-0 left-0 bg-black text-white p-2.5 rounded-tl-[30px] z-20">
                    <p className="font-noto-serif font-semibold text-[28px] leading-none tracking-tight px-2 py-1">
                      {van.price}
                    </p>
                  </div>
                  <Link
                    to={van.link}
                    className="details-button absolute top-4 right-4 bg-[#2761FD] text-white font-bold font-noto-sans text-[0.875rem] py-2 px-5 rounded-[3.75px] transition-all duration-300 hover:bg-[#1f50c0] z-20"
                  >
                    More Details
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <h3 className="font-noto-serif font-semibold text-white text-[28px] leading-tight mb-3">
                      {van.model}
                    </h3>
                    <p className="font-noto-serif text-white/80 text-sm leading-normal">
                      {van.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}