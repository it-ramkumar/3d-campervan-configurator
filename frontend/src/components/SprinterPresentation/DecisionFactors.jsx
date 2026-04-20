"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading2, Heading3, Heading4, RichParagraph,SecondaryButton } from "../Common/Common";
gsap.registerPlugin(ScrollTrigger);

export default function DecisionFactors() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // General Fade In for sections
      gsap.utils.toArray(".anim-section").forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.9, // Slightly faster duration
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%", // Start slightly later
            toggleActions: "play none none none",
          },
        });
      });

      // --- 2500 vs 3500 ANIMATIONS ---
      gsap.to(".weight-2500-left", {
        rotation: 360,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".weight-2500-right", {
        rotation: -360,
        transformOrigin: "center center",
        duration: 3,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".weight-3500-left", {
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
      gsap.to(".weight-3500-right", {
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: 0.3,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gray-50 font-serif text-[#1e2a4a] overflow-x-hidden"
    >
      {/* SECTION 1: Decision Factors & Budget Cards */}
      {/* MODIFIED: Increased base (mobile) horizontal padding px-4 to px-6 */}
      <section className="anim-section container mx-auto px-6 sm:px-6 pt-4 pb-8">
        <div className="text-center mb-3 md:mb-6">
          <Heading2 text={"Decision Factors"} />
          {/* <h1 className="text-2xl md:text-4xl font-bold mb-2 tracking-tight text-black">Decision Factors</h1> */}
          <div className="flex items-center justify-center gap-1.5 text-gray-500">
            <span className="h-px w-6 bg-gray-300"></span>
            <RichParagraph className="text-hover!">
              {"Budget & Specs"}
            </RichParagraph>
            {/* <p className="text-[10px] uppercase tracking-widest font-semibold text-[var(--color-hover)]">Budget & Specs</p> */}
            <span className="h-px w-6 bg-gray-300"></span>
          </div>
        </div>

        {/* CARDS CONTAINER */}
        {/* MODIFIED: Reduced mobile width max-w-sm to max-w-xs to make the cards narrower */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-xs lg:max-w-5xl mx-auto ">
          {/* CARD 1: CARGO VAN */}
          <div className="rounded-lg p-0 shadow-md flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-0.5 bg-gradient-to-br from-primary to-primary border border-[#1e2a4a]/50">
            {/* Header */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <Heading3
                text={"Cargo Van Options"}
                className="text-secondary!"
              />
              <RichParagraph className="text-secondary! !text-sm ">
                {"The blank canvas for maximum build potential."}
              </RichParagraph>
              {/* <h3 className="text-sm lg:text-lg font-bold text-white">Cargo Van Options</h3> */}
              {/* <p className="text-gray-300 text-[9px] mt-0.5 font-light">The blank canvas for maximum build potential.</p> */}
            </div>

            {/* Content */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 flex-grow flex flex-col gap-2.5">
              {/* Option A */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4
                    text={"Sprinter 2500 Cargo Van"}
                    className="text-secondary! !text-base"
                  />
                  {/* <h4 className="font-bold text-xs lg:text-base text-white group-hover:text-blue-200 transition-colors">Sprinter 2500 Cargo Van</h4> */}
                  <span className="text-[7px] font-bold px-1 py-0 bg-blue-500/20 text-blue-200 border border-blue-500/30 rounded uppercase tracking-wider">
                    Popular
                  </span>
                </div>
                <Heading4
                  text={"Starting at $52,000"}
                  className="text-secondary! !text-base mb-2"
                />
                {/* <div className="text-sm lg:text-lg font-bold text-white mb-0.5 tracking-tight">Starting at $52,000</div> */}
                <ul className="text-secondary text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $52,000 for RWD and $70,000 for AWD</li>
                  <li>Versatile option for substantial cargo space</li>
                </ul>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              {/* Option B */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4
                    text={"Sprinter 3500 Cargo Van"}
                    className="text-secondary! !text-base"
                  />
                  {/* <h4 className="font-bold text-xs lg:text-base text-white group-hover:text-blue-200 transition-colors">Sprinter 3500 Cargo Van</h4> */}
                  <span className="text-[7px] font-bold px-1 py-0 bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded uppercase tracking-wider">
                    Heavy Duty
                  </span>
                </div>
                <Heading4
                  text={"Starting at $57,000"}
                  className="text-secondary! !text-base mb-2"
                />
                {/* <div className="text-sm lg:text-lg font-bold text-white mb-0.5 tracking-tight">Starting at $57,000</div> */}
                <ul className="text-secondary text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $57,000</li>
                  <li>Increased payload capacity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: CREW VAN */}
          <div className="rounded-lg p-0 shadow-md flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-0.5 bg-gradient-to-br from-[#001F3D] to-[#001F3D] border border-[#1e2a4a]/50">
            {/* Header */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 border-b border-white/10 bg-white/5 backdrop-blur-sm">
              <Heading3 text={"Crew Van Options"} className="text-secondary!" />
              <RichParagraph className="text-secondary! !text-sm">
                {"Combines passenger transport with cargo utility."}
              </RichParagraph>
              {/* <h3 className="text-sm lg:text-lg font-bold text-white">Crew Van Options</h3>
       <p className="text-gray-300 text-[9px] mt-0.5 font-light">Combines passenger transport with cargo utility.</p> */}
            </div>

            {/* Content */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 flex-grow flex flex-col gap-2.5">
              {/* Option A */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4
                    text={'Sprinter 2500 Crew Van (144" WB, High Roof)'}
                    className="text-secondary! !text-base"
                  />
                  {/* <h4 className="font-bold text-xs lg:text-base text-white group-hover:text-blue-200 transition-colors">Sprinter 2500 Crew Van (144" WB, High Roof)</h4> */}
                </div>
                <Heading4
                  text={"$60k - $70k"}
                  className="text-secondary! !text-base mb-2"
                />
                {/* <div className="text-sm lg:text-lg font-bold text-white mb-0.5 tracking-tight">$60k - $70k*</div> */}
                <ul className="text-secondary text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at approximately $60,000 - $70,000*</li>
                  <li>Combines passenger transport with cargo utility</li>
                </ul>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

              {/* Option B */}
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4
                    text={'Sprinter 2500 Crew Van (170" WB, High Roof)'}
                    className="text-secondary! !text-base"
                  />
                  {/* <h4 className="font-bold text-xs lg:text-base text-white group-hover:text-blue-200 transition-colors">Sprinter 2500 Crew Van (170" WB, High Roof)</h4> */}
                </div>
                <Heading4
                  text={"Starting at $61,310"}
                  className="text-secondary! !text-base mb-2"
                />
                {/* <div className="text-sm lg:text-lg font-bold text-white mb-0.5 tracking-tight">Starting at $61,310</div> */}
                <ul className="text-secondary text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $61,310</li>
                  <li>Larger cargo space with seating for up to 5</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: CONVERSION BUDGET */}
          <div className="rounded-lg p-0 shadow-md text-white flex flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-0.5 relative bg-primary border border-gray-800">
            {/* Subtle Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e2a4a]/40 via-transparent to-transparent pointer-events-none"></div>

            {/* Header */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 border-b border-white/10 relative z-10">
              <Heading3
                text={"Conversion Budget"}
                className="text-secondary!"
              />
              <RichParagraph className="text-secondary! !text-sm">
                {"The cost to turn the van into a home."}
              </RichParagraph>
              {/* <h3 className="text-sm lg:text-lg font-bold text-white">Conversion Budget</h3>
       <p className="text-gray-400 text-[9px] mt-0.5 font-light">The cost to turn the van into a home.</p> */}
            </div>

            {/* Content */}
            {/* MODIFIED: Increased mobile vertical padding p-3.5 to p-4 */}
            <div className="p-4 md:p-3 flex-grow flex flex-col justify-between relative z-10">
              <div>
                {/* <RichParagraph className="!text-[var(--color-secondary)]">{"Plan for interior build, exterior upgrades, and custom features (e.g., $100,000 -$160,000)"}</RichParagraph> */}
                <Heading4
                  text={
                    "Plan for interior build, exterior upgrades, and custom features (e.g., $100,000 -$160,000)"
                  }
                  className="text-secondary! !text-base mb-2"
                />
                {/* <p className="text-gray-300 text-[9px] leading-relaxed mb-2 font-light">
         Plan for interior build, exterior upgrades, and custom features (e.g.,
         $100,000 -$160,000)
        </p> */}
                {/* MODIFIED: Increased mobile vertical padding p-3 to p-4 */}
                <div className="bg-white/5 rounded-lg p-4 md:p-3 border border-white/10 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-yellow-600"></div>
                  <RichParagraph className="text-secondary!">
                    {"Estimated Range"}
                  </RichParagraph>
                  {/* <p className="text-[7px] uppercase tracking-widest text-gray-500 mb-0">Estimated Range</p> */}
                  <RichParagraph className="text-secondary!">
                    {"$100k - $160k"}
                  </RichParagraph>
                  {/* <p className="text-base lg:text-xl font-bold text-white tracking-tight">$100k - $160k</p> */}
                </div>
              </div>

              {/* MODIFIED: Increased mobile vertical padding mt-3/pt-3 to mt-4/pt-4 */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-green-900/30 border border-green-800 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <RichParagraph className="text-secondary! !text-[13px]">
                      {"Keyes European Discount"}
                    </RichParagraph>
                    {/* <p className="text-[8px] text-gray-400 uppercase tracking-wider">Keyes European Discount</p> */}
                    <RichParagraph className="!text-green-400 ">
                      {"Save $5k - $10k"}
                    </RichParagraph>
                    {/* <p className="text-xs lg:text-base font-bold text-green-400">Save $5k - $10k</p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      ---
      {/* SECTION 2: MATCHING VAN SPECS TO YOUR CONVERSION GOALS */}
      <section className="anim-section w-full relative py-8 md:py-16 text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat fixed-bg"
          style={{ backgroundImage: "url('/sprinter/image 15.webp')" }}
        >
          {/* NEUTRAL OVERLAY: Natural Black/Gray */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-gray-900/75 to-black/85"></div>
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 text-center">
          <div className="mb-4 md:mb-8">
            <Heading3
              text={"MATCHING VAN SPECS TO YOUR CONVERSION GOALS"}
              className="text-secondary!"
            />
            {/* <h2 className="font-serif text-lg md:text-3xl font-black mb-1.5 text-white drop-shadow-lg">
       MATCHING VAN SPECS TO YOUR CONVERSION GOALS
      </h2> */}
            <div className="w-10 h-1 bg-hover mx-auto rounded-full opacity-50"></div>
          </div>

          {/* Number Line */}
          <div className="w-full max-w-lg mx-auto mb-6 md:mb-10 h-px bg-white/20 relative flex justify-between items-center">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="relative w-5 h-5 md:w-7 md:h-7 bg-[#1e2a4a] rounded-full z-10 border border-white/20 shadow-sm transform hover:scale-110 transition-transform duration-300 flex items-center justify-center"
              >
                <span className="text-white font-bold text-[10px]">{num}</span>
              </div>
            ))}
          </div>

          {/* Cards Grid */}
          {/* MODIFIED: Reduced mobile width max-w-sm to max-w-xs to be consistent with Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 max-w-xs md:max-w-4xl mx-auto">
            {/* Card 1: Define Your Goals */}
            {/* MODIFIED: Increased mobile vertical padding p-3 to p-4 for height consistency */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-4 md:p-4 flex flex-col items-center hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 group-hover:bg-hover flex items-center justify-center mb-2 relative transition-colors duration-300">
                {/* Animation Elements */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-px bg-white/50"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-px h-2 bg-white/50"></div>
                <div className="weight-2500-left absolute bottom-3 left-2.5 w-1 h-1 bg-white rounded-full"></div>
                <div className="weight-2500-right absolute bottom-3 right-2.5 w-1 h-1 bg-white rounded-full"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-px bg-white/80"></div>
              </div>
              <Heading4
                text={"Define Your Goals"}
                className="text-secondary! !text-base"
              />
              <RichParagraph className="!text-gray-400 !text-xs">
                {"PURPOSE"}
              </RichParagraph>
              <RichParagraph className="!text-gray-400 !text-xs">
                {
                  "Identify primary use (e.g., weekend trips, full-time living, off-grid)."
                }
              </RichParagraph>
              {/* <h3 className="font-serif text-xs md:text-base font-bold mb-0 text-white">Define Your Goals</h3> */}
              {/* <p className="text-[8px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">PURPOSE</p> */}
              {/* <p className="text-gray-300 text-[10px] leading-relaxed">
        Identify primary use (e.g., weekend trips, full-time living, off-grid).
       </p> */}
            </div>

            {/* Card 2: Key Van Specs */}
            {/* MODIFIED: Increased mobile vertical padding p-3 to p-4 for height consistency */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-4 md:p-4 flex flex-col items-center hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 group-hover:bg-hover flex items-center justify-center mb-2 relative transition-colors duration-300">
                {/* Animation Elements */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-px bg-white/50"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-px h-2 bg-white/50"></div>
                <div className="weight-3500-left absolute bottom-3 left-2 w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="weight-3500-right absolute bottom-3 right-2 w-1.5 h-1.5 bg-white rounded-sm"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-px bg-white/80"></div>
              </div>
              <Heading4
                text={"Key Van Specs"}
                className="text-secondary! !text-base"
              />
              <RichParagraph className="!text-gray-400 !text-xs">
                {"SPECS"}
              </RichParagraph>
              <RichParagraph className="!text-gray-400 !text-xs">
                {
                  "Consider size (WB), roof height, drivetrain (2WD vs. 4WD), and fuel type."
                }
              </RichParagraph>
              {/* <h3 className="font-serif text-xs md:text-base font-bold mb-0 text-white">Key Van Specs</h3>
       <p className="text-[8px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">SPECS</p>
       <p className="text-gray-300 text-[10px] leading-relaxed">
        Consider size (WB), roof height, drivetrain (2WD vs. 4WD), and fuel type.
       </p> */}
            </div>

            {/* Card 3: Feature Alignment */}
            {/* MODIFIED: Increased mobile vertical padding p-3 to p-4 for height consistency */}
            <div className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-md p-4 md:p-4 flex flex-col items-center hover:bg-white/10 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 group-hover:bg-hover flex items-center justify-center mb-2 relative transition-colors duration-300">
                {/* 🎯 NEW SVG ICON: Target/Bullseye for Feature Alignment */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5ZM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </div>
              <Heading4
                text={"Feature Alignment"}
                className="text-secondary! !text-base"
              />
              <RichParagraph className="!text-gray-400 !text-xs">
                {"MATCH NEEDS"}
              </RichParagraph>
              <RichParagraph className="!text-gray-400 !text-xs">
                {
                  "Match specs to needs (e.g., high roof for standing, 4WD for terrain)."
                }
              </RichParagraph>
              {/* <h3 className="font-serif text-xs md:text-base font-bold mb-0 text-white">Feature Alignment</h3>
       <p className="text-[8px] font-bold tracking-widest text-gray-400 uppercase mb-1.5">MATCH NEEDS</p>
       <p className="text-gray-300 text-[10px] leading-relaxed">
        Match specs to needs (e.g., high roof for standing, 4WD for terrain).
       </p> */}
            </div>
          </div>
        </div>
      </section>
      ---
      {/* SECTION 3: Consult Experts CTA */}
      <section className="anim-section w-full relative h-[180px] md:h-[300px] flex items-center justify-center overflow-hidden mt-4">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/sprinter/s3 - Copy.webp')" }}
        >
          {/* Neutral Dark Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <Heading2 text={"Consult Experts"} className="text-secondary! mb-4" />
          <RichParagraph className="text-secondary! mb-4">
            {
              "Leverage our team’s experience to select the optimal van for your vision."
            }
          </RichParagraph>
          {/* <h2 className="font-serif font-bold text-xl md:text-4xl mb-2 md:mb-4 tracking-tight">Consult Experts</h2>
     <p className="font-serif text-xs md:text-lg max-w-md mx-auto leading-relaxed font-light text-gray-200">
      Leverage our team’s experience to select the optimal van for your vision.
      
     </p> */}
          <SecondaryButton label={"CONTACT US"} link="/contact" />
          {/* <button className="px-8 py-3 border-2 border-secondary text-secondary font-semibold tracking-widest rounded-lg transition-all duration-300 hover:bg-hover hover:border-hover hover:text-white">
            CONTACT US
          </button> */}
        </div>
      </section>
    </div>
  );
}
