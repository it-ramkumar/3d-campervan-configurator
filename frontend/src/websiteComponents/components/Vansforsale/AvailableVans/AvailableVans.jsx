"use client";
import { useRef } from 'react';
import { Link } from "react-router-dom"
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import BlackButton from '../../Common/Button/BlackButton';


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


  return (
    <>

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
              // onMouseEnter={handleCentralCircleHover}
              // onMouseLeave={handleCentralCircleLeave}
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

            >
              <VanIcon />
            </div>

            {/* Feature 1: Top-Left - TEXT ABOVE, ICON BELOW */}
            <div
              ref={el => featureItemsRef.current[0] = el}
              className="feature-item absolute -translate-x-28 -translate-y-20 md:-translate-x-32 md:-translate-y-24 flex flex-col items-center text-center w-28 md:w-32 cursor-pointer group"

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
              // onMouseEnter={() => handleFeatureMouseEnter(1)}
              // onMouseLeave={() => handleFeatureMouseLeave(1)}
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
              // onMouseEnter={() => handleFeatureMouseEnter(2)}
              // onMouseLeave={() => handleFeatureMouseLeave(2)}
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
              // onMouseEnter={() => handleFeatureMouseEnter(3)}
              // onMouseLeave={() => handleFeatureMouseLeave(3)}
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
  {/* Background elements remain similar for context */}
  <div className="hidden lg:block absolute inset-x-0 top-0 h-72 bg-slate-900 z-0"></div>

  <div className="relative z-10 max-w-4xl mx-auto flex justify-center px-4 md:px-8 lg:px-16">
    {availableVans && availableVans.length > 0 ? (
      availableVans.map((van, index) => (
        <div
          key={van.id}
          ref={el => cardsRef.current[index] = el}
          // Increased max-width for a slightly larger card on desktop
          className="relative group transform-gpu w-full max-w-sm sm:max-w-md lg:max-w-xl"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Mobile background/glow - slightly cleaner */}
          <div className="lg:hidden absolute top-[-24px] h-40 bg-slate-900 z-[-1] w-screen left-1/2 -translate-x-1/2"></div>
          {/* Subtle, softer glow effect */}
          <div className="card-glow absolute -inset-2.5 bg-sky-500/30 rounded-[30px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[-1]"></div>

          {/* --- Card Container --- */}
          {/* Slightly more rounded edges (24px vs 30px) for a softer look */}
          <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm border border-white/10">

            {/* --- Image Section --- */}
            <div className="w-full h-2/3 relative">
              <ImageWithSkeleton
                src={van.gallery[0]}
                alt={van.model}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Darker overlay for better text contrast */}
              <div className="absolute inset-0 bg-black/40 z-10"></div>
            </div>

            {/* --- Details Section (Bottom 1/3) --- */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20 bg-slate-900/95 border-t-2 border-white/60">

              {/* Model Name */}
              <h3 className="font-noto-serif font-bold text-white text-[24px] leading-tight mb-3 tracking-wide">
                {van.van_listing.model_name}
              </h3>

              {/* Price Information */}
              <div className="flex items-end justify-between mb-4">
                {/* Discounted Price */}
                <div className="flex flex-col">
                  <span className="font-sans font-extrabold text-4xl text-white leading-none">
                    ${ (185000).toLocaleString() }
                  </span>
                  {/* Original Price (Strikethrough) */}
                  <span className="font-sans text-sm text-gray-400 line-through mt-1">
                    ${van.van_listing.price.toLocaleString()}
                  </span>
                </div>

                {/* More Details Button (Prominent) */}
                <BlackButton
                  label="View Details"
                  link={`/van-detail/${van.slug}`}
                  className="details-button"
                />

              </div>

              {/* Description */}
              <p className="font-sans text-white/70 text-sm leading-snug line-clamp-2">
                {van.van_listing.description}
              </p>
            </div>

          </div>
        </div>
      ))
    ) : (
      // Coming Soon Card
      <div className="relative group transform-gpu w-full max-w-sm sm:max-w-md lg:max-w-xl">
        {/* Mobile background */}
        <div className="lg:hidden absolute top-[-24px] h-40 bg-slate-900 z-[-1] w-screen left-1/2 -translate-x-1/2"></div>

        {/* Glow effect */}
        <div className="absolute -inset-2.5 bg-gradient-to-r from-sky-500/20 via-purple-500/20 to-pink-500/20 rounded-[30px] blur-xl opacity-60 animate-pulse z-[-1]"></div>

        {/* Card Container */}
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900/95 backdrop-blur-sm border-2 border-white/20">

          {/* Content */}
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            {/* Van Icon */}
            <div className="mb-6 bg-gradient-to-br from-sky-500 to-purple-600 rounded-full p-6 shadow-2xl animate-bounce">
              <VanIcon />
            </div>

            {/* Coming Soon Text */}
            <h3 className="font-noto-serif font-bold text-white text-3xl md:text-4xl mb-4 tracking-wide">
              Coming Soon
            </h3>

            {/* Description */}
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed max-w-md">
              Exciting new vans are on their way! Check back soon to discover our latest premium conversions ready for adventure.
            </p>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-8">
              <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>

        </div>
      </div>
    )}
  </div>
</div>
      </section>
    </>
  );
}