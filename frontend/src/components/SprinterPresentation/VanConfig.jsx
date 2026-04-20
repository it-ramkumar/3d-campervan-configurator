"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ImageWithSkeleton } from "../Common/Common";
gsap.registerPlugin(ScrollTrigger);
import { RichParagraph } from "../Common/Common";
import { Heading2, Heading3 } from "../Common/Common";

// 1. Custom Dropdown Component to fix width issues
const CustomSelect = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.id === value);

  return (
    <div className="relative">
      <label className="text-xs font-bold text-gray-600 mb-1 block uppercase tracking-wide">
        {label}
      </label>

      {/* The Selection Box */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full border border-gray-300 rounded-lg py-3 px-4 text-left text-sm focus:outline-none transition-all duration-200 flex items-center justify-between ${
          isOpen ? "ring-2 ring-[#364153]/20 border-[#364153]" : "bg-white"
        }`}
      >
        <span
          className={`truncate ${!value ? "text-gray-500" : "text-gray-900 font-bold"}`}
        >
          {selectedOption ? selectedOption.shortLabel : placeholder}
        </span>
        <span
          className={`text-gray-400 text-xs ml-2 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          ▼
        </span>
      </button>

      {/* The Dropdown List (Rendered as a Div, not a native Select) */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-60 opacity-100 mt-2 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-50 rounded-lg border border-gray-200 shadow-inner">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 text-sm border-b border-gray-200 last:border-0 transition-colors flex items-center justify-between ${
                value === option.id
                  ? "bg-[#364153] text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="truncate mr-2">{option.shortLabel}</span>
              {value === option.id && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function VanConfig() {
  const containerRef = useRef(null);
  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [selections, setSelections] = useState({
    wheelbase: null,
    roof: null,
    type: null,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".anim-content", {
        y: 80,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // DATA OPTIONS
  const wheelbaseOptions = [
    {
      id: "swb",
      title: 'SWB (Short): 144"',
      shortLabel: 'SWB (144")',
      image: "/sprinter/11.webp",
      description: "SWB (Short wheelbase)\n144” wb (19.4 ft long)",
      features: ["Urban", "Easy Park", "Efficient"],
      dimensions: { length: "19.4 ft", cargoVolume: "319 cu ft" },
    },
    {
      id: "lwb",
      title: 'LWB (Long): 170"',
      shortLabel: 'LWB (170")',
      image: "/sprinter/11.webp",
      description: "LWB (Long wheelbase)\n170” wb (22.5 ft long)",
      features: ["Balanced", "Family", "Spacious"],
      dimensions: { length: "22.5 ft", cargoVolume: "489 cu ft" },
    },
    {
      id: "elwb",
      // MODIFIED TITLE: Reduced font size for better fit
      title: 'ELWB (Extra-Long): 170" Ext.',
      shortLabel: 'ELWB (170" Ext)',
      image: "/sprinter/11.webp",
      description:
        "ELWB (Extra Long Wheelbase) 170” wb with a longer rear tail part (24.2 ft long)",
      features: ["Max Space", "Full Build", "Large"],
      dimensions: { length: "24.2 ft", cargoVolume: "587 cu ft" },
    },
  ];

  const roofHeightOptions = [
    {
      id: "h1",
      title: "H1 (Standard)",
      shortLabel: "H1 (Standard)",
      image: "/sprinter/Untitled design (17) 1.webp",
      description: "68.5” interior - Limited standing room",
      features: ["Budget", "Garage", "MPG"],
      dimensions: { interiorHeight: "68.5 inches" },
    },
    {
      id: "h2",
      title: "H2 (High)",
      shortLabel: "H2 (High Roof)",
      image: "/sprinter/Untitled design (18) 1.webp",
      description: "79.9” interior - Comfortable for most users",
      features: ["Comfort", "Popular", "Balance"],
      dimensions: { interiorHeight: "79.9 inches" },
    },
    {
      id: "h3",
      title: "H3 (Super High)",
      shortLabel: "H3 (Super High)",
      image: "/sprinter/image 5.webp",
      description: '89" Interior - Ample headroom for tall builds',
      features: ["Tall", "Luxury", "Max Room"],
      dimensions: { interiorHeight: "89 inches" },
    },
  ];

  const vanTypes = [
    {
      id: "cargo",
      image: "/sprinter/image 13.webp",
      title: "Cargo Van",
      shortLabel: "Cargo Van",
      description:
        "The Cargo van prioritizes maximum cargo capacity with only a few seats.",
      features: ["Max Cargo", "Few Seats", "Custom"],
      dimensions: { seating: "2-3 seats" },
    },
    {
      id: "crew",
      image: "/sprinter/image 14.webp",
      title: "Crew Van",
      shortLabel: "Crew Van",
      description:
        "The Crew Van strikes a balance, offering more passenger seating and slightly less cargo space.",
      features: ["More Seats", "Ready", "Versatile"],
      dimensions: { seating: "5+ seats" },
    },
  ];

  const calculateSize = () => {
    if (!selections.wheelbase || !selections.roof || !selections.type)
      return null;
    const wheelbase = wheelbaseOptions.find(
      (w) => w.id === selections.wheelbase,
    );
    const roof = roofHeightOptions.find((r) => r.id === selections.roof);
    const type = vanTypes.find((t) => t.id === selections.type);
    return {
      totalLength: wheelbase.dimensions.length,
      interiorHeight: roof.dimensions.interiorHeight,
      cargoVolume: wheelbase.dimensions.cargoVolume,
      seating: type.dimensions.seating,
      description: `${wheelbase.title} - ${roof.title}`,
    };
  };

  const result = calculateSize();

  const SizeCalculator = () => {
    return (
      <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50">
        {/* Calculator Button */}
        <button
          onClick={() => setCalculatorOpen(!calculatorOpen)}
          className="bg-gradient-to-br from-[#364153] to-gray-800 text-[var(--color-secondary)] p-3 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm flex items-center justify-center w-12 h-12 md:w-14 md:h-14"
        >
          <span className="text-lg md:text-xl">📐</span>
        </button>

        {/* Calculator Panel */}
        {calculatorOpen && (
          // Uses strict width constraints to prevent overflow
          <div className="absolute bottom-16 left-0 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border-2 border-gray-200 p-5 w-[85vw] max-w-[300px] max-h-[75vh] overflow-y-auto animate-in slide-in-from-bottom-4 fade-in duration-300 scrollbar-hide">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-3">
              <h3 className="text-base font-black text-gray-800 flex items-center">
                <span className="w-2 h-2 bg-[#364153] rounded-full mr-2"></span>
                Van Calculator
              </h3>
              <button
                onClick={() => setCalculatorOpen(false)}
                className="text-gray-400 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
              >
                ×
              </button>
            </div>

            <div className="space-y-2">
              {/* Custom Wheelbase Dropdown */}
              <CustomSelect
                label="Wheelbase"
                placeholder="Select wheelbase..."
                options={wheelbaseOptions}
                value={selections.wheelbase}
                onChange={(val) =>
                  setSelections((prev) => ({ ...prev, wheelbase: val }))
                }
              />

              {/* Custom Roof Dropdown */}
              <CustomSelect
                label="Roof Height"
                placeholder="Select roof..."
                options={roofHeightOptions}
                value={selections.roof}
                onChange={(val) =>
                  setSelections((prev) => ({ ...prev, roof: val }))
                }
              />

              {/* Custom Type Dropdown */}
              <CustomSelect
                label="Van Type"
                placeholder="Select type..."
                options={vanTypes}
                value={selections.type}
                onChange={(val) =>
                  setSelections((prev) => ({ ...prev, type: val }))
                }
              />

              {/* Results Card */}
              {result && (
                <div className="bg-[#364153] rounded-xl p-4 mt-4 animate-in zoom-in duration-300 text-white shadow-lg">
                  <h4 className="font-bold text-[var(--color-secondary)] mb-3 text-center text-xs tracking-widest">
                    DIMENSIONS
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                      <span className="text-gray-300">Length</span>
                      <span className="font-bold">{result.totalLength}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                      <span className="text-gray-300">Height</span>
                      <span className="font-bold">{result.interiorHeight}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/10 pb-1">
                      <span className="text-gray-300">Volume</span>
                      <span className="font-bold">{result.cargoVolume}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Seats</span>
                      <span className="font-bold">{result.seating}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() =>
                  setSelections({ wheelbase: null, roof: null, type: null })
                }
                className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-600 py-3 rounded-lg font-bold transition-all duration-300 text-xs uppercase tracking-wide"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <main
      ref={containerRef}
      className="font-serif bg-white min-h-screen w-full overflow-x-hidden"
    >
      {/* Tighter max width: Max-w reduced to 900px */}
      <div className="max-w-[900px] mx-auto px-4 md:px-5 pt-12 pb-6">
        {/* Enhanced Hero Section */}
        <section className="text-center max-w-[800px] mx-auto mb-8 md:mb-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50/80 to-gray-100/80 rounded-xl -z-10"></div>
            <div className="absolute -inset-3 bg-white/50 rounded-xl blur-lg -z-20 hidden md:block"></div>

            {/* Adjusted max-width for content to max-w-3xl (increased width) */}
            <div className="space-y-3 md:space-y-4 relative z-10 py-7 md:py-8 px-3 max-w-3xl mx-auto">
              <div className="anim-content">
                {/* <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[#ED985F] to-[#f4a261] mx-auto mb-3 md:mb-4 rounded-full"></div> */}
                {/* Increased text size on desktop (lg:text-xl) and wider content area */}
                <RichParagraph>
                  The Mercedes-Benz Sprinter has a versatile family of vehicles,
                  each engineered to excel in a specific role. With multiple
                  models, configurations, and capabilities, the selection can
                  seem difficult.
                </RichParagraph>
              </div>

              <div className="anim-content">
                {/* Increased text size on desktop (lg:text-xl) */}
                <RichParagraph>
                  In this guide, we'll simplify the options so you can choose
                  the right Sprinter van for custom conversion.
                </RichParagraph>
              </div>
            </div>
          </div>
        </section>

        {/* Configuration Header */}
        <section className="text-center mb-8 md:mb-10">
          <div className="inline-block px-4">
            {/* MODIFIED: Reduced font size to text-3xl and removed whitespace-nowrap for mobile fix */}
            <Heading2 text={"Van Configuration & Model Selection"} />
          </div>
        </section>

        {/* Wheelbase Section */}
        {/* Reduced margin-bottom: mb-10 md:mb-14 */}
        <section className="mb-10 md:mb-14">
          {/* Reduced margin-bottom: mb-6 md:mb-8 */}
          <div className="text-center mb-6 md:mb-8">
            {/* Smaller text size: md:text-[32px] */}
            <Heading3 text={"Wheelbase Options"} />
            <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          {/* Wheelbase Cards Grid */}
          {/* MODIFIED: Reverted to grid-cols-1 on mobile, added max-w-xs to card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {wheelbaseOptions.map((option) => (
              <div
                key={option.id}
                // MODIFIED: Apply max-w-xs and center on mobile, revert on desktop
                className="anim-content group max-w-xs mx-auto w-full lg:max-w-none lg:mx-0"
              >
                {/* Reduced border radius and shadow */}
                <div className="relative bg-white rounded-lg shadow-md border border-gray-300 transform transition-all duration-300 overflow-hidden group-hover:scale-100 lg:group-hover:scale-[1.01] group-hover:shadow-lg h-full flex flex-col">
                  {/* Reduced padding and text size: p-3 md:p-4 */}
                  <div className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] text-white p-3 md:p-4 h-[60px] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    {/* MODIFIED: Reduced font size from md:text-base to md:text-sm */}
                    <Heading3
                      text={option.title}
                      className="text-secondary! !text-base line-clamp-2"
                    />
                  </div>
                  {/* Reduced padding and image height: h-28 md:h-32 */}
                  <div className="p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100  flex items-center justify-center">
                    <div className="relative w-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-md"></div>
                      <ImageWithSkeleton
                        src={option.image}
                        alt={option.title}
                        className="w-full h-full md:h-32 object-contain transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  {/* Reduced padding and text size: p-3 md:p-4 */}
                  <div className="bg-[var(--color-primary)] text-white h-[80px] flex items-center justify-center text-center px-4">
                    {/* MODIFIED: Reduced font size from md:text-sm to md:text-xs to ensure the long text breaks into 2 lines on desktop */}
                    <RichParagraph className="text-secondary! text-center !text-sm">
                      {option.description}
                    </RichParagraph>
                  </div>
                  {/* Reduced padding and feature badge size: p-2 md:p-3 */}
                  <div className="bg-gray-800 text-white p-2 md:p-3">
                    {/* Tiny feature pill size */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {option.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-[#364153] px-2 py-0.5 rounded-full text-[9px] font-black border border-gray-600 shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Roof Height Section */}
        {/* Reduced margin-bottom: mb-10 md:mb-14 */}
        <section className="mb-10 md:mb-14">
          {/* Reduced margin-bottom: mb-6 md:mb-8 */}
          <div className="text-center mb-6 md:mb-8">
            {/* Smaller text size: md:text-[32px] */}
            <Heading3 text={"Roof Height Options"} />
            {/* <h2 className="anim-content text-2xl md:text-[32px] font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-[#364153] bg-clip-text text-transparent">
              Roof Height Options
            </h2> */}
            <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          {/* Roof Cards Grid */}
          {/* MODIFIED: Reverted to grid-cols-1 on mobile, added max-w-xs to card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
            {roofHeightOptions.map((option) => (
              <div
                key={option.id}
                // MODIFIED: Apply max-w-xs and center on mobile, revert on desktop
                className="anim-content group max-w-xs mx-auto w-full lg:max-w-none lg:mx-0"
              >
                {/* Reduced border radius and shadow */}
                <div className="relative bg-white rounded-lg shadow-md border border-gray-300 transform transition-all duration-300 overflow-hidden group-hover:scale-100 lg:group-hover:scale-[1.01] group-hover:shadow-lg h-full flex flex-col">
                  {/* Reduced padding and text size: p-3 md:p-4 */}
                  <div className="bg-gradient-to-br from-[var(--color-primary)]  to-[var(--color-primary)] text-white p-3 md:p-4 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <Heading3
                      text={option.title}
                      className="text-secondary! !text-base"
                    />
                    {/* <h3 className="text-sm md:text-base font-black tracking-wide relative z-10">{option.title}</h3> */}
                  </div>
                  {/* Reduced padding and image height: h-28 md:h-32 */}
                  <div className="p-3 md:p-4 bg-gradient-to-br from-gray-50 to-gray-100 flex-grow flex items-center justify-center">
                    <div className="relative w-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-md"></div>
                      <ImageWithSkeleton
                        src={option.image}
                        alt={option.title}
                        className="w-full h-28 md:h-32 object-contain transform transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  </div>
                  {/* Reduced padding and text size: p-3 md:p-4 */}
                  <div className="bg-[var(--color-primary)] text-white p-3 md:p-4">
                    <RichParagraph className="text-secondary! !text-sm">
                      {option.description}
                    </RichParagraph>
                    {/* <p className="text-xs md:text-sm font-medium leading-tight text-center whitespace-pre-line">{option.description}</p> */}
                  </div>
                  {/* Reduced padding and feature badge size: p-2 md:p-3 */}
                  <div className="bg-gray-800 text-white p-2 md:p-3">
                    {/* Tiny feature pill size */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {option.features.map((feature, index) => (
                        <span
                          key={index}
                          className="bg-[#364153] px-2 py-0.5 rounded-full text-[9px] font-black border border-gray-600 shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cargo vs Crew Section */}
        <section className="mb-4">
          {/* Reduced margin-bottom: mb-6 md:mb-8 */}
          <div className="text-center mb-6 md:mb-8">
            {/* Fix: Ensuring the content is fully contained within the h2 tag */}
            <Heading3 text={"Cargo Vs Crew Vans"} />
            {/* <h2 className="anim-content text-3xl md:text-[36px] font-black text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-[#364153] bg-clip-text text-transparent">
              Cargo Vs Crew Vans
            </h2> */}
            <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          {/* Cargo/Crew Cards Grid */}
          {/* MODIFIED: Reverted to grid-cols-1 on mobile, added max-w-xs to card */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            {vanTypes.map((van) => (
              <div
                key={van.id}
                // MODIFIED: Apply max-w-xs and center on mobile, revert on desktop
                className="anim-content group max-w-xs mx-auto w-full lg:max-w-none lg:mx-0"
              >
                {/* Reduced border radius and hover scale */}
                <div className="relative bg-gradient-to-br from-gray-900 to-[#364153] rounded-lg shadow-md border-2 border-gray-800 transform transition-all duration-300 overflow-hidden group-hover:scale-100 lg:group-hover:scale-[1.01] group-hover:shadow-lg">
                  {/* Reduced height: h-52 md:h-64 */}
                  <div className="relative h-52 md:h-64 overflow-hidden">
                    <ImageWithSkeleton
                      src={van.image}
                      alt={van.title}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                    {/* Reduced padding and text size */}
                    <div className="absolute top-3 left-3 md:top-4 md:left-4">
                      <Heading3 text={van.title} className="text-secondary! " />
                      {/* <h3 className="text-white text-xl md:text-2xl font-black">{van.title}</h3> */}
                    </div>
                  </div>
                  {/* Reduced padding and text size: p-3 md:p-4 */}
                  <div className="p-3 md:p-4 bg-gray-900">
                    <RichParagraph className="text-secondary! mb-4 leading-relaxed ">
                      {van.description}
                    </RichParagraph>
                    {/* <p className="text-sm md:text-base leading-[1.4] text-white font-medium mb-3">{van.description}</p> */}
                    {/* Reduced feature pill size */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {van.features.map((feature, index) => (
                        <span
                          key={index}
                          className=" bg-white/20 backdrop-blur-sm text-secondary px-2 py-0.5 rounded-full text-[9px] font-black border border-white/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Size Calculator */}
        <SizeCalculator />
      </div>
    </main>
  );
}
