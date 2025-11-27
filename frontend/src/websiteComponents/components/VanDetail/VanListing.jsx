"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import ImageWithSkeleton from "../Common/ImageWithSkeleton/ImageWithSkeleton";

// --- SVG Icons (Slight modification to allow for background color) ---
const SvgInsulation = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M9 16H15M9 8H15M12 5V19"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgElectric = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgWater = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M6 14C6 17.3137 8.68629 20 12 20C15.3137 20 18 17.3137 18 14C18 10 12 4 12 4C12 4 6 10 6 14Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgInterior = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M21 8H3M21 12H3M21 16H3M7 20H17C18.1046 20 19 19.1046 19 18V6C19 4.89543 18.1046 4 17 4H7C5.89543 4 5 4.89543 5 6V18C5 19.1046 5.89543 20 7 20Z"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgSeating = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M17 16H7C5.89543 16 5 15.1046 5 14V8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V14C19 15.1046 18.1046 16 17 16ZM12 6V10M12 10H17M12 10H7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SvgExterior = ({ className }) => (
  <svg
    className={`w-8 h-8 transition-colors duration-300 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M3 12H21M12 3V21M7 7L17 17M7 17L17 7"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- Reusable Hero Spec Component (from previous iteration) ---
const HeroSpecItem = ({ label, value }) => (
  <div className="group py-2 cursor-pointer transition duration-300 hover:text-[#2761FD] border-b-2 border-transparent hover:border-[#2761FD]">
    <p className="text-xs md:text-sm opacity-80 uppercase tracking-wider">{label}</p>
    <p className="font-bold text-base md:text-lg mt-1 whitespace-nowrap">
      {value || "N/A"}
    </p>
  </div>
);

// --- Custom Checkmark Icon for Feature List ---
const SvgCheckmark = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#2761FD] flex-shrink-0 mt-1 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
);


const VanPage = ({ vanDetail, onConsultationClick }) => {
  const heroRef = useRef(null);

  // --- Data Mapping (Updated icons to remove circle fill) ---
  const van = {
    detailed_features:
      vanDetail?.detailed_features?.map((feature) => {
        const icons = {
          "Insulation and Paneling": <SvgInsulation />,
          "Water System": <SvgWater />,
          Electrics: <SvgElectric />,
          "Seating and Sleeping": <SvgSeating />,
          Kitchen: <SvgInterior />,
          Exterior: <SvgExterior />,
        };
        return {
          icon: icons[feature.category] || <SvgExterior />,
          category: feature.category,
          items: feature.items || [],
        };
      }) || [],
    gallery: vanDetail?.gallery || [],
  };

  // --- GSAP Animation (Unchanged) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bg-image",
        { scale: 1 },
        { scale: 1.1, duration: 15, ease: "none", repeat: -1, yoyo: true }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-gray-100 font-noto-serif">
      {/* ================= HERO SECTION (REDUCED HEIGHT AND FONT SIZE) ================= */}
      <div
        ref={heroRef}
        className="relative w-full h-[70vh] md:h-[500px] overflow-hidden text-white"
      >
        {/* Background Image with Zoom Effect */}
        <ImageWithSkeleton
          src={vanDetail.gallery[0]}
          alt={`${vanDetail.van_listing.title} custom van`}
          className="bg-image absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay with Subtle Gradient */}
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 bg-[linear-gradient(270.39deg,rgba(0,0,0,0.1)_0.33%,#000000_106.96%)]"></div>

        {/* Content Area */}
        <div className="relative z-10 h-full flex flex-col justify-end pb-8 px-4 sm:px-8 lg:px-16">
          <div className="max-w-4xl">
            {/* Title Block - REDUCED FONT SIZE */}
            <h1 className="font-extrabold text-3xl sm:text-4xl md:text-[52px] leading-tight mb-2 tracking-tight">
              {vanDetail.van_listing.title}
            </h1>
            <p className="text-base md:text-xl mt-1 max-w-3xl font-light opacity-90">
              {vanDetail.van_listing.subtitle}
            </p>

            {/* Specifications Grid - REDUCED MARGINS/PADDING/FONT SIZE */}
            <div className="flex flex-wrap justify-start gap-x-8 gap-y-2 mt-6 mb-4 border-t border-b border-gray-600 py-3">

              <HeroSpecItem
                label="Make & Model"
                value={vanDetail?.van_listing.specifications?.make_model}
              />

              <HeroSpecItem
                label="Wheelbase"
                value={vanDetail?.van_listing.specifications?.wheelbase}
              />

              <HeroSpecItem
                label="Drivetrain"
                value={vanDetail?.van_listing.specifications?.drivetrain}
              />

              <HeroSpecItem
                label="Sit & Sleep"
                value={`${vanDetail?.van_listing.specifications?.capacity?.sits || "0"} - ${vanDetail?.van_listing.specifications?.capacity?.sleeps || "0"}`}
              />
            </div>

            {/* Price & CTA Block - MOBILE OPTIMIZATION APPLIED HERE */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Black Friday Offer (Conditional) */}
              {vanDetail.slug === "4x4-santa-monica-v6-turbo" && (
                // MODIFIED: Added max-w-xs (max-width: 320px) and mx-auto (center alignment) on mobile.
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl border border-white/20 w-full max-w-xs mx-auto sm:w-auto sm:max-w-none sm:mx-0">

                  {/* Label */}
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-xs font-semibold text-gray-200 uppercase tracking-widest">
                      Exclusive Price
                    </p>
                    <span className="bg-[#FFD700] text-black text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-pulse">
                      🎉 BLACK FRIDAY DEAL
                    </span>
                  </div>

                  {/* Price area - Smaller text on mobile */}
                  <div className="flex items-end gap-2 mt-0.5">
                    <p className="text-gray-400 text-sm line-through font-medium">
                      ${vanDetail?.van_listing?.originalPrice?.toLocaleString() || "224,543"}
                    </p>
                    <p className="font-extrabold text-2xl sm:text-3xl text-[#FFD700] drop-shadow-lg">
                      ${"185,000"}
                    </p>
                  </div>
                  <p className="text-xs text-green-300 mt-0.5 font-semibold">
                    Flat 17% Off – Limited Time Offer
                  </p>
                </div>
              )}

              {/* Call To Action Button - Full width on mobile, auto on desktop, centered on mobile */}
              <button
                onClick={onConsultationClick}
                className="cursor-pointer px-6 py-2.5 bg-[#2761FD] text-white font-bold text-base rounded-md transition-all duration-300 ease-in-out shadow-lg hover:bg-white hover:text-[#2761FD] hover:shadow-[0_0_30px_rgba(39,97,253,0.8)] w-full max-w-xs mx-auto sm:w-auto sm:max-w-none sm:mx-0"
              >
                Book A Call Now
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ================= KEY FEATURES SECTION (IMPROVED DESIGN) ================= */}
      <div className="py-16 px-4 sm:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center font-extrabold text-4xl text-black mb-12 tracking-tight">
            Comprehensive Build Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {van.detailed_features.map((feature, index) => (
              <div
                key={index}
                className="group w-full max-w-[400px] min-h-[400px] mx-auto bg-white rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-gray-100 transition-all duration-500 ease-in-out transform hover:shadow-xl hover:scale-[1.02] hover:border-[#2761FD]"
              >
                {/* Icon Container */}
                <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-black transition-colors duration-300 group-hover:bg-[#2761FD] mb-4">
                    {feature.icon}
                </div>
                
                <h3 className="font-black text-xl mt-1 mb-4 text-black tracking-tight">
                  {feature.category}
                </h3>
                
                {/* Feature List */}
                <div className="w-full flex-grow text-left">
                  <ul className="space-y-2 font-medium text-sm text-gray-700">
                    {feature.items.slice(0, 5).map((item, i) => ( // Display up to 5 items
                      <li key={`item-${i}`} className="flex items-start transition-colors duration-300 group-hover:text-black">
                        <SvgCheckmark />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                    {feature.items.length > 5 && (
                        <li className="text-xs text-gray-500 italic mt-1">
                            + {feature.items.length - 5} more features...
                        </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>

      {/* ================= Flagship ================= */}
      <div className="px-6 md:pl-16 md:pr-16 bg-gray-50">
        <div className="max-w-3xl text-left py-6">
          <h2 className="font-bold text-3xl mb-4">{vanDetail.van_listing.title}</h2>
          <p className="text-lg font-normal leading-relaxed mb-6">
            {vanDetail.van_listing.description}
          </p>
          {/* <Link to={"/contact"}> */}
          <button onClick={onConsultationClick}
            className="px-4 py-2 bg-[#2761FD] cursor-pointer text-white font-noto-sans font-bold text-sm rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5">
            Book a call now
          </button>
          {/* </Link> */}
        </div>
      </div>

      {/* ================= Gallery ================= */}
      <div className="p-6 md:p-12 bg-white">
        {van.gallery.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {van.gallery.map((img, i) => (
              <ImageWithSkeleton
                key={i}
                src={img}
                alt={img}
                className="w-full h-56 object-cover rounded-lg shadow-md"
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No gallery images available.</p>
        )}
      </div>
      {/* ================= Video Section ================= */}
      {vanDetail.media && vanDetail.media.length > 0 && (
        <div className="w-full bg-black py-12 px-4 md:px-12">
          <h2 className="text-center font-bold text-white text-3xl mb-8">
            Watch Video
          </h2>

          <div
            className={`grid gap-6 ${vanDetail.media.length === 1
              ? "grid-cols-1"
              : vanDetail.media.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
          >
            {vanDetail.media.map((videoUrl, index) => {
              let embedUrl = videoUrl.trim();

              // ✅ Handle youtu.be format
              if (embedUrl.includes("youtu.be/")) {
                embedUrl = embedUrl.replace("youtu.be/", "www.youtube.com/embed/");
              }
              // ✅ Handle watch?v= format
              else if (embedUrl.includes("watch?v=")) {
                embedUrl = embedUrl.replace("watch?v=", "embed/");
              }
              // ✅ Handle shorts format
              else if (embedUrl.includes("youtube.com/shorts/")) {
                embedUrl = embedUrl.replace("youtube.com/shorts/", "youtube.com/embed/");
              }

              // Remove extra params like &t=5s
              embedUrl = embedUrl.split("&")[0];

              // ✅ Detect if it's a Shorts video
              const isShorts = videoUrl.includes("/shorts/");

              return (
                <div
                  key={index}
                  className="relative w-full overflow-hidden rounded-xl shadow-xl transform transition-all duration-500 hover:scale-[1.01]"
                >
                  <div
                    className={`relative w-full ${isShorts
                      ? "aspect-[9/16] max-w-[300px] mx-auto" // 🎥 Tall for Shorts
                      : "aspect-video" // 📺 Normal landscape video
                      }`}
                  >
                    <iframe
                      src={`${embedUrl}?rel=0&modestbranding=1`}
                      title={`video-${index}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
                    ></iframe>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VanPage;