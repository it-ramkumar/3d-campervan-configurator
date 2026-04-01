"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Home, CreditCard, Building,Wallet, BadgeCheck, ArrowRight, ShieldCheck,Landmark  } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heading2, Heading3, RichParagraph, Heading4, PrimaryButton, CustomLink, SecondaryButton } from '../../Common/Common'
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Flist() {
  const [activeSection, setActiveSection] = useState("new-builds");
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const navigationItems = [
    { id: "new-builds", label: "New Builds", icon: Car },
    { id: "pre-built", label: "Pre-Built", icon: Building },
    { id: "alternative", label: "Alternative", icon: Home },
  ];

  return (
    <div ref={containerRef} className="w-full bg-secondary text-primary overflow-hidden">

      {/* Introduction Section */}
      <section className="anim-section container mx-auto px-4 sm:px-6 pt-24 pb-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CreditCard className="w-8 h-8 text-secondary" />
          </motion.div>

          <Heading2 text="Financing Your Dream Van" />

          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="h-px w-12 bg-hover"></span>
            <RichParagraph className="!text-sm tracking-wider font-bold uppercase !text-hover ">Premium Funding</RichParagraph>
            <span className="h-px w-12 bg-hover"></span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <RichParagraph >
              You've completed your research and decided to trust Big Bear Vans for your dream campervan.
              Before choosing your
              <CustomLink href="/van-options/interior-options" text={" interior "}/>

               &
               <CustomLink href="/van-options/exterior-options" text={" exterior "}/>

              options, the most important thing is finding a way to finance your van.
            </RichParagraph>
          </div>

          {/* Dark Info Box */}
          <div className="bg-primary  p-8 rounded-lg shadow-2xl border border-primary">
            <RichParagraph className="text-center text-secondary">
              Traditional auto loans often do not cover the conversion. However, we have several trusted options and partners to help you fund your dream van.
            </RichParagraph>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="anim-section py-8 border-y border-primary/10">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 border-2 ${isActive
                    ? "bg-primary text-secondary border-primary shadow-xl"
                    : "bg-transparent text-primary border-primary/20 hover:border-primary"
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}




<section className="anim-section container mx-auto px-4 sm:px-6 py-20 min-h-[600px]">
  <AnimatePresence mode="wait">

    {/* NEW BUILDS */}
    {activeSection === "new-builds" && (
      <motion.div key="new-builds" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

        <div className="text-center mb-12">
          <Heading3 text="Financing for New Custom Builds" className="mb-4" />
          <RichParagraph className="">
            If you are starting a new custom build with us, you have two common paths for financing.
          </RichParagraph>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

          {/* Card 1 */}
          <div className="bg-primary p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Wallet className="text-secondary" size={28} />
              </div>
              <div>
                <Heading3 text="Finance the Van Only" className="mb-0 text-secondary" />
                <p className="text-secondary/60 text-xs italic">(Most Common Method)</p>
              </div>
            </div>

            <RichParagraph className="text-secondary mb-8 border-b border-secondary/10 pb-4">
              This is the most common route our clients take. The process is simple:
            </RichParagraph>

            <div className="space-y-6">
              <div className="flex gap-4">
                <BadgeCheck className="text-secondary/50 shrink-0" size={24} />
                <div>
                  <Heading4 text="Finance the Van" className="mb-1 text-secondary" />
                  <RichParagraph className="text-secondary/80 text-sm">
                    You secure your own financing for the new Sprinter van chassis, often directly through Mercedes-Benz Financial Services.
                  </RichParagraph>
                </div>
              </div>
              <div className="flex gap-4">
                <BadgeCheck className="text-secondary/50 shrink-0" size={24} />
                <div>
                  <Heading4 text="Pay for Conversion" className="mb-1 text-secondary" />
                  <RichParagraph className="text-secondary/70 text-sm">
                    You pay for the custom conversion (typically $90,000 - $150,000) using cash or a separate line of credit.
                  </RichParagraph>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-primary p-8 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 border border-primary/10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Landmark className="text-secondary" size={28} />
              </div>
              <div>
                <Heading4 text="All-in-One Loan" className="mb-0 text-secondary" />
                <p className="text-secondary/60 text-xs italic">(Mercedes Sprinter Van + Conversion)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                <ArrowRight size={18} className="text-secondary mt-1" />
                <div>
                  <Heading4 text="Partner" className="text-secondary text-base mb-0" />
                  <RichParagraph className="text-secondary/80 text-sm">We work directly with a partner Mercedes dealership.</RichParagraph>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                <ArrowRight size={18} className="text-secondary mt-1" />
                <div>
                  <Heading4 text="Loan" className="text-secondary text-base mb-0" />
                  <RichParagraph className="text-secondary/80 text-sm">They can include our estimate for the custom build into one extended 6-year car loan.</RichParagraph>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/5 transition-colors">
                <ArrowRight size={18} className="text-secondary mt-1" />
                <div>
                  <Heading4 text="Requirements" className="text-secondary text-base mb-0" />
                  <RichParagraph className="text-secondary/80 text-sm">This loan covers both the new Sprinter and the conversion, and typically requires a 30% down payment.</RichParagraph>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-secondary/5 rounded-lg">
              <RichParagraph className="text-secondary text-sm italic">
                How to apply: please call us, we will go over the quote for a custom build, and then submit it together to the dealership.
              </RichParagraph>
            </div>
          </div>

        </div>
      </motion.div>
    )}

    {/* PRE BUILT */}
    {activeSection === "pre-built" && (
      <motion.div key="pre-built" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <Heading3 text="Financing for Pre-Built Vans" className="!text-primary mb-4" />
          <RichParagraph className="!text-primary/70">
            If you are purchasing one of our completed, ready-to-go campervans, here are your primary financing options.
          </RichParagraph>
        </div>

        <div className="bg-primary p-10 rounded-lg shadow-2xl max-w-3xl mx-auto border border-primary/10">
          <div className="flex items-center gap-4 mb-10 border-b border-secondary/10 pb-6">
            <ShieldCheck className="text-secondary" size={40} />
            <Heading3 text="RV Loan Financing" className="!mb-0 text-secondary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { title: "Provider", text: "Trident Funding - Specialized RV financing experts" },
              { title: "Loan Type", text: "RV Loan specifically designed for campervans" },
              { title: "Requirements", text: "Good credit score and a 20% down payment. Minimum credit score typically 680+" },
              { title: "Process", text: "Quick pre-approval with soft credit check that doesn't affect your credit score" }
            ].map((item, i) => (
              <div key={i} className="group">
                <Heading3 text={item.title} className="text-sm uppercase tracking-widest opacity-50 text-secondary mb-2" />
                <RichParagraph className="text-secondary font-medium">{item.text}</RichParagraph>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 bg-secondary/5 rounded-lg border border-secondary/10">
            <Heading3 text="Benefits" className="mb-4 text-secondary text-xl" />
            <RichParagraph className="text-secondary/80">
              Competitive interest rates, flexible terms (up to 15 years), quick approval process, specialized understanding of campervan values
            </RichParagraph>
          </div>
        </div>
      </motion.div>
    )}

    {/* ALTERNATIVE */}
    {activeSection === "alternative" && (
      <motion.div key="alternative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <div className="text-center mb-12">
          <Heading3 text="Alternative Financing" className="!text-primary mb-4" />
          <RichParagraph className="!text-primary/70">
            Using Real Estate for Better Rates
          </RichParagraph>
        </div>

        <div className="bg-primary text-secondary p-12 rounded-lg shadow-2xl max-w-2xl mx-auto text-center border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-secondary opacity-20"></div>
          <Home className="mx-auto mb-6 text-secondary opacity-80" size={48} />

          <Heading3 text="Real Estate Collateral" className="mb-4 text-secondary" />
          <RichParagraph className="text-secondary/80 mb-8">
            Leverage your property for better terms
          </RichParagraph>

          <div className="grid grid-cols-1 gap-6 text-left max-w-md mx-auto">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5">
               <div className="font-bold text-secondary shrink-0 w-24">Provider:</div>
               <div className="text-secondary/90 text-sm">ADU Loans Net (CrossCountry Mortgage)</div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5">
               <div className="font-bold text-secondary shrink-0 w-24">Loan Type:</div>
               <div className="text-secondary/90 text-sm">Uses your real estate as collateral</div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/5">
               <div className="font-bold text-secondary shrink-0 w-24">Benefit:</div>
               <div className="text-secondary/90 text-sm font-semibold italic">Often provides very good interest rates.</div>
            </div>
          </div>
        </div>
      </motion.div>
    )}

  </AnimatePresence>
</section>

      {/* CTA */}
      <section className="anim-section py-24 bg-primary ">
        <div className="container mx-auto px-4 text-center">
          <Heading2 text="Have Questions?" className="mb-6 text-secondary" />
          <RichParagraph className="max-w-2xl mx-auto opacity-70 mb-12 text-secondary">
            Contact us and we will help you choose the best financing path for your project.
          </RichParagraph>
          <SecondaryButton label="Contact Us Today" link={"/contact"} />
        </div>
      </section>

    </div>
  );
}