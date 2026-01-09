"use client";
import React, { useState, useRef } from "react";
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
  Wind,
  AirVent,
  Sun,
} from 'lucide-react';
import BlackButton from "../../Common/Button/BlackButton";
import ImageWithSkeleton from "../../Common/ImageWithSkeleton/ImageWithSkeleton";
import RichParagraph from "../../Common/Paragraph/RichParagraph";
import Heading2 from "../../Common/Headings/Heading2";
import Heading3 from "../../Common/Headings/Heading3";

// --- Data with Enhanced Text and Icons ---
const sections = [
  {
    title: "True Custom Builds",
    intro: "Big Bear Vans is a fully custom engineering company where we create any configuration and style you want. Instead of pre-built layouts and generic templates, we customize your entire campervan from scratch. Here’s what you can choose:",
    features: [
      { text: "<strong>Ceiling, walls, and flooring kits</strong> in different colours and textures.", icon: <Palette size={20} /> },
      { text: "Space-saving <strong>elevator bed</strong> front or rear.", icon: <BedDouble size={20} /> },
      { text: "Kitchen with different <strong>customized cabinets and countertops.</strong>", icon: <CookingPot size={20} /> },
      { text: "Lightweight <strong>Aluminum bathrooms</strong> in different sizes.", icon: <ShowerHead size={20} /> },
      { text: "<strong>Swivel seats</strong> or <strong>extendable benches.</strong>", icon: <Armchair size={20} /> },
      { text: "<strong>Exterior upgrades</strong> like suspension, wheels, tires, awning, storage boxes, etc.", icon: <Caravan size={20} /> },
    ],
    outro: "We’re small, but high-tech. That’s why we can customize layouts and features other shops won’t even touch.",
    images: [
      { src: "/images/w1.webp", alt: "Campervan interior under construction" },
      { src: "/images/w2.webp", alt: "Campervan kitchen and swivel seats" },
    ],
    isReverse: false,
    initialHeight: '200px'
  },
  {
    title: "Post Build Support",
    intro: "From first call to last key handover, we guide and support you at every step. Unlike other RV dealers, Big Bear Vans provides great after-sales support to its customers. We offer:",
    features: [
      { text: "<strong>1-year or 3-year extended warranty</strong> on our craftsmanship.", icon: <ShieldCheck size={20} /> },
      { text: "<strong>Servicing and installing upgrades</strong> in our workshop.", icon: <Wrench size={20} /> },
    ],
    images: [
      { src: "/images/w3.webp", alt: "Campervan wheel and tire installation" },
      { src: "/images/w4.webp", alt: "Campervan exterior under construction" },
    ],
    isReverse: true,
    initialHeight: '170px'
  },
  {
    title: "CNC Technology",
    intro: "Our Big Bear workshop is equipped with the latest industrial CNC technology. At our workshop:",
    features: [
      { text: "A team of 5+ designers uses <strong>CAD/CAM software</strong> to model every part of your van.", icon: <Computer size={20} /> },
      { text: "Components are cut by our two <strong>CNC router machines</strong> (metal & plywood).", icon: <Router size={20} /> },
      { text: "We have several <strong>3D scanners</strong> for precise measurements.", icon: <Scan size={20} /> },
    ],
    outro: "The result? A fully custom campervan, exactly the way you want.",
    images: [
      { src: "/images/w5.webp", alt: "CNC machine cutting wood" },
      { src: "/images/w6.webp", alt: "Industrial CNC machine" },
    ],
    isReverse: false,
    initialHeight: '150px'
  },
  {
    title: "Family-friendly Layouts",
    intro: "While others are built for couples, ours are for the whole crew. We’re proud to have built several family-friendly campervans. In our family layouts, you can:",
    features: [
      { text: "Sit, sleep, and travel safely with <strong>4 or even 9 people.</strong>", icon: <Users size={20} /> },
      { text: "Enjoy outdoors in the rear <strong>foldable patio and roof deck.</strong>", icon: <TentTree size={20} /> },
      { text: "Have a <strong>dinette area</strong> for meals, games, and homework.", icon: <Table size={20} /> },
      { text: "Have a fully functional <strong>kitchen and a lightweight bathroom.</strong>", icon: <Utensils size={20} /> },
    ],
    images: [
      { src: "/images/w7.webp", alt: "Family-friendly campervan interior" },
      { src: "/images/w8.webp", alt: "Campervan with roof deck and awning" },
    ],
    isReverse: true,
    initialHeight: '170px'
  },
  {
    title: "Off-grid Ready",
    intro: "Every Big Bear van comes with a professional-grade electrical and water system, so you can go anywhere to stay without a second thought. We install:",
    features: [
      { text: "<strong>Rapid Alternator Charging:</strong> A DC-DC charger delivering up to <strong>50A</strong>, and up to <strong>250A</strong> with a 2nd alternator.", icon: <BatteryCharging size={20} /> },
      { text: "Self-heating <strong>lithium batteries (15,600 watt-hours)</strong> for sub-zero temperatures.", icon: <Thermometer size={20} /> },
      { text: "Integrated <strong>grey and fresh water tanks.</strong>", icon: <Droplets size={20} /> },
      { text: "A <strong>diesel combined air and water heater</strong> that saves battery and has excellent insulation.", icon: <Wind size={20} /> },
      { text: "A <strong>12V slim A/C unit</strong> that runs for up to <strong>20 hours</strong> on the batteries.", icon: <AirVent size={20} /> },
      { text: "<strong>Solar panels</strong> on the roof and hood.", icon: <Sun size={20} /> },
    ],
    outro: "Off-grid freedom isn’t an upgrade in our converted vans, it’s a standard.",
    images: [
      { src: "/images/w9.webp", alt: "Solar panels on a campervan roof" },
      { src: "/images/w10.webp", alt: "Interior of an off-grid ready van" },
    ],
    isReverse: false,
    initialHeight: '200px'
  },
];

