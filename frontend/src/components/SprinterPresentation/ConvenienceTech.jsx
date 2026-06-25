"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ImageWithSkeleton, RichParagraph } from "../Common/Common";
import { Heading2, Heading3 } from "../Common/Common";

const MBUX_IMAGE = "/sprinter/Rectangle 160.webp";
const CAMERA_IMAGE = "/sprinter/pp3.webp";
const BENEFITS_IMAGE = "/sprinter/Rectangle160.webp";

const SwivelCard = ({ title, description, index }) => (
  <div className="bbv-card flex flex-col h-full p-5 lg:p-6 rounded-xl lg:rounded-2xl border-t border-hover/30 hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden">
    <div className="flex items-center mb-4 relative z-10">
      <div className="w-9 h-9 rounded-lg bg-primary/5 border border-hover/30 flex items-center justify-center mr-3 group-hover:bg-hover/20 transition-all duration-500">
        <span className="font-display font-bold text-hover text-sm">{index}</span>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-hover/40 to-transparent rounded-full"></div>
    </div>

    <Heading3 text={title} className="!text-primary mb-2 leading-snug relative z-10" />
    <RichParagraph className="!text-primary/70 leading-relaxed flex-1 relative z-10">{description}</RichParagraph>

    <div className="mt-4 relative z-10">
      <div className="h-px w-full bg-primary/10 rounded-full overflow-hidden">
        <div className="h-full w-0 bg-hover rounded-full group-hover:w-full transition-all duration-1000 ease-out"></div>
      </div>
    </div>
  </div>
);

const TechCard = ({ title, description, imageUrl }) => (
  <div className="bbv-card flex flex-col h-full rounded-xl lg:rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-500 group">
    <div className="p-4 flex-1 relative z-10">
      <p className="text-hover text-xs uppercase tracking-widest font-bold mb-2">Feature</p>
      <Heading3 text={title} className="!text-primary mb-2" />
      <RichParagraph className="!text-primary/70 leading-relaxed">{description}</RichParagraph>
    </div>

    <div className="relative mt-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent z-10"></div>
      <div className="w-full h-48 overflow-hidden">
        <ImageWithSkeleton
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/001F3D/FBFBF9?text=Premium+Feature";
          }}
        />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-hover/60 via-hover to-hover/60 z-20"></div>
    </div>
  </div>
);

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto my-12 lg:my-16">
    <div className="flex items-center justify-center">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent flex-1 rounded-full"></div>
      <div className="mx-5 flex items-center space-x-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-hover/40"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-hover animate-pulse"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-hover/40"></div>
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent flex-1 rounded-full"></div>
    </div>
  </div>
);

export default function ConvenienceTech() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (typeof gsap === "undefined") return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".anim-title-main", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        rotationX: 15,
        duration: 1.6,
        ease: "power3.out",
      }).from(
        ".anim-title-sub",
        { y: 60, opacity: 0, scale: 0.97, duration: 1.4, ease: "power3.out" },
        "-=1.2",
      );

      tl.from(
        ".anim-swivel-card",
        {
          y: 120,
          opacity: 0,
          rotationX: 20,
          scale: 0.9,
          stagger: { amount: 0.5, from: "center" },
          duration: 1.6,
          ease: "power3.out",
        },
        "-=1.0",
      ).from(
        ".anim-tech-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotationY: 10,
          stagger: { amount: 0.6, from: "start" },
          duration: 1.5,
          ease: "back.out(1.6)",
        },
        "-=1.2",
      );

      gsap.to(".float-element", {
        y: -15,
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
    <div
      ref={containerRef}
      className="bbv-section-light relative w-full pt-10 md:pt-12 pb-4 md:pb-6 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="bbv-dot-grid-light" />

      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-28 -right-28 w-56 h-56 rounded-full bg-hover/5 float-element blur-3xl"></div>
        <div className="absolute -bottom-28 -left-28 w-56 h-56 rounded-full bg-hover/5 float-element blur-3xl"></div>
      </div>

      {/* Section 1: Swivel Seats */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-4">
            <span className="text-hover text-xs uppercase tracking-widest font-bold">
              Premium Components
            </span>
          </div>
          <div className="bbv-divider mb-6" />
          <Heading2 text={"Tech & Conversion Ready Components"} className="!text-primary font-display uppercase tracking-wide" />
          <RichParagraph className="!text-primary/70 mt-3">
            {"Stock Mercedes Swivel Seats – Uncompromised OEM Excellence"}
          </RichParagraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          <SwivelCard title="Seamless Integration" description="Designed for exact fit with Sprinter's interior, ensuring no gaps or alignment issues. Maintains factory aesthetics and functionality, enhancing resale value." index="1" />
          <SwivelCard title="Safety Compliance" description="Includes airbags and meets federal safety standards, critical for passenger protection. Engineered to preserve structural integrity, unlike some aftermarket options." index="2" />
          <SwivelCard title="Reliability & Durability" description="Built with high-quality materials, rigorously tested for long-term use. Backed by Mercedes-Benz warranty, reducing maintenance risks." index="3" />
          <SwivelCard title="Ease of Use" description="Factory-installed, no additional setup or modifications needed. Smooth operation with minimal height increase (e.g., ~1 inch), preserving ergonomics." index="4" />
        </div>
      </div>

      <SectionDivider />

      {/* Section 2: Safety & Convenience Tech */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg bg-hover/10 border border-hover/20 mb-4">
            <span className="text-hover text-xs uppercase tracking-widest font-bold">
              Advanced Technology
            </span>
          </div>
          <div className="bbv-divider mb-6" />
          <Heading2 text={"Safety & Convenience Technology"} className="!text-primary font-display uppercase tracking-wide" />
          <RichParagraph className="!text-primary/70 mt-3">
            {"Advanced systems designed to enhance your driving experience with cutting-edge safety and convenience features."}
          </RichParagraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          <TechCard title="MBUX System" description="10.25-inch touchscreen, faster navigation. Wireless CarPlay/Android Auto, OTA updates. 'Hey Mercedes' voice control for ease." imageUrl={MBUX_IMAGE} />
          <TechCard title="360° Camera" description="3D surround view, detects obstacles <12 ft. Shows rear door clearance, aids parking. Part of Drive Assist Package for safety." imageUrl={CAMERA_IMAGE} />
          <TechCard title="Premium Benefits" description="Boosts safety with integrated assist systems. Simplifies urban driving, towing, camping. Mercedes me connect app enhances control." imageUrl={BENEFITS_IMAGE} />
        </div>
      </div>
    </div>
  );
}
