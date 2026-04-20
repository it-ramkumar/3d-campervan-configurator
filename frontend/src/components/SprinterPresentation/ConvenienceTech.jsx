"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageWithSkeleton, RichParagraph } from "../Common/Common";
import { Heading2, Heading3 } from "../Common/Common";
// import SwivelCard from "./SwivelCard";
// Placeholder image URLs for the tech section
const MBUX_IMAGE = "/sprinter/Rectangle 160.webp";
const CAMERA_IMAGE = "/sprinter/pp3.webp";
const BENEFITS_IMAGE = "/sprinter/Rectangle160.webp";

// MODIFIED: Further reduced padding, font sizes, and number indicator size.
const SwivelCard = ({ title, description,  index }) => (
  <div
    className={`flex flex-col h-full p-5 lg:p-6 bg-gradient-to-br from-[var(--color-primary)] to-[#151a27] rounded-xl lg:rounded-2xl shadow-xl border border-[#2a3042] hover:border-[#3a4259] transition-all duration-700 group hover:transform hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden`}
  >
    {/* Background gradient animation */}
    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

    {/* Floating particles background */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-3 left-5 w-0.5 h-0.5 bg-white rounded-full animate-pulse"></div>
      <div className="absolute top-9 right-6 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-5 left-7 w-0.5 h-0.5 bg-white rounded-full animate-pulse delay-700"></div>
    </div>

    {/* Number indicator with glow effect */}
    <div className="flex items-center mb-4 relative z-10">
      <div className="relative">
        {/* MODIFIED: Reduced w-10/h-10 to w-9/h-9 and text to text-sm */}
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1e2a4a] to-[#2d3b5e] flex items-center justify-center mr-3 border border-[#3a4259] shadow-md group-hover:shadow-lg group-hover:from-[#2d3b5e] group-hover:to-[#3c4a6d] transition-all duration-500">
          <span className="font-serif font-bold text-[var(--color-secondary)] text-sm">
            {index}
          </span>
        </div>
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-[#ED985F] to-transparent opacity-2 group-hover:opacity-40 blur-sm transition-opacity duration-500"></div>
      </div>
      <div className="h-0.5 flex-1 bg-gradient-to-r from-[#3a4259] to-transparent rounded-full group-hover:from-[#ED985F] transition-all duration-500"></div>
    </div>

    {/* MODIFIED: Reduced lg:text-xl to lg:text-lg */}
    <Heading3 text={title} className="!text-[var(--color-secondary)] mb-2 group-hover:text-[#f0f4ff] transition-colors duration-500 leading-snug relative z-10" />
    
    {/* MODIFIED: Reduced text-sm to text-xs */}
    <RichParagraph className="!text-[var(--color-secondary)] leading-relaxed flex-1 relative z-10 group-hover:text-[#d8e0ff] transition-colors duration-500">{description}</RichParagraph>
    

    {/* Animated progress bar */}
    <div className="mt-4 relative z-10">
      <div className="h-0.5 w-full bg-[#2a3042] rounded-full overflow-hidden">
        <div className="h-full w-0 bg-gradient-to-r from-[#ED985F] to-[#ED985F] rounded-full group-hover:w-full transition-all duration-1000 ease-out"></div>
      </div>
    </div>

    {/* Corner accents with animation */}
    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#4a5a8c] rounded-tr-lg group-hover:border-[#6a7aac] transition-colors duration-500"></div>
    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#4a5a8c] rounded-bl-lg group-hover:border-[#6a7aac] transition-colors duration-500"></div>
  </div>
);

// MODIFIED: Further reduced padding, font sizes, and image height.
const TechCard = ({ title, description, imageUrl }) => (
  <div
    className={`flex flex-col h-full  bg-gradient-to-b from-white to-[#fafbff] border-2 border-[#1a1f2e] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 group hover:transform hover:-translate-y-2 relative`}
  >
    {/* Background pattern */}
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,#f0f4ff_49%,#f0f4ff_51%,transparent_51%)] bg-[size:7px_7px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

    {/* Content container */}
    {/* MODIFIED: Reduced p-5 to p-4 */}
    <div className="p-4 flex-1 relative z-10">
      {/* MODIFIED: Reduced lg:text-xl to lg:text-lg and text-lg to text-base */}
      <Heading3 text={title} className="mb-2 pb-2"/>
      
      {/* MODIFIED: Reduced text-sm to text-xs */}
      <RichParagraph className="text-[#5a6578] leading-relaxed group-hover:text-[#4a5568] transition-colors duration-500">{description}</RichParagraph>
      
    </div>

    {/* Enhanced image container */}
    <div className="relative mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#001F3D]/60 via-[#001F3D]/30 to-transparent z-10 group-hover:from-[#001F3D]/40 group-hover:via-[#001F3D]/20 transition-all duration-500"></div>
      <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-white to-transparent z-10 opacity-40"></div>

      {/* Image with parallax effect */}
      {/* MODIFIED: Reduced h-56 to h-48 */}
      <div className="w-full h-48 overflow-hidden">
        <ImageWithSkeleton
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/1a1f2e/FFFFFF?text=Premium+Feature";
          }}
        />
      </div>

      {/* Bottom gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#1a1f2e] via-[#2d3b5e] to-[#1a1f2e]"></div>
    </div>

    {/* Enhanced border accent corners */}
    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-[#1a1f2e] rounded-tr-lg"></div>
    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-[#1a1f2e] rounded-tl-lg"></div>
    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-[#1a1f2e] rounded-br-lg"></div>
    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-[#1a1f2e] rounded-bl-lg"></div>
  </div>
);

// MODIFIED: Reduced my-16 to my-12/my-16 and orb sizes.
const SectionDivider = () => (
  <div className="max-w-6xl mx-auto my-12 lg:my-16">
    <div className="flex items-center justify-center">
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#3a4259] to-transparent flex-1 rounded-full"></div>
      <div className="mx-5 flex items-center space-x-1.5">
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#1a1f2e] to-[#2d3b5e] border border-[#3a4259] shadow-sm"></div>
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#1a1f2e] to-[#2d3b5e] border border-[#3a4259] shadow-lg animate-pulse"></div>
        <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[#1a1f2e] to-[#2d3b5e] border border-[#3a4259] shadow-sm"></div>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#3a4259] to-transparent flex-1 rounded-full"></div>
    </div>
  </div>
);

export default function ConvenienceTech() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof gsap === "undefined") {
      console.warn("GSAP is not available globally. Skipping animations.");
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Enhanced title animations
      tl.from(".anim-title-main", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotationX: 15,
        duration: 1.6,
        ease: "power3.out",
      }).from(
        ".anim-title-sub",
        {
          y: 60,
          opacity: 0,
          scale: 0.97,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=1.2",
      );

      // Sophisticated card animations
      tl.from(
        ".anim-swivel-card",
        {
          y: 120,
          opacity: 0,
          rotationX: 20,
          scale: 0.9,
          stagger: {
            amount: 0.5,
            from: "center",
          },
          duration: 1.6,
          ease: "power3.out",
        },
        "-=1.0",
      )

        .from(
          ".anim-tech-card",
          {
            y: 100,
            opacity: 0,
            scale: 0.9,
            rotationY: 10,
            stagger: {
              amount: 0.6,
              from: "start",
            },
            duration: 1.5,
            ease: "back.out(1.6)",
          },
          "-=1.2",
        );

      // Background elements animation
      gsap.fromTo(
        ".bg-orb",
        {
          opacity: 0,
          scale: 0.5,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 2,
          ease: "power2.out",
          stagger: 0.2,
        },
      );

      // Continuous floating animation
      gsap.to(".float-element", {
        y: -15, // Reduced from -20
        rotation: 2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // MODIFIED: Further reduced global padding (pt-12/pb-6 to pt-10/pb-4 and md:pt-16/md:pb-8 to md:pt-12/md:pb-6)
    <div
      ref={containerRef}
      className="relative w-full bg-white font-sans pt-10 md:pt-12 pb-4 md:pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* MODIFIED: Reduced orb sizes further */}
        <div className="absolute -top-28 -right-28 w-56 h-56 rounded-full bg-gradient-to-br from-[#f0f4ff] to-[#e0e8ff] opacity-15 bg-orb float-element blur-lg"></div>
        <div className="absolute -bottom-28 -left-28 w-56 h-56 rounded-full bg-gradient-to-tr from-[#f0f4ff] to-[#e0e8ff] opacity-15 bg-orb float-element blur-lg"></div>
        <div className="absolute top-1/3 -left-20 w-44 h-44 rounded-full bg-gradient-to-r from-[#f5f7ff] to-[#e8eeff] opacity-10 bg-orb float-element blur-md"></div>

        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,#0a0c14_1px,transparent_1px),linear-gradient(-45deg,#0a0c14_1px,transparent_1px)] bg-[size:35px_35px] bg-[position:0_0,17.5px_17.5px]"></div>
        </div>
      </div>

      {/* --- Section 1: Swivel Seats --- */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        {/* MODIFIED: Reduced mb-12 to mb-10 */}
        <div className="text-center mb-10">
          {/* MODIFIED: Reduced px-4/py-2 to px-3/py-1.5 and mb-6 to mb-4 */}
          <div className="inline-flex items-center justify-center mb-4 relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
            <span className="font-sans font-semibold text-[9px] uppercase tracking-widest px-3 py-1 text-hover bg-hover/10 border border-hover/20 rounded-sm relative z-10">
              Premium Components
            </span>
          </div>

          {/* MODIFIED: Reduced lg:text-4xl to lg:text-3xl and mb-3 to mb-2 */}
          <Heading2 text={"Tech & Conversion Ready Components"}/>
          

          {/* MODIFIED: Reduced lg:text-xl to lg:text-lg */}
          <RichParagraph>{" Stock Mercedes Swivel Seats – Uncompromised OEM Excellence"}</RichParagraph>
          
        </div>

        {/* Enhanced Swivel Seat Cards Grid */}
        {/* MODIFIED: Reduced gap-8 to gap-6 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <SwivelCard
            title="Seamless Integration"
            description="Designed for exact fit with Sprinter's interior, ensuring no gaps or alignment issues. Maintains factory aesthetics and functionality, enhancing resale value."
            // animationClass="anim-swivel-card"
            index="1"
          />
          <SwivelCard
            title="Safety Compliance"
            description="Includes airbags and meets federal safety standards, critical for passenger protection. Engineered to preserve structural integrity, unlike some aftermarket options."
            // animationClass="anim-swivel-card"
            index="2"
          />
          <SwivelCard
            title="Reliability & Durability"
            description="Built with high-quality materials, rigorously tested for long-term use. Backed by Mercedes-Benz warranty, reducing maintenance risks."
            // animationClass="anim-swivel-card"
            index="3"
          />
          <SwivelCard
            title="Ease of Use"
            description="Factory-installed, no additional setup or modifications needed. Smooth operation with minimal height increase (e.g., ~1 inch), preserving ergonomics."
            // animationClass="anim-swivel-card"
            index="4"
          />
        </div>
      </div>

      {/* Enhanced Section Divider */}
      <SectionDivider />

      {/* --- Section 2: Safety & Convenience Tech --- */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
        {/* MODIFIED: Reduced mb-12 to mb-10 */}
        <div className="text-center mb-10">
          {/* MODIFIED: Reduced px-4/py-2 to px-3/py-1.5 and mb-6 to mb-4 */}
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-[#fff1e7] border border-[#f4c7ab] shadow-sm mb-4">
            <span className="font-sans font-semibold text-[9px] text-hover uppercase tracking-widest">
              ADVANCED TECHNOLOGY
            </span>
          </div>

          {/* MODIFIED: Reduced lg:text-3xl to lg:text-2xl and mb-3 to mb-2 */}
          <Heading2 text={"Safety & Convenience Technology"}/>
          

          {/* MODIFIED: Reduced text-base to text-sm */}
          <RichParagraph>{" Advanced systems designed to enhance your driving experience with cutting-edge safety and convenience features."}</RichParagraph>
          
        </div>

        {/* Enhanced Tech Feature Cards with Premium Borders */}
        {/* MODIFIED: Reduced gap-8 to gap-6 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <TechCard
            title="MBUX System"
            description="10.25-inch touchscreen, faster navigation. Wireless CarPlay/Android Auto, OTA updates. 'Hey Mercedes' voice control for ease."
            imageUrl={MBUX_IMAGE}
            // animationClass="anim-tech-card"
          />
          <TechCard
            title="360° Camera"
            description="3D surround view, detects obstacles <12 ft. Shows rear door clearance, aids parking. Part of Drive Assist Package for safety."
            imageUrl={CAMERA_IMAGE}
            // animationClass="anim-tech-card"
          />
          <TechCard
            title="Premium Benefits"
            description="Boosts safety with integrated assist systems. Simplifies urban driving, towing, camping. Mercedes me connect app enhances control."
            imageUrl={BENEFITS_IMAGE}
            // animationClass="anim-tech-card"
          />
        </div>
      </div>
    </div>
  );
}
