"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Palette,
  BedDouble,
  CookingPot,
  ShowerHead,
  Armchair,
  Caravan,
  ShieldCheck,
  Wrench,
  Computer,
  Router,
  Scan,
  Users,
  TentTree,
  Table,
  Utensils,
  BatteryCharging,
  Thermometer,
  Droplets,
  AirVent,
  Sun,
  Plus
} from 'lucide-react';
import { Heading2, RichParagraph, Heading3, SecondaryButton, ImageWithSkeleton, CustomLink } from '../../Common/Common'


const sections = [
  {
    title: "True Custom Builds",
    intro: "Big Bear Vans is a fully custom engineering company where we create any configuration and style you want. Instead of pre-built layouts and generic templates, we customize your entire campervan from scratch. Here’s what you can choose:",
    features: [
      { text: "<strong>Ceiling, walls, and flooring kits</strong> in different colours and textures.", icon: <Palette size={18} /> },
      { text: "Space-saving <strong>elevator bed</strong> front or rear.", icon: <BedDouble size={18} /> },
      { text: "Kitchen with different <strong>customized cabinets and countertops.</strong>", icon: <CookingPot size={18} /> },
      { text: "Lightweight <strong>Aluminum bathrooms</strong> in different sizes.", icon: <ShowerHead size={18} /> },
      { text: "<strong>Swivel seats</strong> or <strong>extendable benches.</strong>", icon: <Armchair size={18} /> },
      { text: "<strong>Exterior upgrades</strong> like suspension, wheels, tires, awning, storage boxes, etc.", icon: <Caravan size={18} /> },
    ],
    outro: "We’re small, but high-tech. That’s why we can customize layouts and features other shops won’t even touch.",
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
    intro: (<span>While others are built for couples, ours are for the whole crew. We’re proud to have built several
      <CustomLink href={"/van-layouts?category=Layouts+for+Families+%283–9+People%29"} text={" family-friendly campervans "} />  In our family layouts, you can:</span>),
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
    intro: (<span>Every Big Bear van comes with a professional-grade //<CustomLink href={"/van-options/system-options"} text={"electrical and water system "} />
      so you can go anywhere to stay without a second thought. We install:</span>),
    features: [
      { text: "<strong>Rapid Alternator Charging:</strong> Up to <strong>250A</strong> with a 2nd alternator.", icon: <BatteryCharging size={18} /> },
      { text: "Self-heating <strong>lithium batteries (15,600Wh)</strong>.", icon: <Thermometer size={18} /> },
      { text: "Integrated <strong>grey and fresh water tanks.</strong>", icon: <Droplets size={18} /> },
      { text: "A <strong>12V slim A/C unit</strong> that runs for up to <strong>20 hours</strong>.", icon: <AirVent size={18} /> },
      { text: "<strong>Solar panels</strong> on the roof and hood.", icon: <Sun size={18} /> },
    ],
    outro: "Off-grid freedom isn’t an upgrade in our converted vans, it’s a standard.",
    images: ["/images2/wcu6.webp", "/images2/wcu5.webp"],
    isReverse: false,
  },
];
const WhyChoose = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (index) => {
    setExpandedSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="bg-white py-20 md:py-32 overflow-hidden antialiased">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* --- Section Header --- */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32">
          <RichParagraph className="!text-hover font-bold uppercase !text-xs mb-4 block">Our Advantage</RichParagraph>
          <Heading2 text={"Why Choose Big Bear Vans?"} />
          <div className="w-20 h-1.5 bg-hover mx-auto rounded-lg my-6"></div>
          <RichParagraph >
            Based in Big Bear, California, our team of expert builders and engineers
            deliver precision-crafted homes on wheels that stand in a class of their own.
          </RichParagraph>
        </div>

        {/* --- Content Sections --- */}
        <div className="space-y-32">
          {sections.map((section, index) => {
            const isExpanded = !!expandedSections[index];

            return (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-[var(--gap-xl)] xl:gap-[var(--gap-2xl)] ${section.isReverse ? 'lg:flex-row-reverse' : ''}`}>

                {/* Image Composition - Parent Container */}
                <div className="w-full lg:w-1/2 relative group mb-12 lg:mb-0"> {/* Mobile pe thoda margin diya niche */}

                  {/* Primary Image Container */}
                  <div
                    className={`
      relative aspect-[8/5] rounded-lg overflow-hidden shadow-2xl
      transition-all duration-500 ease-in-out
      z-20
      hover:z-50 hover:scale-[1.02]
    `}
                  >
                    <ImageWithSkeleton
                      src={section.images[0]}
                      alt={section.title}
                      zoom
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent pointer-events-none"></div>  </div>

                  {/* Floating Secondary Image */}
                  <div
                    className={`
      absolute -bottom-6 md:-bottom-10
      block
      w-40 h-32 sm:hidden md:block md:w-64 md:h-48
      rounded-lg overflow-hidden
      shadow-2xl transition-all duration-500 ease-in-out
      cursor-pointer
      z-30
      /* Mobile par thoda chota rakha hai (w-40 h-32) aur bade screens par w-64 h-48 */

      ${section.isReverse ? '-left-4 md:-left-10' : '-right-4 md:-right-10'}
    `}
                  >
                    <ImageWithSkeleton
                      src={section.images[1]}
                      alt="Detail view"
                      zoom
                    />
                  </div>
                </div>
                {/* Text Content */}
                <div className="w-full lg:w-1/2 space-y-8">
                  <div className="inline-flex items-center gap-2 !text-hover !text-xs font-bold uppercase ">
                    <Plus size={14} />
                    Feature {index + 1}
                  </div>
                  <Heading3 text={section.title} />

                  <div className="space-y-6">
                    <div className={`transition-all duration-500 overflow-hidden relative ${!isExpanded ? 'max-h-[350px]' : 'max-h-[2000px]'}`}>
                      <RichParagraph className=" mb-6">
                        {section.intro}
                      </RichParagraph>

                      <div className="grid grid-cols-1 gap-4">
                        {section.features.map((feature, fIndex) => (
                          <div key={fIndex} className="flex items-start gap-4 p-5 bg-secondary rounded-lg border border-primary/5 transition-colors hover:bg-white hover:border-hover/30 group">
                            <div className="p-2.5 rounded-lg bg-white shadow-sm !text-hover group-hover:bg-hover group-hover:text-white transition-colors">
                              {feature.icon}
                            </div>
                            <div className="text-sm pt-1">
                              <RichParagraph html={feature.text} />
                            </div>
                          </div>
                        ))}
                      </div>

                      {section.outro && (
                        <div className="mt-8 p-6 bg-secondary rounded-lg border-l-4 border-hover italic">
                          <RichParagraph html={section.outro} className="" />
                        </div>
                      )}

                      {!isExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                      )}
                    </div>

                    <button
                      onClick={() => toggleExpand(index)}
                      className="group flex items-center gap-[var(--gap-sm)] text-xs font-bold uppercase tracking-widest !text-hover hover:text-primary transition-colors"
                    >
                      <span className="bg-hover text-secondary p-1 rounded-lg group-hover:bg-primary transition-colors">
                        {isExpanded ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                      </span>
                      {isExpanded ? "Show Less" : "Explore Details"}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* --- Global CTA --- */}
        <div className="mt-32 text-center bg-primary p-12 md:p-20 rounded-lg shadow-2xl relative overflow-hidden group">
          <Heading3 text="Uncompromising Quality. Infinite Possibilities." className="text-secondary mb-4" />
          <RichParagraph className="mb-10 max-w-xl mx-auto text-secondary ">Ready to build a van that's as unique as your journey? Let's talk engineering.</RichParagraph>
          <SecondaryButton label={"Request a Custom Build"} link={"/inquiry"} />
        </div>

      </div>
    </section>
  );
};

export default WhyChoose;