"use client";
import { useEffect, useRef } from 'react';
import { Link } from "react-router-dom"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- SVG Icons for the feature list ---
const PowerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);
const BathroomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h18M3 7.5h18M4.5 12H6m13.5 0h-1.5M4.5 16.5h15" />
  </svg>
);
const KitchenIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);
const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
  </svg>
);

// --- NEW: Central Icon updated to a Campervan ---
const VanIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md:h-14 md:w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.375 16.5a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zM17.625 16.5a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 17.25h17.25c.621 0 1.125-.504 1.125-1.125V9.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v6.375c0 .621.504 1.125 1.125 1.125zM9 8.625V6.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125v2.25" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 12h17.25" />
    </svg>
);

// Data for the van cards
const VAN_CARDS = [
  {
    id: 2,
    model: "Santa Monica V6 Turbo",
    image: "/images/brown.jpg",
    link: "/santa-monica",
    price: "$224,543",
    description: "The Santa Monica V6 Turbo is the ultimate adventure vehicle. With its powerful V6 Turbo engine.",
  },
];

// Data for the features list
const FEATURES = [
    { text: "Exceptional off-grid power", icon: <PowerIcon />, textFirst: true },
    { text: "Fully-equipped bathroom with hot water", icon: <BathroomIcon />, textFirst: true },
    { text: "Kitchen with microwave & refrigerator", icon: <KitchenIcon />, textFirst: false },
    { text: "Space-saving elevator & dinette bed", icon: <BedIcon />, textFirst: false },
];

