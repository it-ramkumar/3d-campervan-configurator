"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Unique SVG Icons for Features (with hover effect classes) ---

const CNCIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const ScannerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1.5a4.5 4.5 0 014.5-4.5h7.5a4.5 4.5 0 014.5 4.5V21zm-3.97-15.58A4.5 4.5 0 0118 10.5v.518a4.5 4.5 0 01-4.47 4.471" />
  </svg>
);

const PaintIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.5M5.436 13.683L5 15h14v-1.5M5.436 13.683A4.001 4.001 0 017 18h1.832c4.1 0 7.625 1.834 9.168 4.5" />
  </svg>
);

const MaterialsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

const BedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5m-4 0v5m0-5h4v5m-4-2h4" />
  </svg>
);

const CabinetIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7zM9 9h6v2H9V9zm0 4h6v2H9v-2z" />
  </svg>
);

const BathroomIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494m-9-5.494h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v11.494M12 6.253A2.25 2.25 0 0114.25 4h.008a2.25 2.25 0 012.242 2.253v11.494A2.25 2.25 0 0114.25 20h-.008a2.25 2.25 0 01-2.242-2.253V6.253zM9.75 4h.008a2.25 2.25 0 012.242 2.253v11.494A2.25 2.25 0 019.75 20h-.008a2.25 2.25 0 01-2.242-2.253V6.253A2.25 2.25 0 019.75 4z" />
  </svg>
);

const LayoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const DesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.998 15.998 0 011.622-3.385m5.043.025a15.998 15.998 0 001.622-3.385m3.388 1.62a15.998 15.998 0 00-1.62-3.385m0 0a3 3 0 00-5.78-1.128 2.25 2.25 0 01-2.4-2.245 4.5 4.5 0 008.4 2.245c0 .399-.078.78-.22 1.128zm0 0a15.998 15.998 0 00-3.388 1.62m5.043.025a15.998 15.998 0 01-1.622 3.385m-5.043-.025a15.998 15.998 0 00-1.622 3.385m-3.388-1.62a15.998 15.998 0 001.62 3.385z" />
    </svg>
);

const BathroomSizeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
    </svg>
);

const CountertopIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white/60 group-hover:text-white transition-colors duration-300 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0115.75 11h.008c1.244 0 2.25 1.006 2.25 2.25V21m-4.5 0H2.25m11.25 0h8.25" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V3a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 3v13.5" />
    </svg>
);

