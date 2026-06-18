"use client";
import React, { useState } from "react";
import {
  ChevronDown, ChevronUp,
  Palette, BedDouble, CookingPot, ShowerHead, Armchair, Caravan,
  ShieldCheck, Wrench, Computer, Router, Scan,
  Users, TentTree, Table, Utensils,
  BatteryCharging, Thermometer, Droplets, AirVent, Sun
} from 'lucide-react';
import { Heading2, Heading3, RichParagraph, ImageWithSkeleton, CustomLink, SpanTag } from '../../Common/Common';

const sections = [
  {
    title: "True Custom Builds",
    intro: "Big Bear Vans is a fully custom engineering company where we create any configuration and style you want. Instead of pre-built layouts and generic templates, we customize your entire campervan from scratch. Here's what you can choose:",
    features: [
      { text: "<strong>Ceiling, walls, and flooring kits</strong> in different colours and textures.", icon: <Palette size={18} /> },
      { text: "Space-saving <strong>elevator bed</strong> front or rear.", icon: <BedDouble size={18} /> },
      { text: "Kitchen with different <strong>customized cabinets and countertops.</strong>", icon: <CookingPot size={18} /> },
      { text: "Lightweight <strong>Aluminum bathrooms</strong> in different sizes.", icon: <ShowerHead size={18} /> },
      { text: "<strong>Swivel seats</strong> or <strong>extendable benches.</strong>", icon: <Armchair size={18} /> },
      { text: "<strong>Exterior upgrades</strong> like suspension, wheels, tires, awning, storage boxes, etc.", icon: <Caravan size={18} /> },
    ],
    outro: "We're small, but high-tech. That's why we can customize layouts and features other shops won't even touch.",
    images: ["/images2/wcu1.webp", "/images2/wcu2.webp"],
    isReverse: false,
  },
  {
    title: "Post Build Support",
    intro: "From first call to last key handover, we guide and support you at every step. Unlike other RV dealers, Big Bear Vans provides great after-sales support to its customers. We offer:",
    features: [
      { text: "<strong>1-year or 3-year extended warranty</strong> on our craftsmanship.", icon: <ShieldCheck size={18} /> },
      { text: "<strong>Servicing and installing upgrades</strong> in our workshop.", icon: <Wrench size={18} /> },
    ],
    images: ["/images2/wcu3.webp", "/images2/wcu4.webp"],
    isReverse: true,
  },
  {
    title: "CNC Technology",
    intro: "Our Big Bear workshop is equipped with the latest industrial CNC technology. At our workshop:",
    features: [
      { text: "A team of 5+ designers uses <strong>CAD/CAM software</strong> to model every part of your van.", icon: <Computer size={18} /> },
      { text: "Components are cut by our two <strong>CNC router machines</strong> (metal & plywood).", icon: <Router size={18} /> },
      { text: "We have several <strong>3D scanners</strong> for precise measurements.", icon: <Scan size={18} /> },
    ],
    outro: "The result? A fully custom campervan, exactly the way you want.",
    images: ["/images2/cnc1.webp", "/images2/cnc2.webp"],
    isReverse: false,
  },
  {
    title: "Family-friendly Layouts",
    intro: (<span>While others are built for couples, ours are for the whole crew. We're proud to have built several
      <CustomLink href={"/van-layouts?category=Layouts+for+Families+%283–9+People%29"} text={" family-friendly campervans "} /> In our family layouts, you can:</span>),
    features: [
      { text: "Sit, sleep, and travel safely with <strong>4 or even 9 people.</strong>", icon: <Users size={18} /> },
      { text: "Enjoy outdoors in the rear <strong>foldable patio and roof deck.</strong>", icon: <TentTree size={18} /> },
      { text: "Have a <strong>dinette area</strong> for meals, games, and homework.", icon: <Table size={18} /> },
      { text: "Have a fully functional <strong>kitchen and a lightweight bathroom.</strong>", icon: <Utensils size={18} /> },
    ],
    images: ["/images/w7.webp", "/images/w8.webp"],
    isReverse: true,
  },
  {
    title: "Off-grid Ready",
    intro: (<span>Every Big Bear van comes with a professional-grade <CustomLink href={"/van-options/system-options"} text={"electrical and water system "} />
      so you can go anywhere to stay without a second thought. We install:</span>),
    features: [
      { text: "<strong>Rapid Alternator Charging:</strong> Up to <strong>250A</strong> with a 2nd alternator.", icon: <BatteryCharging size={18} /> },
      { text: "Self-heating <strong>lithium batteries (15,600Wh)</strong>.", icon: <Thermometer size={18} /> },
      { text: "Integrated <strong>grey and fresh water tanks.</strong>", icon: <Droplets size={18} /> },
      { text: "A <strong>12V slim A/C unit</strong> that runs for up to <strong>20 hours</strong>.", icon: <AirVent size={18} /> },
      { text: "<strong>Solar panels</strong> on the roof and hood.", icon: <Sun size={18} /> },
    ],
    outro: "Off-grid freedom isn't an upgrade in our converted vans, it's a standard.",
    images: ["/images2/wcu6.webp", "/images2/wcu5.webp"],
    isReverse: false,
  },
];