export default function AvailableVans({availableVans}) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef([]);
  const featuresSectionRef = useRef(null);
  const featureItemsRef = useRef([]);
  const centralIconRef = useRef(null);
  const circularPathRef = useRef(null);

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

      // Animation for the circular features section
      const featuresTl = gsap.timeline({
          scrollTrigger: {
              trigger: featuresSectionRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
          }
      });

      featuresTl.from(centralIconRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)'
      }).from(circularPathRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: 'power2.out'
      }, "-=0.3").from(featureItemsRef.current, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.5,
          ease: 'power2.out'
      }, "-=0.2");

      // Add continuous rotation animation for the circular path
      gsap.to(circularPathRef.current, {
        rotation: 360,
        duration: 40,
        repeat: -1,
        ease: "none"
      });

      // Animate the van cards
      cardsRef.current.forEach((card) => {
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

        // Hover Animations
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

  // Enhanced hover handlers for feature items
  const handleFeatureMouseEnter = (index) => {
    const tl = gsap.timeline();

    // Scale up the feature item
    tl.to(featureItemsRef.current[index], {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    // Add a subtle lift effect
    .to(featureItemsRef.current[index].querySelector('.feature-icon'), {
      y: -3,
      duration: 0.3,
      ease: "power2.out"
    }, 0)
    // Change background color on hover
    .to(featureItemsRef.current[index].querySelector('.feature-icon'), {
      backgroundColor: "#1f2937",
      borderColor: "#9ca3af",
      duration: 0.3
    }, 0)
    // Scale up the text slightly
    .to(featureItemsRef.current[index].querySelector('.feature-text'), {
      scale: 1.05,
      color: "#1f2937",
      duration: 0.3
    }, 0);

    // Pulse the central icon
    gsap.to(centralIconRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Enhance the connecting line
    gsap.to(`.connection-line-${index}`, {
      stroke: "#9ca3af",
      strokeWidth: 2,
      strokeDasharray: "0,0",
      duration: 0.3
    });

    // Pulse the circular path
    gsap.to(circularPathRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleFeatureMouseLeave = (index) => {
    const tl = gsap.timeline();

    // Reset feature item
    tl.to(featureItemsRef.current[index], {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(featureItemsRef.current[index].querySelector('.feature-icon'), {
      y: 0,
      backgroundColor: "#1f2937",
      borderColor: "#374151",
      duration: 0.3
    }, 0)
    .to(featureItemsRef.current[index].querySelector('.feature-text'), {
      scale: 1,
      color: "#374151",
      duration: 0.3
    }, 0);

    // Reset central icon
    gsap.to(centralIconRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    // Reset connecting line
    gsap.to(`.connection-line-${index}`, {
      stroke: "#4b5563",
      strokeWidth: 1,
      strokeDasharray: "2,2",
      duration: 0.3
    });

    // Reset circular path
    gsap.to(circularPathRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  // Hover effect for the central circle
  const handleCentralCircleHover = () => {
    const tl = gsap.timeline();

    tl.to(centralIconRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    .to(circularPathRef.current, {
      scale: 1.1,
      stroke: "#9ca3af",
      duration: 0.3
    }, 0)
    .to('.connection-line', {
      stroke: "#6b7280",
      strokeWidth: 1.5,
      duration: 0.3
    }, 0);
  };

  const handleCentralCircleLeave = () => {
    const tl = gsap.timeline();

    tl.to(centralIconRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(circularPathRef.current, {
      scale: 1,
      stroke: "url(#pathGradient)",
      duration: 0.3
    }, 0)
    .to('.connection-line', {
      stroke: "#4b5563",
      strokeWidth: 1,
      duration: 0.3
    }, 0);
  };

  return (
    <>
      <style>{`
        .font-noto-serif { font-family: 'Noto Serif', serif; }
        .font-noto-sans { font-family: 'Noto Sans', sans-serif; }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .floating {
          animation: float 6s ease-in-out infinite;
        }

        .gradient-glow {
          background: radial-gradient(circle at center, rgba(75, 85, 99, 0.1) 0%, transparent 70%);
        }
      `}</style>

      <section ref={sectionRef} className="bg-white pt-0 pb-0 overflow-hidden mt-20">
        <div ref={headerRef} className="max-w-7xl mx-auto text-center mb-12 md:mb-20 px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl lg:text-[3rem] font-bold font-noto-serif text-black leading-tight">
            In-Stock & Ready to Roll Vans For Sale
          </h2>
        </div>

        <div ref={contentRef} className="max-w-4xl mx-auto text-black mb-16 md:mb-20 px-4 md:px-8 lg:px-16 space-y-8">
          <p className="text-base md:text-xl font-normal font-noto-serif text-slate-700">
            At Big Bear Vans, our Class BRVs for sale are truly turn-key solutions. Each van has premium features, including:
          </p>

          {/* Increased bottom padding for the features section */}
          <div ref={featuresSectionRef} className="relative flex justify-center items-center my-8 md:my-12 h-60 md:h-72">
            {/* Animated background glow */}
            <div className="gradient-glow absolute w-56 h-56 md:w-64 md:h-64 rounded-full"></div>

            {/* The animated circular path - reduced size */}
            <svg
              ref={circularPathRef}
              className="circular-path absolute w-56 h-56 md:w-64 md:h-64 cursor-pointer"
              viewBox="0 0 100 100"
              onMouseEnter={handleCentralCircleHover}
              onMouseLeave={handleCentralCircleLeave}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6b7280" />
                  <stop offset="50%" stopColor="#4b5563" />
                  <stop offset="100%" stopColor="#374151" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#pathGradient)"
                strokeWidth="0.8"
                strokeDasharray="3,3"
                opacity="0.8"
              />
            </svg>

            {/* Connection lines */}
            <svg className="absolute w-56 h-56 md:w-64 md:h-64" viewBox="0 0 100 100">
              {/* Top-left connection */}
              <line
                x1="50" y1="50" x2="25" y2="25"
                stroke="#4b5563"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="connection-line connection-line-0"
              />
              {/* Top-right connection */}
              <line
                x1="50" y1="50" x2="75" y2="25"
                stroke="#4b5563"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="connection-line connection-line-1"
              />
              {/* Bottom-left connection */}
              <line
                x1="50" y1="50" x2="25" y2="75"
                stroke="#4b5563"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="connection-line connection-line-2"
              />
              {/* Bottom-right connection */}
              <line
                x1="50" y1="50" x2="75" y2="75"
                stroke="#4b5563"
                strokeWidth="1"
                strokeDasharray="2,2"
                className="connection-line connection-line-3"
              />
            </svg>

            {/* The central icon with reduced size */}
            <div
              ref={centralIconRef}
              className="central-icon floating absolute flex justify-center items-center w-20 h-20 md:w-24 md:h-24 bg-gray-800 rounded-full shadow-lg border border-gray-700 cursor-pointer"
              onMouseEnter={handleCentralCircleHover}
              onMouseLeave={handleCentralCircleLeave}
            >
              <VanIcon />
            </div>

            {/* Feature 1: Top-Left - TEXT ABOVE, ICON BELOW */}
            <div
              ref={el => featureItemsRef.current[0] = el}
              className="feature-item absolute -translate-x-28 -translate-y-20 md:-translate-x-32 md:-translate-y-24 flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group"
              onMouseEnter={() => handleFeatureMouseEnter(0)}
              onMouseLeave={() => handleFeatureMouseLeave(0)}
            >
              <p className="feature-text font-noto-serif text-sm text-slate-700 leading-tight transition-all duration-300 mb-2">
                {FEATURES[0].text}
              </p>
              <div className="feature-icon bg-gray-800 rounded-full p-2 shadow-lg border border-gray-700 transition-all duration-300">
                {FEATURES[0].icon}
              </div>
            </div>

            {/* Feature 2: Top-Right - TEXT ABOVE, ICON BELOW */}
            <div
              ref={el => featureItemsRef.current[1] = el}
              className="feature-item absolute translate-x-28 -translate-y-20 md:translate-x-32 md:-translate-y-24 flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group"
              onMouseEnter={() => handleFeatureMouseEnter(1)}
              onMouseLeave={() => handleFeatureMouseLeave(1)}
            >
              <p className="feature-text font-noto-serif text-sm text-slate-700 leading-tight transition-all duration-300 mb-2">
                {FEATURES[1].text}
              </p>
              <div className="feature-icon bg-gray-800 rounded-full p-2 shadow-lg border border-gray-700 transition-all duration-300">
                {FEATURES[1].icon}
              </div>
            </div>

            {/* Feature 3: Bottom-Left - ICON ABOVE, TEXT BELOW (original layout) */}
            <div
              ref={el => featureItemsRef.current[2] = el}
              className="feature-item absolute -translate-x-28 translate-y-20 md:-translate-x-32 md:translate-y-24 flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group"
              onMouseEnter={() => handleFeatureMouseEnter(2)}
              onMouseLeave={() => handleFeatureMouseLeave(2)}
            >
              <div className="feature-icon bg-gray-800 rounded-full p-2 mb-2 shadow-lg border border-gray-700 transition-all duration-300">
                {FEATURES[2].icon}
              </div>
              <p className="feature-text font-noto-serif text-sm text-slate-700 leading-tight transition-all duration-300">
                {FEATURES[2].text}
              </p>
            </div>

            {/* Feature 4: Bottom-Right - ICON ABOVE, TEXT BELOW (original layout) */}
            <div
              ref={el => featureItemsRef.current[3] = el}
              className="feature-item absolute translate-x-28 translate-y-20 md:translate-x-32 md:translate-y-24 flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group"
              onMouseEnter={() => handleFeatureMouseEnter(3)}
              onMouseLeave={() => handleFeatureMouseLeave(3)}
            >
              <div className="feature-icon bg-gray-800 rounded-full p-2 mb-2 shadow-lg border border-gray-700 transition-all duration-300">
                {FEATURES[3].icon}
              </div>
              <p className="feature-text font-noto-serif text-sm text-slate-700 leading-tight transition-all duration-300">
                {FEATURES[3].text}
              </p>
            </div>
          </div>

          <p className="text-base md:text-xl font-normal font-noto-serif text-slate-700">
            Everything is set up for you. Skip the stress of a long DIY build or waiting months for a custom conversion and check out our vans for sale.
          </p>
        </div>

        <div className="relative pt-8 pb-12 md:pt-12 md:pb-16">
          <div className="hidden lg:block absolute inset-x-0 top-0 h-72 bg-slate-900 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto flex justify-center px-4 md:px-8 lg:px-16">
            {availableVans.map((van, index) => (
              <div
                key={van.id}
                ref={el => cardsRef.current[index] = el}
                className="relative group transform-gpu w-full max-w-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="lg:hidden absolute top-[-24px] h-40 bg-slate-900 z-[-1] w-screen left-1/2 -translate-x-1/2"></div>
                <div className="card-glow absolute -inset-2.5 bg-slate-900 rounded-[30px] blur-2xl opacity-0 z-[-1] transition-opacity duration-300"></div>
                <div className="relative w-full h-[400px] rounded-[30px] overflow-hidden shadow-xl">
                  <img
                    src={van.gallery[0]}
                    alt={van.model}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
                  <div className="absolute top-0 left-0 bg-black text-white p-2.5 rounded-tl-[30px] z-20">
                    <p className="font-noto-serif font-semibold text-[28px] leading-none tracking-tight px-2 py-1">
                      {van.van_listing.price}
                    </p>
                  </div>
                  <Link
                    to={`/detail-page/${van.slug}`}
                    className="details-button absolute top-4 right-4 bg-slate-900 text-white font-bold font-noto-sans text-[0.875rem] py-2 px-5 rounded-md transition-all duration-300 hover:bg-slate-700 z-20"
                  >
                    More Details
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                    <h3 className="font-noto-serif font-semibold text-white text-[28px] leading-tight mb-3">
                      {van.van_listing.model_name}
                    </h3>
                    <p className="font-noto-serif text-white/80 text-sm leading-normal">
                      {van.van_listing.description}
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