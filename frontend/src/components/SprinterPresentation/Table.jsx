"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading2, Heading3, Heading4 } from "../Common/Common";
import { RichParagraph } from "../Common/Common";

gsap.registerPlugin(ScrollTrigger);

export default function Table() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // SCROLL-TRIGGERED ANIMATIONS
      gsap.utils.toArray(".anim-section").forEach((section) => {
        gsap.from(section, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });

      // 2500 - Circular rotating weights
      gsap.to(".weight-2500-left", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".weight-2500-right", {
        rotation: -360,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      // 3500 - Pulsing heavy weights
      gsap.to(".weight-3500-left", {
        scale: 1.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
      });

      gsap.to(".weight-3500-right", {
        scale: 1.3,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.3
      });

      // Dually - Rotating wheels
      gsap.to(".dually-wheel-1", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 2,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".dually-wheel-2", {
        rotation: -360,
        transformOrigin: "center center",
        duration: 2,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".dually-wheel-3", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 1.5,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".dually-wheel-4", {
        rotation: -360,
        transformOrigin: "center center",
        duration: 1.5,
        repeat: -1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden bg-white pt-0 mt-0">

      {/* SECTION 1: Cargo Van vs Crew Van */}
      <section className="anim-section container mx-auto px-4 sm:px-6 pt-6 md:pt-8 mt-0 pb-12 md:pb-16">
        <div className="text-center mb-6 sm:mb-8 pt-4">
          {/* REDUCED DESKTOP FONT SIZE: md:text-3xl (from md:text-5xl) */}
          <Heading3 text={"Cargo Van vs Crew Van"}/>
          {/* // <h2 className="font-serif text-3xl sm:text-4xl md:text-3xl font-black text-gray-900 mb-3 mt-0">
          //   Cargo Van vs Crew Van
          // </h2> */}
          <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-[#364153] overflow-hidden transform hover:shadow-2xl transition-all duration-500">
            {/* Table Header Wrapper */}
            <div className="bg-gradient-to-r from-gray-900 via-[#364153] to-gray-800 p-0.5">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] text-white">
                  <tr>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-4 text-base (from p-6 text-xl) */}
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Feature"} className="!text-[var(--color-secondary)] !text-[18px] !font-bold"/></th>
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Cargo Van"} className="!text-[var(--color-secondary)] !text-[18px] !font-bold"/></th>
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Crew Van"} className="!text-[var(--color-secondary)] !text-[18px] !font-bold"/></th>
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center border-r-2 border-[#364153]">Feature</th> */}
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center border-r-2 border-[#364153]">Cargo Van</th> */}
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center">Crew Van</th> */}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <table className="w-full table-fixed border-collapse">
              <tbody className="text-gray-800">
                {[
                  ["Seating", "1 row (driver + 2 passengers)", "2 rows (up to 5 passengers)"],
                  ["Windows", "Minimal/Aftermarket", "4 solid glass windows (stock)"],
                  ["Interior", "Bare Metal", "Fabric ceiling, subfloor"],
                  ["Flexibility", "Max cargo space", "Removable 3-seat bench"],
                  ["Best For", "Pure Cargo / Conversion", "Hybrid use (cargo + gear)"],
                  ["Cost", "-", "$3000 extra"]
                ].map(([feature, cargo, crew], index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#364153] transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 group ${
                      index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                    }`}
                  >
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 font-bold text-xs md:text-sm text-gray-900 text-center border-r-2 border-[#364153] group-hover:bg-gray-100/80 transition-colors duration-300">
                      {feature}
                    </td>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 text-xs md:text-sm font-medium text-center border-r-2 border-[#364153] group-hover:transform group-hover:scale-[1.02] transition-transform duration-300">
                      {cargo}
                    </td>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 text-xs md:text-sm font-medium text-center group-hover:transform group-hover:scale-[1.02] transition-transform duration-300">
                      {crew}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>



      {/* SECTION 2: 2500 Vs 3500 & Dually */}
      <section className="anim-section w-full relative py-12 md:py-16 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/sprinter/image 15.webp')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-[#364153]/70"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 text-center">

          <div className="mb-8">
            {/* REDUCED DESKTOP FONT SIZE: md:text-3xl (from md:text-5xl) */}
            <Heading3 text={"2500 Vs 3500 & Dually"}  className="!text-[var(--color-secondary)]" />
            {/* <h2 className="font-serif text-3xl sm:text-4xl md:text-3xl font-black mb-3 text-white drop-shadow-lg">
              2500 Vs 3500 & Dually
            </h2> */}
            <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
          </div>

          {/* REDUCED MAX WIDTH: max-w-2xl (from max-w-3xl) */}
          <div className="w-full max-w-2xl mx-auto mb-8 h-4 relative flex justify-between items-center">
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-white/30 rounded-full"></div>
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative w-4 h-4 bg-white rounded-full z-10 border-2 border-[#364153] shadow transform hover:scale-110 transition-transform duration-300">
                <span className="absolute inset-0 flex items-center justify-center text-[#364153] font-black text-xs">
                  {num}
                </span>
              </div>
            ))}
          </div>

          {/* REDUCED MAX WIDTH: max-w-4xl (from max-w-5xl) and REDUCED CARD PADDING */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">

            {/* Card 1: 2500 - Rotating Weights */}
            <div className="group bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl border border-[#364153] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)]"></div>
              {/* REDUCED ICON SIZE */}
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                {/* Scale Base */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white/80 rounded-full"></div>
                {/* Scale Stand */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-white/80"></div>
                {/* Rotating Left Weight */}
                <div className="weight-2500-left absolute bottom-3 left-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                {/* Rotating Right Weight */}
                <div className="weight-2500-right absolute bottom-3 right-2 w-1.5 h-1.5 bg-white rounded-full"></div>
                {/* Connecting Line */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-white/60"></div>
              </div>
              {/* REDUCED DESKTOP FONT SIZE: md:text-xl (from text-2xl) */}
              <Heading4 text={"2500"}/>
              {/* <h3 className="font-serif text-xl sm:text-2xl md:text-xl font-black mb-1 bg-gradient-to-r from-gray-900 to-[#364153] bg-clip-text text-transparent">2500</h3> */}
              {/* REDUCED DESKTOP FONT SIZE: md:text-xs (from text-xs) and reduced margin */}
              <RichParagraph className="!text-[12px] mb-2">
                (We Usually Build On These)
              </RichParagraph>
              {/* <p className="font-semibold text-gray-600 mb-3 text-xs md:text-xs tracking-wide">(We Usually Build On These)</p> */}
              {/* REDUCED DESKTOP FONT SIZE: md:text-sm (from text-sm) */}
              <RichParagraph className="!text-[13px]">
                Lighter GVWR, Gross Vehicle Weight Rating (9,050 lbs), suitable for standard builds.
              </RichParagraph>
              {/* <p className="text-sm md:text-sm font-medium leading-relaxed text-center text-gray-700">
                Lighter GVWR, Gross Vehicle Weight Rating (9,050 lbs), suitable for standard builds.
              </p> */}
            </div>

            {/* Card 2: 3500 - Pulsing Heavy Weights */}
            <div className="group bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl border border-[#364153] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)]"></div>
              {/* REDUCED ICON SIZE */}
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                {/* Scale Base */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white/80 rounded-full"></div>
                {/* Scale Stand */}
                <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-0.5 h-3 bg-white/80"></div>
                {/* Pulsing Heavy Left Weight */}
                <div className="weight-3500-left absolute bottom-3 left-2 w-2 h-2 bg-white rounded-sm"></div>
                {/* Pulsing Heavy Right Weight */}
                <div className="weight-3500-right absolute bottom-3 right-2 w-2 h-2 bg-white rounded-sm"></div>
                {/* Scale Beam */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-4 h-0.5 bg-white/60"></div>
              </div>
              {/* REDUCED DESKTOP FONT SIZE: md:text-xl (from text-2xl) and reduced margin */}
              <Heading4 text={"3500"}/>
              {/* <h3 className="font-serif text-xl sm:text-2xl md:text-xl font-black mb-3 bg-gradient-to-r from-gray-900 to-[#364153] bg-clip-text text-transparent">3500</h3> */}
              {/* REDUCED DESKTOP FONT SIZE: md:text-sm (from text-sm) */}
              <RichParagraph className=" !text-[13px] mt-7">
                Higher payload (GVWR: 9,990 lbs - 11,030 lbs), ideal for heavy conversions
              </RichParagraph>
              {/* <p className="text-sm md:text-sm font-medium leading-relaxed text-center text-gray-700 mt-auto">
                Higher payload (GVWR: 9,990 lbs - 11,030 lbs), ideal for heavy conversions
              </p> */}
            </div>

            {/* Card 3: Dually - Rotating Wheels */}
            <div className="group bg-gradient-to-br from-white to-gray-50 text-gray-800 rounded-xl shadow-lg p-4 flex flex-col items-center transform transition-all duration-500 hover:scale-[1.03] hover:shadow-xl border border-[#364153] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)]"></div>
              {/* REDUCED ICON SIZE */}
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary)] group-hover:from-[var(--color-hover)] group-hover:to-[var(--color-hover)] rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md relative">
                {/* Axle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-0.5 bg-white/80 rounded-full"></div>
                {/* Rotating Wheel 1 */}
                <div className="dually-wheel-1 absolute top-1/2 left-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-white/80">
                  <div className="absolute inset-0.5 border border-white/60 rounded-full"></div>
                </div>
                {/* Rotating Wheel 2 */}
                <div className="dually-wheel-2 absolute top-1/2 right-1.5 transform -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full border border-white/80">
                  <div className="absolute inset-0.5 border border-white/60 rounded-full"></div>
                </div>
                {/* Rotating Wheel 3 (Dually) */}
                <div className="dually-wheel-3 absolute top-1/2 left-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
                {/* Rotating Wheel 4 (Dually) */}
                <div className="dually-wheel-4 absolute top-1/2 right-1 transform -translate-y-1/2 w-1.5 h-1.5 bg-white/90 rounded-full"></div>
              </div>
              {/* REDUCED DESKTOP FONT SIZE: md:text-xl (from text-2xl) */}
              <Heading4 text={"Dually"} className="!text-[18px]"/>
              {/* <h3 className="font-serif text-xl sm:text-2xl md:text-xl font-black mb-1 bg-gradient-to-r from-gray-900 to-[#364153] bg-clip-text text-transparent">Dually</h3> */}
              {/* REDUCED DESKTOP FONT SIZE: md:text-xs (from text-xs) and reduced margin */}
              <RichParagraph className="!text-[12px] mb-2">
                (Dual Rear Wheels)
              </RichParagraph>
              {/* <p className="font-semibold text-gray-600 mb-3 text-xs md:text-xs tracking-wide">(Dual Rear Wheels)</p> */}
              {/* REDUCED DESKTOP FONT SIZE: md:text-sm (from text-sm) */}
              <RichParagraph className="!text-[13px]" >
                Higher payload (GVWR: 9,990 lbs - 11,030 lbs), ideal for heavy conversions
              </RichParagraph>
              {/* <p className="text-sm md:text-sm font-medium leading-relaxed text-center text-gray-700">
                Enhanced stability for towing/heavy loads. The wheels can not be upgraded to R17 bigger radius in the future
              </p> */}
            </div>

          </div>
        </div>
      </section>



      {/* SECTION 3: Manual Vs Electric Sliding Door */}
      <section className="anim-section container mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="text-center mb-6 sm:mb-8">
          {/* REDUCED DESKTOP FONT SIZE: md:text-3xl (from md:text-5xl) */}
          <Heading3 text={"Manual Vs Electric Sliding Door"}/>
          {/* <h2 className="font-serif text-3xl sm:text-4xl md:text-3xl font-black text-gray-900 mb-3">
            Manual Vs Electric Sliding Door
          </h2> */}
          <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-[var(--color-hover)] to-[var(--color-hover)] mx-auto mt-3 md:mt-4 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl border border-[#364153] overflow-hidden transform hover:shadow-2xl transition-all duration-500">
            {/* Table Header Wrapper */}
            <div className="bg-gradient-to-r from-[var(--color-primary)]  to-[var(--color-primary)] p-0.5">
              <table className="w-full table-fixed border-collapse">
                <thead className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary)] text-white">
                  <tr>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-4 text-base (from p-6 text-xl) */}
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Aspect"} className="!text-[var(--color-secondary)]"/></th>
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Manual Sliding Door"} className="!text-[var(--color-secondary)] "/></th>
                    <th className="w-1/3 p-3 md:p-4 text-center border-r-2 border-[#364153]"><Heading4 text={"Electric Sliding Doors"} className="!text-[var(--color-secondary)]"/></th>
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center border-r-2 border-[#364153]">Aspect</th> */}
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center border-r-2 border-[#364153]">Manual Sliding Doors</th> */}
                    {/* <th className="w-1/3 p-3 md:p-4 text-sm md:text-base font-black text-center">Electric Sliding Doors</th> */}
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <table className="w-full table-fixed border-collapse">
              <tbody className="text-gray-800">
                {[
                  ["Operation", "Physical effort required", "Remote or manual operation"],
                  ["Convenience", "Less convenient, especially on hills", "Highly convenient, especially for drivers"],
                  ["Safety Features", "None", "Obstacle detection, automatic closing"],
                  ["Cost", "Standard (no additional cost)", "More expensive (e.g., $2,995 kits)"],
                  ["Reliability", "Simpler, less prone to issues", "More complex, potential for electronic issues"],
                  ["Quiet Operation", "Noisy when closing", "Quieter operation"],
                  ["Availability", "Standard on all models", "Option for eSprinter; aftermarket for others"]
                ].map(([aspect, manual, electric], index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#364153] transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 group ${
                      index % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'
                    }`}
                  >
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 font-bold text-xs md:text-sm text-gray-900 text-center border-r-2 border-[#364153] group-hover:bg-gray-100/80 transition-colors duration-300">
                      {aspect}
                    </td>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 text-xs md:text-sm font-medium text-center border-r-2 border-[#364153] group-hover:transform group-hover:scale-[1.02] transition-transform duration-300">
                      {manual}
                    </td>
                    {/* REDUCED DESKTOP PADDING & FONT SIZE: md:p-3 text-sm (from p-5 text-base) */}
                    <td className="w-1/3 p-3 md:p-3 text-xs md:text-sm font-medium text-center group-hover:transform group-hover:scale-[1.02] transition-transform duration-300">
                      {electric}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}