// --- Reusable Showroom Card Component ---
const ShowroomCard = ({ title, description, features, conclusion, imageSrc, isReversed, textWidthClass, desktopImageHeight, sectionIndex, isLastCard }) => {
  const cardRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const mobileImageRef = useRef(null);
  const overlayColor = 'bg-black/75';

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current.querySelectorAll("h2, p, div.feature-item"), {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });

      gsap.from(imageRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: isReversed ? 100 : -100,
        rotationY: isReversed ? 15 : -15,
        duration: 1.2,
        ease: 'power3.out',
      });

      if (mobileImageRef.current) {
        gsap.from(mobileImageRef.current, {
          scrollTrigger: {
            trigger: cardRef.current,
            start: 'top 80%',
            toggleActions: "play none none reverse",
          },
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, cardRef);

    return () => ctx.revert();
  }, [isReversed]);

  const cardAlignment = isReversed ? 'ml-auto' : 'mr-auto';
  const imageHorizontalPosition = 'calc(50% - 39rem)';
  const extremePadding = '12rem';
  const innerPadding = '3rem';

  const textContainerPadding = isReversed
    ? `p-8 md:pt-${innerPadding} md:pb-${innerPadding} md:pl-${innerPadding} md:pr-[${extremePadding}]`
    : `p-8 md:pt-${innerPadding} md:pb-${innerPadding} md:pr-${innerPadding} md:pl-[${extremePadding}]`;

  const contentAlignment = isReversed ? 'md:items-end' : 'md:items-start';
  const headingClasses = `text-[2.25rem] font-bold font-serif mb-4 ${sectionIndex === 2 ? 'md:whitespace-nowrap whitespace-normal' : ''}`;
  const bottomMarginClass = isLastCard ? 'mb-8 md:mb-12' : 'mb-24 md:mb-32';

  return (
    <div ref={cardRef} className={`relative ${bottomMarginClass} w-full mx-auto`} style={{ maxWidth: '82.5rem' }}>
      <div className={`relative w-full md:w-11/12 ${cardAlignment} ${overlayColor} rounded-xl md:rounded-none`}>
        <div className={`block md:hidden w-full p-4`}>
          <div className="w-full overflow-hidden" style={{ height: '20rem', borderRadius: '0.75rem' }}>
            <img
              ref={mobileImageRef}
              src={imageSrc}
              alt={title}
              className="object-cover w-full h-full transform hover:scale-105 hover:-translate-y-1 transition duration-500 ease-out"
            />
          </div>
        </div>

        <div
          ref={textRef}
          className={`flex flex-col items-center z-20 ${textContainerPadding} ${contentAlignment}`}
          style={{ minHeight: '20rem' }}
        >
          <div className={`text-white w-full ${textWidthClass} text-center md:text-left`}>
            <div>
              <h2 className={headingClasses} style={{ lineHeight: '100%', letterSpacing: '0%' }}>
                {title}
              </h2>
              <p className="text-[1.25rem] font-normal text-white/90 mb-6">
                {description}
              </p>
              <div className="space-y-4 mb-6">
                {features.map((feature, index) => (
                  // --- MODIFIED LINE --- Added 'group', 'hover:bg-white/10', and 'transition-colors' for the hover effect
                  <div key={index} className="feature-item flex items-start gap-x-4 p-3 bg-white/5 rounded-lg border border-white/10 group hover:bg-white/10 transition-colors duration-300">
                    {feature.icon}
                    <p className="text-[1.15rem] font-normal text-white/90 leading-snug">
                      {feature.text}
                    </p>
                  </div>
                ))}
              </div>
              {conclusion && (
                <p className="text-[1.25rem] font-normal text-white/90">
                  {conclusion}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 z-10`}
        style={{
          width: '37.5rem',
          height: desktopImageHeight,
          [isReversed ? 'left' : 'right']: imageHorizontalPosition,
          [isReversed ? 'right' : 'left']: 'auto',
        }}
      >
        <div
          ref={imageRef}
          className="bg-white p-2 w-full h-full overflow-hidden rounded-3xl shadow-2xl transition duration-300 ease-out hover:shadow-3xl hover:-translate-y-1"
          style={{ borderRadius: '1.875rem', border: '2px solid #464444ff' }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="object-cover w-full h-full transform transition duration-500 ease-out hover:scale-105 hover:-translate-y-1"
            style={{ borderRadius: '1.75rem' }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main Showroom Component ---
export default function Showroom() {
  const mainTitleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(mainTitleRef.current.children,
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: mainTitleRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        }
      }
    );
  }, []);

  const cardData = [
    {
      title: "Watch the Build Process Live",
      description: "See exactly how your van will come to life. You’ll see:",
      features: [
        { text: "Our automated CNC machines are cutting custom cabinetry.", icon: <CNCIcon /> },
        { text: "We have several 3D scanners to ensure precise cuts.", icon: <ScannerIcon /> },
        { text: "Our team is painting and assembling with expert craftsmanship.", icon: <PaintIcon /> },
        { text: "The high-quality materials that go into every van.", icon: <MaterialsIcon /> },
      ],
      conclusion: null,
      imageSrc: "/images/s1.png",
      isReversed: false,
      textWidthClass: "md:w-[50%]",
      desktopImageHeight: '27rem',
    },
    {
      title: "Explore Our Van Collection",
      description: "You’ll also visit our finished custom builds, vans for sale, and ongoing projects. This is your chance to:",
      features: [
        { text: "Try out the elevator bed and dinette system.", icon: <BedIcon /> },
        { text: "Open every drawer and cabinet.", icon: <CabinetIcon /> },
        { text: "Step inside the bathroom and test the kitchen.", icon: <BathroomIcon /> },
        { text: "Compare different layouts to see what works well for you.", icon: <LayoutIcon /> },
      ],
      conclusion: "This hands-on experience gives a clear picture of what features matter most for your van’s interior and exterior.",
      imageSrc: "/images/s2.png",
      isReversed: true,
      textWidthClass: "md:w-[55%]",
      desktopImageHeight: '32rem',
    },
    {
      title: "Have a Personal Design Session",
      description: "After your tour, sit down with our designers to discuss your questions. In our office, we’ll spread out samples of countertops, flooring, and fabrics. Over a complimentary coffee or tea, you can mix-and-match materials to create your perfect look. This will help you answer key questions, like:",
      features: [
        { text: "What interior design style will work best for me?", icon: <DesignIcon /> },
        { text: "How big should the bathroom be?", icon: <BathroomSizeIcon /> },
        { text: "Which countertop and cabinet style feels right?", icon: <CountertopIcon /> },
      ],
      conclusion: null,
      imageSrc: "/images/s3.png",
      isReversed: false,
      textWidthClass: "md:w-[55%]",
      desktopImageHeight: '32rem',
    },
  ];

  return (
    <section className="bg-white py-[4rem] font-serif overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={mainTitleRef} className="text-center mb-[5rem] lg:mb-[7rem]">
          <p className="font-serif font-normal text-[1.5rem] text-black/90 max-w-[57.8125rem] mx-auto mb-16">
            Browsing websites is a good start, but the real thing is seeing the materials and testing the layouts firsthand to make clear decisions. That’s why we invite you to visit our workshop to see and select things personally.
          </p>
          <h2 className="text-[3rem] font-bold font-serif text-black leading-none mb-4" style={{ lineHeight: '100%', letterSpacing: '0%' }}>
            Why visit us?
          </h2>
          <p className="text-[1.5rem] font-normal text-black/90 max-w-[57.8125rem] mx-auto">
            When you step into our workshop, you become part of the build process. Here’s why a visit to our showroom is valuable for you:
          </p>
        </div>

        {cardData.map((card, index) => (
          <ShowroomCard
            key={index}
            {...card}
            sectionIndex={index}
            isLastCard={index === cardData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}