export default function WhyChoose() {
  const [expanded, setExpanded] = useState({});
  const toggle = (i) => setExpanded(prev => ({ ...prev, [i]: !prev[i] }));

  return (
    <section className="bg-primary overflow-hidden antialiased">

      {/* ── HEADER ── */}
      <div className="relative border-b border-white/10 overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl py-24 md:py-32 relative z-10">

          <div className="flex items-center gap-3 mb-8">
            <SpanTag text={"Our Advantage"} className="text-hover"/>
          </div>

          <Heading2
            textColor="text-secondary"
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-8"
          >
            Why Choose<br />
            <span className="text-hover">Big Bear Vans?</span>
          </Heading2>

          <RichParagraph className="text-secondary/50 text-sm md:text-base leading-relaxed max-w-lg">
            Based in Big Bear, California, our team of expert builders and engineers
            deliver precision-crafted homes on wheels that stand in a class of their own.
          </RichParagraph>
        </div>

        {/* Ghost brand mark */}
        <div className="absolute right-0 inset-y-0 flex items-center pointer-events-none select-none overflow-hidden">
          <span className="text-[260px] font-black text-white/[0.025] leading-none pr-6">BBV</span>
        </div>
      </div>

      {/* ── FEATURE SECTIONS ── */}
      {sections.map((section, i) => {
        const isOpen = !!expanded[i];
        const num = String(i + 1).padStart(2, '0');

        return (
          <div key={i} className="relative border-b border-white/10 overflow-hidden">

            {/* Ghost section number */}
            <div className={`absolute inset-y-0 ${section.isReverse ? 'left-0' : 'right-0'} flex items-center pointer-events-none select-none overflow-hidden`}>
              <span className="text-[200px] font-black text-white/[0.03] leading-none px-4">{num}</span>
            </div>

            <div className="container mx-auto px-6 max-w-7xl py-20 md:py-28 relative z-10">
              <div className={`flex flex-col lg:flex-row items-center gap-12 xl:gap-20 ${section.isReverse ? 'lg:flex-row-reverse' : ''}`}>

                {/* ── IMAGE SIDE ── */}
                <div className="w-full lg:w-[55%] relative pb-8 lg:pb-0">

                  {/* Primary image */}
                  <div className="relative aspect-[8/5] rounded-lg overflow-hidden ring-1 ring-white/10 shadow-2xl">
                    <ImageWithSkeleton src={section.images[0]} alt={section.title} zoom />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Floating secondary — orange glow frame */}
                  <div className={`
                    absolute bottom-0 z-30
                    ${section.isReverse ? '-left-4 md:-left-8' : '-right-4 md:-right-8'}
                    w-36 h-28 md:w-52 md:h-40
                    rounded-lg overflow-hidden
                    ring-2 ring-hover/40
                    shadow-[0_4px_32px_rgba(237,152,95,0.25)]
                  `}>
                    <ImageWithSkeleton src={section.images[1]} alt="Detail" zoom />
                  </div>
                </div>

                {/* ── CONTENT SIDE ── */}
                <div className="w-full lg:w-[45%] flex flex-col gap-5">

                  {/* Number badge */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-hover bg-hover/15 border border-hover/20 rounded-lg px-3 py-1.5 uppercase tracking-[0.15em]">
                      {num}
                    </span>
                    <span className="text-xs font-bold text-white/30 uppercase tracking-widest">
                      / {sections.length} Features
                    </span>
                  </div>

                  {/* Title */}
                  <Heading3
                    textColor="text-secondary"
                  >
                    {section.title}
                  </Heading3>

                  {/* Expandable body */}
                  <div className={`relative overflow-hidden transition-all duration-500 ${!isOpen ? 'max-h-[320px]' : 'max-h-[2000px]'}`}>

                    <RichParagraph className="!text-secondary/55 !text-sm leading-relaxed mb-5">
                      {section.intro}
                    </RichParagraph>

                    <div className="space-y-2">
                      {section.features.map((f, fi) => (
                        <div
                          key={fi}
                          className="group flex items-start gap-4 p-4 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-hover/30 transition-all"
                        >
                          <span className="flex-shrink-0 p-2 rounded-lg bg-hover/20 text-hover group-hover:bg-hover group-hover:text-white transition-all mt-0.5">
                            {f.icon}
                          </span>
                          <RichParagraph html={f.text} className="!text-secondary/60 !text-sm leading-relaxed" />
                        </div>
                      ))}
                    </div>

                    {section.outro && (
                      <div className="mt-5 p-5 rounded-lg bg-hover/[0.07] border-l-2 border-hover">
                        <RichParagraph html={section.outro} className="!text-secondary/65 !text-sm italic" />
                      </div>
                    )}

                    {!isOpen && (
                      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary to-transparent pointer-events-none" />
                    )}
                  </div>

                  {/* Expand toggle */}
                  <button
                    onClick={() => toggle(i)}
                    className="group self-start flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-hover hover:text-secondary transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg border border-hover/40 flex items-center justify-center group-hover:bg-hover group-hover:border-hover transition-all">
                      {isOpen
                        ? <ChevronUp size={13} className="group-hover:text-white transition-colors" />
                        : <ChevronDown size={13} className="group-hover:text-white transition-colors" />
                      }
                    </span>
                    {isOpen ? 'Show Less' : 'Explore Details'}
                  </button>

                </div>
              </div>
            </div>
          </div>
        );
      })}

    </section>
  );
}
