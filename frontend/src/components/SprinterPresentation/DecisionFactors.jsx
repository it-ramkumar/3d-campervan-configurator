"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading2, Heading3, Heading4, RichParagraph, SecondaryButton } from "../Common/Common";
gsap.registerPlugin(ScrollTrigger);

export default function DecisionFactors() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".anim-section").forEach((section) => {
        gsap.from(section, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.to(".weight-2500-left", { rotation: 360, transformOrigin: "center center", duration: 3, repeat: -1, ease: "none" });
      gsap.to(".weight-2500-right", { rotation: -360, transformOrigin: "center center", duration: 3, repeat: -1, ease: "none" });
      gsap.to(".weight-3500-left", { scale: 1.2, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut" });
      gsap.to(".weight-3500-right", { scale: 1.2, duration: 1.5, repeat: -1, yoyo: true, ease: "power1.inOut", delay: 0.3 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full bg-primary font-serif overflow-x-hidden">

      {/* SECTION 1: Decision Factors & Budget Cards */}
      <section className="anim-section container mx-auto px-6 sm:px-6 pt-4 pb-8">
        <div className="text-center mb-3 md:mb-6">
          <Heading2 text={"Decision Factors"} className="!text-secondary font-display uppercase tracking-wide" />
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <span className="h-px w-6 bg-white/10"></span>
            <RichParagraph className="!text-hover">{"Budget & Specs"}</RichParagraph>
            <span className="h-px w-6 bg-white/10"></span>
          </div>
          <div className="bbv-divider mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-xs lg:max-w-5xl mx-auto">
          {/* CARD 1: CARGO VAN */}
          <div className="bbv-glass-light rounded-lg p-0 flex flex-col overflow-hidden hover:-translate-y-0.5 transition-transform duration-500 border-t-2 border-hover">
            <div className="p-4 md:p-3 border-b border-white/10">
              <Heading3 text={"Cargo Van Options"} className="!text-secondary" />
              <RichParagraph className="!text-secondary/70 !text-sm">{"The blank canvas for maximum build potential."}</RichParagraph>
            </div>
            <div className="p-4 md:p-3 flex-grow flex flex-col gap-2.5">
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4 text={"Sprinter 2500 Cargo Van"} className="!text-secondary !text-base" />
                  <span className="text-[7px] font-bold px-1 py-0 bg-hover/20 text-hover border border-hover/30 rounded uppercase tracking-wider">Popular</span>
                </div>
                <Heading4 text={"Starting at $52,000"} className="!text-secondary !text-base mb-2" />
                <ul className="text-secondary/70 text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $52,000 for RWD and $70,000 for AWD</li>
                  <li>Versatile option for substantial cargo space</li>
                </ul>
              </div>
              <div className="h-px w-full bg-white/10"></div>
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4 text={"Sprinter 3500 Cargo Van"} className="!text-secondary !text-base" />
                  <span className="text-[7px] font-bold px-1 py-0 bg-white/10 text-secondary/60 border border-white/10 rounded uppercase tracking-wider">Heavy Duty</span>
                </div>
                <Heading4 text={"Starting at $57,000"} className="!text-secondary !text-base mb-2" />
                <ul className="text-secondary/70 text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $57,000</li>
                  <li>Increased payload capacity</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 2: CREW VAN */}
          <div className="bbv-glass-light rounded-lg p-0 flex flex-col overflow-hidden hover:-translate-y-0.5 transition-transform duration-500 border-t-2 border-hover/60">
            <div className="p-4 md:p-3 border-b border-white/10">
              <Heading3 text={"Crew Van Options"} className="!text-secondary" />
              <RichParagraph className="!text-secondary/70 !text-sm">{"Combines passenger transport with cargo utility."}</RichParagraph>
            </div>
            <div className="p-4 md:p-3 flex-grow flex flex-col gap-2.5">
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4 text={'Sprinter 2500 Crew Van (144" WB, High Roof)'} className="!text-secondary !text-base" />
                </div>
                <Heading4 text={"$60k - $70k"} className="!text-secondary !text-base mb-2" />
                <ul className="text-secondary/70 text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at approximately $60,000 - $70,000*</li>
                  <li>Combines passenger transport with cargo utility</li>
                </ul>
              </div>
              <div className="h-px w-full bg-white/10"></div>
              <div className="group">
                <div className="flex justify-between items-baseline mb-0.5">
                  <Heading4 text={'Sprinter 2500 Crew Van (170" WB, High Roof)'} className="!text-secondary !text-base" />
                </div>
                <Heading4 text={"Starting at $61,310"} className="!text-secondary !text-base mb-2" />
                <ul className="text-secondary/70 text-[13px] leading-relaxed list-disc list-inside space-y-0">
                  <li>Starting at $61,310</li>
                  <li>Larger cargo space with seating for up to 5</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CARD 3: CONVERSION BUDGET */}
          <div className="bbv-glass-light rounded-lg p-0 flex flex-col overflow-hidden hover:-translate-y-0.5 transition-transform duration-500 relative border-t-2 border-hover/40">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-hover/5 via-transparent to-transparent pointer-events-none"></div>
            <div className="p-4 md:p-3 border-b border-white/10 relative z-10">
              <Heading3 text={"Conversion Budget"} className="!text-secondary" />
              <RichParagraph className="!text-secondary/70 !text-sm">{"The cost to turn the van into a home."}</RichParagraph>
            </div>
            <div className="p-4 md:p-3 flex-grow flex flex-col justify-between relative z-10">
              <div>
                <Heading4 text={"Plan for interior build, exterior upgrades, and custom features (e.g., $100,000 -$160,000)"} className="!text-secondary !text-base mb-2" />
                <div className="bg-white/5 rounded-lg p-4 md:p-3 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-0.5 h-full bg-hover"></div>
                  <RichParagraph className="!text-secondary/60 !text-xs uppercase tracking-widest pl-2">{"Estimated Range"}</RichParagraph>
                  <RichParagraph className="!text-secondary !text-lg font-bold pl-2">{"$100k - $160k"}</RichParagraph>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-5 h-5 rounded-full bg-green-900/30 border border-green-700 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                  <div>
                    <RichParagraph className="!text-secondary/70 !text-[13px]">{"Keyes European Discount"}</RichParagraph>
                    <RichParagraph className="!text-green-400 font-bold">{"Save $5k - $10k"}</RichParagraph>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: MATCHING VAN SPECS */}
      <section className="anim-section w-full relative py-8 md:py-16 text-secondary">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/sprinter/image 15.webp')" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-primary/80 to-black/90"></div>
        </div>
        <div className="bbv-dot-grid" />

        <div className="container relative mx-auto px-4 sm:px-6 text-center">
          <div className="mb-4 md:mb-8">
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Sprinter Guide</p>
            <Heading3 text={"MATCHING VAN SPECS TO YOUR CONVERSION GOALS"} className="!text-secondary font-display uppercase tracking-wide" />
            <div className="bbv-divider mt-4" />
          </div>

          <div className="w-full max-w-lg mx-auto mb-6 md:mb-10 h-px bg-white/10 relative flex justify-between items-center">
            {[1, 2, 3].map((num) => (
              <div key={num} className="relative w-5 h-5 md:w-7 md:h-7 bg-primary rounded-full z-10 border border-hover/40 shadow-sm transform hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <span className="text-hover font-bold text-[10px]">{num}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 max-w-xs md:max-w-4xl mx-auto">
            {/* Card 1 */}
            <div className="group bbv-glass-light border border-white/10 rounded-md p-4 flex flex-col items-center hover:border-hover/30 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 group-hover:bg-hover/20 flex items-center justify-center mb-2 relative transition-colors duration-300 border border-white/10">
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-px bg-secondary/50"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-px h-2 bg-secondary/50"></div>
                <div className="weight-2500-left absolute bottom-3 left-2.5 w-1 h-1 bg-hover rounded-full"></div>
                <div className="weight-2500-right absolute bottom-3 right-2.5 w-1 h-1 bg-hover rounded-full"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-px bg-secondary/80"></div>
              </div>
              <Heading4 text={"Define Your Goals"} className="!text-secondary !text-base" />
              <RichParagraph className="!text-hover !text-xs uppercase tracking-widest">{"PURPOSE"}</RichParagraph>
              <RichParagraph className="!text-secondary/60 !text-xs mt-1">{"Identify primary use (e.g., weekend trips, full-time living, off-grid)."}</RichParagraph>
            </div>

            {/* Card 2 */}
            <div className="group bbv-glass-light border border-white/10 rounded-md p-4 flex flex-col items-center hover:border-hover/30 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 group-hover:bg-hover/20 flex items-center justify-center mb-2 relative transition-colors duration-300 border border-white/10">
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-px bg-secondary/50"></div>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-px h-2 bg-secondary/50"></div>
                <div className="weight-3500-left absolute bottom-3 left-2 w-1.5 h-1.5 bg-hover rounded-sm"></div>
                <div className="weight-3500-right absolute bottom-3 right-2 w-1.5 h-1.5 bg-hover rounded-sm"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-px bg-secondary/80"></div>
              </div>
              <Heading4 text={"Key Van Specs"} className="!text-secondary !text-base" />
              <RichParagraph className="!text-hover !text-xs uppercase tracking-widest">{"SPECS"}</RichParagraph>
              <RichParagraph className="!text-secondary/60 !text-xs mt-1">{"Consider size (WB), roof height, drivetrain (2WD vs. 4WD), and fuel type."}</RichParagraph>
            </div>

            {/* Card 3 */}
            <div className="group bbv-glass-light border border-white/10 rounded-md p-4 flex flex-col items-center hover:border-hover/30 transition-all duration-300">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/5 group-hover:bg-hover/20 flex items-center justify-center mb-2 relative transition-colors duration-300 border border-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-hover">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6.75 6.75 0 1 0 0-13.5 6.75 6.75 0 0 0 0 13.5ZM12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <Heading4 text={"Feature Alignment"} className="!text-secondary !text-base" />
              <RichParagraph className="!text-hover !text-xs uppercase tracking-widest">{"MATCH NEEDS"}</RichParagraph>
              <RichParagraph className="!text-secondary/60 !text-xs mt-1">{"Match specs to needs (e.g., high roof for standing, 4WD for terrain)."}</RichParagraph>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Consult Experts CTA */}
      <section className="anim-section w-full relative h-[180px] md:h-[300px] flex items-center justify-center overflow-hidden mt-4">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105" style={{ backgroundImage: "url('/sprinter/s3 - Copy.webp')" }}>
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>

        <div className="relative z-10 text-center text-secondary px-4">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">Expert Guidance</p>
          <Heading2 text={"Consult Experts"} className="!text-secondary font-display uppercase tracking-wide mb-4" />
          <RichParagraph className="!text-secondary/70 mb-6">{"Leverage our team's experience to select the optimal van for your vision."}</RichParagraph>
          <SecondaryButton label={"CONTACT US"} link="/contact" />
        </div>
      </section>
    </div>
  );
}
