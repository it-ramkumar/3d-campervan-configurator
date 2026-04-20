"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithSkeleton, RichParagraph } from "../Common/Common";
import { Heading2, Heading3, Heading4 } from "../Common/Common";
// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Contextual Icon Components (Reduced size of base SVG/div)
const SeatIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <path
        d="M12 8C12 5.79086 13.7909 4 16 4C18.2091 4 20 5.79086 20 8V12H12V8Z"
        stroke="url(#seatGradient)"
        strokeWidth="1.5"
        fill="url(#seatFill)"
      />
      <rect
        x="8"
        y="12"
        width="16"
        height="4"
        rx="1"
        fill="url(#seatGradient)"
      />
      <path
        d="M8 16H24V22C24 23.1046 23.1046 24 22 24H10C8.89543 24 8 23.1046 8 22V16Z"
        stroke="url(#seatGradient)"
        strokeWidth="1.5"
        fill="url(#seatFill)"
      />
      <defs>
        <linearGradient id="seatGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="seatFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const PeopleIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <circle
        cx="11"
        cy="10"
        r="3"
        stroke="url(#peopleGradient)"
        strokeWidth="1.5"
        fill="url(#peopleFill)"
      />
      <circle
        cx="21"
        cy="10"
        r="3"
        stroke="url(#peopleGradient)"
        strokeWidth="1.5"
        fill="url(#peopleFill)"
      />
      <path
        d="M5 26C5 22.134 8.13401 19 12 19C15.866 19 19 22.134 19 26"
        stroke="url(#peopleGradient)"
        strokeWidth="1.5"
      />
      <path
        d="M19 19C22.866 19 26 22.134 26 26"
        stroke="url(#peopleGradient)"
        strokeWidth="1.5"
      />
      <path
        d="M15 19C17.2091 19 19 17.2091 19 15C19 12.7909 17.2091 11 15 11"
        stroke="url(#peopleGradient)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="peopleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="peopleFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#bfdbfe" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const CargoIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <rect
        x="6"
        y="10"
        width="20"
        height="12"
        rx="1"
        stroke="url(#cargoGradient)"
        strokeWidth="1.5"
        fill="url(#cargoFill)"
      />
      <path
        d="M6 10L11 6H21L26 10"
        stroke="url(#cargoGradient)"
        strokeWidth="1.5"
      />
      <rect
        x="10"
        y="13"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#cargoGradient)"
      />
      <rect
        x="15"
        y="13"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#cargoGradient)"
      />
      <rect
        x="20"
        y="13"
        width="3"
        height="3"
        rx="0.5"
        fill="url(#cargoGradient)"
      />
      <defs>
        <linearGradient id="cargoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="cargoFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3e8ff" />
          <stop offset="100%" stopColor="#e9d5ff" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const ComfortIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <path
        d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16C26 10.4772 21.5228 6 16 6Z"
        stroke="url(#comfortGradient)"
        strokeWidth="1.5"
        fill="url(#comfortFill)"
      />
      <path
        d="M16 12V20"
        stroke="url(#comfortGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16H20"
        stroke="url(#comfortGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="comfortGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="comfortFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d1fae5" />
          <stop offset="100%" stopColor="#a7f3d0" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const MaterialIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="2"
        stroke="url(#materialGradient)"
        strokeWidth="1.5"
        fill="url(#materialFill)"
      />
      <path
        d="M12 12H20"
        stroke="url(#materialGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 16H20"
        stroke="url(#materialGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 20H16"
        stroke="url(#materialGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="materialGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="materialFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffedd5" />
          <stop offset="100%" stopColor="#fed7aa" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const SwivelIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <circle
        cx="16"
        cy="16"
        r="6"
        stroke="url(#swivelGradient)"
        strokeWidth="1.5"
        fill="url(#swivelFill)"
      />
      <path
        d="M16 10V6M16 26V22M10 16H6M26 16H22"
        stroke="url(#swivelGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="1.5" fill="url(#swivelGradient)" />
      <defs>
        <linearGradient id="swivelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#db2777" />
        </linearGradient>
        <linearGradient id="swivelFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fce7f3" />
          <stop offset="100%" stopColor="#fbcfe8" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const CustomizationIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <path
        d="M16 6L20 12L27 13L22 18L23 25L16 22L9 25L10 18L5 13L12 12L16 6Z"
        stroke="url(#customGradient)"
        strokeWidth="1.5"
        fill="url(#customFill)"
      />
      <defs>
        <linearGradient id="customGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="customFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="100%" stopColor="#fde68a" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const RoofIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <path
        d="M6 20L16 10L26 20"
        stroke="url(#roofGradient)"
        strokeWidth="1.5"
        fill="url(#roofFill)"
      />
      <rect
        x="8"
        y="20"
        width="16"
        height="6"
        rx="1"
        stroke="url(#roofGradient)"
        strokeWidth="1.5"
        fill="url(#roofFill)"
      />
      <line
        x1="12"
        y1="20"
        x2="12"
        y2="26"
        stroke="url(#roofGradient)"
        strokeWidth="1.5"
      />
      <line
        x1="20"
        y1="20"
        x2="20"
        y2="26"
        stroke="url(#roofGradient)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#4b5563" />
        </linearGradient>
        <linearGradient id="roofFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f3f4f6" />
          <stop offset="100%" stopColor="#e5e7eb" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const HingeIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <rect
        x="8"
        y="8"
        width="16"
        height="16"
        rx="1"
        stroke="url(#hingeGradient)"
        strokeWidth="1.5"
        fill="url(#hingeFill)"
      />
      <circle cx="12" cy="12" r="1" fill="url(#hingeGradient)" />
      <circle cx="20" cy="12" r="1" fill="url(#hingeGradient)" />
      <circle cx="12" cy="20" r="1" fill="url(#hingeGradient)" />
      <circle cx="20" cy="20" r="1" fill="url(#hingeGradient)" />
      <path
        d="M12 8V6M20 8V6M12 26V24M20 26V24"
        stroke="url(#hingeGradient)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="hingeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="hingeFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ccfbf1" />
          <stop offset="100%" stopColor="#99f6e4" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const SafetyIcon = () => (
  <div className="relative">
    <svg
      className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
      viewBox="0 0 32 32"
      fill="none"
    >
      {" "}
      {/* Reduced icon size */}
      <path
        d="M16 4L28 9V16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16V9L16 4Z"
        stroke="url(#safetyGradient)"
        strokeWidth="1.5"
        fill="url(#safetyFill)"
      />
      <path
        d="M12 16L15 19L20 14"
        stroke="url(#safetyGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="safetyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <linearGradient id="safetyFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fecaca" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);

// Icon mapping based on content keywords (No change needed)
const getIconForContent = (content) => {
  const lowerContent = content.toLowerCase();

  if (lowerContent.includes("seat") || lowerContent.includes("sitting"))
    return <SeatIcon />;
  if (
    lowerContent.includes("people") ||
    lowerContent.includes("person") ||
    lowerContent.includes("capacity")
  )
    return <PeopleIcon />;
  if (
    lowerContent.includes("cargo") ||
    lowerContent.includes("space") ||
    lowerContent.includes("storage")
  )
    return <CargoIcon />;
  if (
    lowerContent.includes("comfort") ||
    lowerContent.includes("ergonomic") ||
    lowerContent.includes("support")
  )
    return <ComfortIcon />;
  if (
    lowerContent.includes("material") ||
    lowerContent.includes("leather") ||
    lowerContent.includes("fabric")
  )
    return <MaterialIcon />;
  if (
    lowerContent.includes("swivel") ||
    lowerContent.includes("rotate") ||
    lowerContent.includes("base")
  )
    return <SwivelIcon />;
  if (
    lowerContent.includes("custom") ||
    lowerContent.includes("option") ||
    lowerContent.includes("style")
  )
    return <CustomizationIcon />;
  if (
    lowerContent.includes("roof") ||
    lowerContent.includes("rail") ||
    lowerContent.includes("rack")
  )
    return <RoofIcon />;
  if (
    lowerContent.includes("hinge") ||
    lowerContent.includes("door") ||
    lowerContent.includes("install")
  )
    return <HingeIcon />;
  if (
    lowerContent.includes("safety") ||
    lowerContent.includes("durable") ||
    lowerContent.includes("secure")
  )
    return <SafetyIcon />;

  return <ComfortIcon />; // Default icon
};

// Enhanced Info Card Component - SIGNIFICANTLY REDUCED SIZE
const InfoCard = ({ image, title, items, largeText = false }) => {
  const cardRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      gsap.from(itemsRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 80%",
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, []);

  const addToItemsRef = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative bg-gradient-to-br from-primary to-primary rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-gray-700"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
      <div className="absolute inset-0 bg-emerald-400/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-1.5">
        {" "}
        {/* Further reduced padding */}
        <div className="relative overflow-hidden rounded-lg">
          <ImageWithSkeleton
            src={image}
            alt={title}
            className="w-full h-32 sm:h-40 object-cover transition-transform duration-700 group-hover:scale-105" // Reduced image height (h-32 / sm:h-40)
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-emerald-900/10 transition-all duration-500" />
        </div>
      </div>

      <div className="p-3 pt-1 sm:p-4 sm:pt-2 relative z-20">
        {" "}
        {/* Further reduced padding */}
        {/* This is for after market seats headings */}
        <Heading3 text={title} className="text-secondary! text-center"/>
        {/* <h3 className="text-base font-bold text-center mb-2 sm:mb-3 text-white group-hover:text-emerald-50 transition-colors duration-300">
          {" "}
          {/* Set title to base font size, removed desktop scaling */}
          {/* {title}
        </h3> */} */
        <ul className="space-y-1 sm:space-y-2">
          {" "}
          {/* Reduced space between items */}
          {items.map((item, index) => (
            <li
              key={index}
              ref={addToItemsRef}
              className="flex items-start gap-1.5 text-gray-200 group-hover:text-gray-100 transition-colors duration-300 group/item hover:bg-white/5 rounded-md p-1 -mx-1 transition-all duration-300" // Reduced gap and padding/margin
            >
              <div className="mt-0.5 group-hover/item:scale-110 transition-transform duration-300">
                {getIconForContent(item)}
              </div>
              <RichParagraph className="text-secondary! pt-0.5">{item}</RichParagraph>
              {/* <span
                className="text-xs leading-relaxed flex-1 group-hover/item:translate-x-1.5 transition-transform duration-300" // Forced all list text to text-xs
                dangerouslySetInnerHTML={{ __html: item }}
              /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Feature Item with contextual icons (No size change in this component's text)
const FeatureItem = ({ text, index }) => {
  const itemRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(itemRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: itemRef.current,
          start: "top 85%",
        },
      });
    }, itemRef);

    return () => ctx.revert();
  }, [index]);

  const handleMouseEnter = () => {
    gsap.to(iconRef.current, {
      scale: 1.2,
      rotation: "+=180",
      duration: 0.6,
      ease: "back.out(1.7)",
    });
    gsap.to(itemRef.current, {
      x: 10,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconRef.current, {
      scale: 1,
      rotation: "-=180",
      duration: 0.6,
      ease: "back.out(1.7)",
    });
    gsap.to(itemRef.current, {
      x: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={itemRef}
      className="flex items-start gap-3 text-gray-200 group-hover:text-gray-100 transition-colors duration-300 cursor-pointer group/item p-2 rounded-lg hover:bg-white/5 transition-all duration-300" // Reduced gap and padding
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={iconRef} className="mt-0.5 transition-transform duration-300">
        {getIconForContent(text)}
      </div>
      {/* This is for both paras of roof track */}
      <RichParagraph className="text-secondary!">{text}</RichParagraph> 
      {/* <p className="text-sm md:text-base leading-relaxed flex-1 transition-all duration-300">
       
      </p> */} 
    </div>
  );
};

// Main Page Component - Final Reduced Size
export default function SeatOption() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".pill-item", {
        opacity: 0,
        y: 30,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".feature-section", {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".feature-section",
          start: "top 75%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className="bg-white text-gray-900 font-serif min-h-screen overflow-hidden"
    >
      {/* REDUCED VERTICAL PADDING */}
      <div className="container mx-auto px-4 py-10 md:py-16">
        {/* ==================================== */}
        {/* SEAT OPTIONS SECTION (Further Reduced) */}
        {/* ==================================== */}
        <section className="mb-12 md:mb-16">
          {/* REDUCED TITLE FONT SIZE */}
          <Heading2 text={"Seat Options"} className="text-center"/>
          {/* <h1 className="section-title text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#1a1f2e] mb-5 md:mb-6">
            Seat Options
          </h1> */}

          {/* REDUCED MARGIN AND PILL SIZE */}
          <div className="text-center mb-6 md:mb-10">
            <Heading3 text={"Stock Seats"}/>
            {/* <h3 className="text-lg md:text-3xl text-gray-600 font-medium">
              Stock Seats
            </h3> */}

            <div className="w-10 h-1 bg-hover mx-auto mt-2 rounded-full"></div>
          </div>

          {/* REDUCED GAP AND MARGIN */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12 md:mb-16">
            <InfoCard
              image="/sprinter/Mask group-1.webp"
              title="Cargo Van"
              items={[
                "Typically seats 2–3 people",
                "Driver and front passenger seats",
                "Optional rear seat depending on model",
              ]}
            />
            <InfoCard
              image="/sprinter/Mask group-2.webp"
              title="Crew Van"
              items={[
                "Hybrid of cargo and passenger van",
                "Seating for up to 5 people",
                "Front and second-row seating",
                "Remaining space optimized for cargo",
              ]}
            />
            <InfoCard
              image="/sprinter/Mask group.webp"
              title="Passenger Van"
              items={[
                "Designed primarily for transporting people",
                "Seating capacity for groups",
                "12 seats with standard wheelbase",
                "Up to 15 seats with extended wheelbase",
              ]}
            />
          </div>

          {/* REDUCED MARGIN AND PILL SIZE */}
          <div className="text-center mb-6 md:mb-10">
            <Heading3 text={"After Market Seats"}/>
            {/* <h3 className="text-lg md:text-3xl text-gray-600 font-medium">
              After Market Seats
            </h3> */}
            <div className="w-10 h-1 bg-hover mx-auto mt-2 rounded-full"></div>
          </div>

          {/* REDUCED GAP */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            <InfoCard
              image="/sprinter/Mask group-3.webp"
              title="Comfort & Durability"
              items={[
                "Made with high-quality materials",
                "Leather or top-grade fabric options",
                "Better padding and ergonomic support",
                "Designed for long-term use and comfort",
              ]}
            />
            <InfoCard
              image="/sprinter/Mask group-4.webp"
              title="Functionality"
              items={[
                "Aftermarket options for specific uses",
                "Swivel bases for camper vans",
                "Heavy-duty seats for commercial use",
                "Swivel adapters adjust seat height",
                "Lowered bases maintain accessibility",
              ]}
            />
            <InfoCard
              image="/sprinter/Mask group-5.webp"
              title="Customization"
              items={[
                "Wide variety of seat styles available",
                "Swivel seat options",
                "Captain's chairs for luxury",
                "Bench seats for capacity",
                "Reclining and heated options",
                "Premium personalization features",
              ]}
            />
          </div>
        </section>

        {/* --- HR separator --- */}
        <hr className="my-8 md:my-12 border-gray-200" />

        {/* ==================================== */}
        {/* ROOF & HINGES SECTION (No change from last step, kept for completeness) */}
        {/* ==================================== */}
        <section className="pt-10 md:pt-12">
          {/* REDUCED TITLE FONT SIZE AND MARGIN */}
          <Heading2 text={"Roof Tracks & 180-Degree Rear Door Hinges"} className="text-center mb-8"/>
          {/* <h1 className="section-title text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1a1f2e] mb-10 md:mb-12 max-w-4xl mx-auto leading-tight">
            Roof Tracks & 180-Degree Rear Door Hinges
          </h1> */}

          {/* FEATURE 1: Roof Tracks - REDUCED MARGIN */}
          <div className="feature-section mb-10 md:mb-12">
            <div className="group bg-gradient-to-br from-primary to-[#2d3748] rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-500 border border-gray-700 hover:border-emerald-400/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* REDUCED PADDING */}
                <div className="p-5 lg:p-8 flex flex-col justify-center order-2 lg:order-1">
                  {/* REDUCED TITLE FONT SIZE */}
                  <Heading3 text={"Roof Tracks"} className="text-secondary! mb-4"/>
                  {/* <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-emerald-50 transition-colors duration-300">
                    Roof Tracks
                  </h2> */}
                  <div className="space-y-3 sm:space-y-3">
                    {[
                      "Factory roof rails support up to 440 lbs, compatible with crossbars.",
                      "Aftermarket options (Thule, Rhino-Rack) for customizable accessory mounting.",
                      "Ideal for cargo, bikes, and kayaks; durable and weather-resistant.",
                    ].map((text, index) => (
                      <FeatureItem key={index} text={text} index={index} />
                    ))}
                  </div>
                </div>
                {/* IMAGE SECTION - REDUCED HEIGHT */}
                <div className="p-1.5 flex items-center justify-center order-1 lg:order-2">
                  <div className="relative overflow-hidden rounded-xl w-full h-56 sm:h-64 lg:h-80 group/image">
                    <ImageWithSkeleton
                      src="/sprinter/Rectangle 153.webp"
                      alt="Van with roof tracks"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FEATURE 2: Hinges */}
          <div className="feature-section">
            <div className="group bg-gradient-to-br from-primary to-[#2d3748] rounded-2xl overflow-hidden shadow-2xl hover:shadow-xl transition-all duration-500 border border-gray-700 hover:border-emerald-400/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                {/* IMAGE SECTION - REDUCED HEIGHT */}
                <div className="p-1.5 flex items-center justify-center">
                  <div className="relative overflow-hidden rounded-xl w-full h-56 sm:h-64 lg:h-80 group/image">
                    <ImageWithSkeleton
                      src="/sprinter/Rectangle 154.webp"
                      alt="Van with 180-degree rear door hinges"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/image:scale-105"
                    />
                  </div>
                </div>
                {/* REDUCED PADDING */}
                <div className="p-5 lg:p-8 flex flex-col justify-center">
                  {/* REDUCED TITLE FONT SIZE */}
                  <Heading3 text={"180-Degree Rear Door Hinges"} className="text-secondary! mb-4"/>
                  {/* <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-emerald-50 transition-colors duration-300">
                    180-Degree Rear Door Hinges
                  </h2> */}
                  <div className="space-y-3 sm:space-y-3">
                    {[
                      "Replaces 270-degree hinges for tire carriers or ladders.",
                      "Doors open parallel to the rear, fit 2019+ Sprinter (VS30).",
                      "OEM / Aftermarket available; easy install, enhances safety and durability.",
                    ].map((text, index) => (
                      <FeatureItem key={index} text={text} index={index} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