const WhyChoose = () => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="bg-gray-100 text-blackish py-12 md:mt-24 mt-10 font-serif overflow-hidden">
      <header className=" text-center">
        <Heading2 text={"Why Choose Big Bear Vans?"} />
        <RichParagraph className="text-center mt-4 max-w-4xl mx-auto px-4">At Big Bear Vans, we have a full-fledged team of experienced campervan
          builders and engineers in Big Bear, California. Let us show you what
          nobody else does like we do.</RichParagraph>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8">
        {sections.map((section, index) => {
          const isExpanded = !!expandedSections[index];
          const contentRef = useRef(null);

          return (
            <section
              key={index}
              className={`py-8 flex flex-col md:flex-row items-center gap-10 md:gap-20 ${section.isReverse ? "md:flex-row-reverse" : ""
                }`}
            >
              {/* Text Section */}
              <div className={`md:w-1/2 space-y-4 md:space-y-6 text-center md:text-left ${section.isReverse ? "ml-auto" : ""}`}>
                <Heading3 textColor="black" text={section.title} />
                {/* Content Wrapper for See More/Less */}
                <div className="relative">
                  <div
                    className="transition-all duration-700 ease-in-out overflow-hidden"
                    style={{
                      maxHeight: isExpanded ? `${contentRef.current?.scrollHeight}px` : section.initialHeight,
                    }}
                  >
                    <div ref={contentRef} className="space-y-5">
                      <RichParagraph> {section.intro}</RichParagraph>
                      <div className="space-y-3 text-left">
                        {section.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-4 p-4 bg-slate-50/70 rounded-lg border border-slate-200/80 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
                            <div className="flex-shrink-0 mt-0.5 text-slate-700 bg-slate-200/70 rounded-full p-2">
                              {feature.icon}
                            </div>
                            <RichParagraph html={feature.text} />
                          </div>
                        ))}
                      </div>

                      {section.outro && (
                        <RichParagraph html={section.outro} />


                      )}
                    </div>
                  </div>


                  {/* See More/Less Button */}
                  <div className="">
                    <RichParagraph
                      className="flex items-center gap-2 text-blue-500 my-4 cursor-pointer"

                      onClick={() => toggleExpand(index)}>
                      {isExpanded ? (
                        <>
                         <ChevronUp className="inline w-4" /> Show Less
                        </>
                      ) : (
                        <>
                         <ChevronDown className="inline w-4" /> See More
                        </>
                      )}

                    </RichParagraph>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div
                className={`w-full md:w-1/2 relative flex items-center justify-center md:justify-start min-h-[350px] md:min-h-[450px] ${section.isReverse ? "md:justify-end" : ""}`}
              >
                <div
                  className={`w-11/12 max-w-[400px] h-[300px] md:h-[400px] relative rounded-3xl shadow-lg transform rotate-[-4.68deg] overflow-hidden
                    transition-transform duration-300 hover:scale-105 hover:z-10
                    md:w-[400px]
                    ${section.isReverse ? "md:ml-auto" : "md:mr-auto"} border-4 border-blackish
                  `}
                >
                  <ImageWithSkeleton
                    src={section.images[0].src}
                    alt={section.images[0].alt}
                    className={`rounded-2xl object-cover w-full h-full ${index === 3 ? "scale-x-[-1]" : ""}`}
                  />
                </div>
                <div
                  className={`w-2/3 max-w-[200px] h-[200px] md:max-w-[300px] md:h-[300px] absolute transform rotate-[-4.68deg] border-4 border-white rounded-2xl shadow-xl overflow-hidden
                    transition-transform duration-300 hover:scale-105 hover:z-20
                    ${section.isReverse ? "bottom-[-20px] right-[-20px] md:left-[-20px]" : "bottom-[-20px] right-[-20px] md:right-[-20px]"}
                  `}
                >
                  <ImageWithSkeleton
                    src={section.images[1].src}
                    alt={section.images[1].alt}
                    className="rounded-xl object-cover w-full h-full"
                  />
                </div>
              </div>
            </section>
          );
        })}

        <div className="py-12 flex justify-center">
          <BlackButton label={"Order Custom Build"} link={"/inquiry"} />

        </div>
      </main>
    </div>
  );
};

export default WhyChoose;