"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  X,
  ChevronRight,
  Calendar,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { ImageWithSkeleton, RichParagraph } from "../Common/Common";
import { Heading2, Heading3, Heading4 } from "../Common/Common";
gsap.registerPlugin(ScrollTrigger);

// --- DATA: Step Details for the Modal Logic ---
const STEP_DATA = {
  step1: {
    title: "Vehicle Sourcing",
    image: "/sprinter/i1.webp",
    duration: "Immediate",
    description:
      "We take the hassle out of finding the perfect base for your build. Whether you have an existing van or need a new one, we handle the logistics.",
    deliverables: [
      "200+ Point Inspection",
      "Dealership Negotiation",
      "Title Transfer Assistance",
    ],
  },
  step2: {
    title: "Collaborative Design",
    image: "/sprinter/i2.webp",
    duration: "1 Month",
    description:
      "This is where your dream takes shape. We sit down (virtually or in-person) to map out every inch of your future home on wheels.",
    deliverables: [
      "3D CAD Renderings",
      "Material Sample Kits",
      "Floorplan Revisions",
    ],
  },
  step3: {
    title: "Engineering & Planning",
    image: "/sprinter/i3.webp",
    duration: "2 Months",
    description:
      "Before a single screw is turned, our engineers ensure weight distribution, electrical load, and plumbing systems are calculated for safety.",
    deliverables: [
      "Electrical Schematics",
      "Weight Distribution Analysis",
      "Final Blueprint Approval",
    ],
  },
  step4: {
    title: "Build & Assembly",
    image: "/sprinter/i4.webp",
    duration: "3-4 Months",
    description:
      "Our master craftsmen get to work. From insulation to cabinetry, every component is hand-built and installed with automotive-grade precision.",
    deliverables: [
      "Weekly Photo Updates",
      "Sound Deadening & Insulation",
      "Custom Cabinetry Installation",
    ],
  },
  step5: {
    title: "Delivery & Beyond",
    image: "/sprinter/i5.webp",
    duration: "Complete",
    description:
      "The keys are yours. We provide a comprehensive training session so you know exactly how to operate your solar, water, and heating systems.",
    deliverables: [
      "System Walkthrough",
      "Test Drive",
      "1-Year Craftsmanship Warranty",
    ],
  },
};

export default function CustomBuild() {
  const containerRef = useRef(null);

  // --- STATE: Manage Interactive Modals ---
  const [activeModal, setActiveModal] = useState(null);
  const [showInquiry, setShowInquiry] = useState(false);

  // --- GSAP ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Header Animations
      gsap.from(".header-anim", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".header-section", start: "top 90%" },
      });

      // 2. Timeline Animations (Minor adjustments to ScrollTrigger start/end)
      const rows = gsap.utils.toArray(".timeline-row");
      rows.forEach((row) => {
        // Content Fade
        gsap.from(row.querySelectorAll(".fade-content"), {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: row, start: "top 80%" },
        });

        const q = gsap.utils.selector(row);

        // Line Fills & Dots
        gsap.to(q(".line-fill-top"), {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "top 70%",
            end: "top 50%",
            scrub: 0.4,
          }, // Tighter window
        });

        gsap.to(q(".connector-dot"), {
          backgroundColor: "#1a1f2e",
          borderColor: "#1a1f2e",
          scale: 1.2,
          ease: "power1.out",
          scrollTrigger: {
            trigger: row,
            start: "top 50%",
            toggleActions: "play reverse play reverse",
          }, // Tighter start point
        });

        gsap.to(q(".line-fill-bottom"), {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: row,
            start: "center 80%",
            end: "bottom center",
            scrub: 0.4,
          }, // Tighter start point
        });
      });

      // 3. Pre-Build Section
      gsap.from(".pre-build-anim", {
        y: 40,
        opacity: 0,
        duration: 1.0,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: ".pre-build-section", start: "top 80%" },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // --- HELPER: Close Modal on Escape Key ---
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        setShowInquiry(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full bg-white text-[#1a1f2e] font-sans overflow-hidden selection:bg-[#1a1f2e] selection:text-white pb-6"
    >
      {/* =========================
          MODAL: DETAILS VIEW (REDUCED SIZE)
      ========================= */}
      {activeModal && STEP_DATA[activeModal] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-[#1a1f2e]/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
          ></div>

          {/* Modal Content - REDUCED MAX-WIDTH */}
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 z-10 p-1.5 bg-white/80 hover:bg-white rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-[#1a1f2e]" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: Image */}
              <div className="h-40 md:h-full bg-gray-100">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA[activeModal].image}
                  alt={STEP_DATA[activeModal].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Text - REDUCED PADDING/FONT SIZE/SPACING */}
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 mb-1.5 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{STEP_DATA[activeModal].duration}</span>
                </div>
                <Heading4 text={STEP_DATA[activeModal].title} className="mb-2"/>
                
                <RichParagraph className="!text-sm mb-4">{STEP_DATA[activeModal].description}</RichParagraph>
                

                <div className="space-y-2">
                  <Heading4 text={"Key Deliverables:"}/>
                  
                  {STEP_DATA[activeModal].deliverables.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                      <RichParagraph className="">{item}</RichParagraph>
                      
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================
          MODAL: INQUIRY FORM (No change to modal internal size)
      ========================= */}
      {showInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setShowInquiry(false)}
            className="absolute inset-0 bg-[#1a1f2e]/80 backdrop-blur-sm animate-in fade-in duration-300"
          ></div>

          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-in slide-in-from-bottom-8 duration-300">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-[#1a1f2e]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-2xl font-serif text-[#1a1f2e] mb-2">
              Interested in this build?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Leave your details and our team will send you the full spec sheet
              for this pre-built van.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#1a1f2e] transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#1a1f2e] transition-colors"
                  placeholder="jane@example.com"
                />
              </div>
              <button className="w-full bg-[#1a1f2e] text-white font-bold uppercase tracking-widest py-4 rounded-lg text-xs hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                Request Spec Sheet <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Header Section --- */}
      <div className="header-section flex flex-col items-center justify-center pt-20 pb-10 px-6 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-32 bg-gradient-to-b from-transparent to-[#1a1f2e]/10"></div>

        <span className="header-anim mb-6 px-3 py-1 border border-hover/30 rounded-full text-[10px] font-bold tracking-[0.25em] uppercase text-[var(--color-hover)] bg-[var(--color-hover)]/10">
          Bespoke Conversions
        </span>
        <Heading2 text={"Our Custom Build Process"}/>
        

        <div className="header-anim w-[1px] h-8 bg-[#1a1f2e]/20 mb-6"></div>
          <RichParagraph className="!text-[24px]">{"Click on any stage below to explore the details of our craftsmanship."}</RichParagraph>
        
      </div>

      {/* --- Timeline Section --- */}
      <div className="relative max-w-[1200px] mx-auto px-4 md:px-10">
        {/* ROW 1: Vehicle Sourcing */}
        <div className="timeline-row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-6 gap-x-0 md:gap-x-12 mb-0">
          {/* MODIFIED: Changed alignment from md:text-right to md:text-left and md:self-end to md:self-start */}
          <div className="fade-content flex flex-col justify-center md:text-left order-2 md:order-1 py-8">
            <Heading3 text={"Vehicle Sourcing"} className="mb-2"/>
            
            <RichParagraph className="mb-2">{"Bring your Sprinter for inspection, or let us source a discounted new van via our Mercedes dealership partnerships that perfectly matches your needs and requirements."}</RichParagraph>
            
            <button
              onClick={() => setActiveModal("step1")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1a1f2e] md:self-start hover:opacity-60 transition-opacity"
            >
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col items-center order-1 md:order-2 relative h-full min-h-[350px]">
            <div className="relative w-[3px] h-28">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-top absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
            <div className="connector-dot relative z-20 w-5 h-5 rounded-full border-[2px] border-gray-200 bg-white flex items-center justify-center transition-colors duration-300 my-[-3px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>

            <div
              onClick={() => setActiveModal("step1")}
              className="fade-content relative z-10 p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_30px_-6px_rgba(26,31,46,0.15)] border border-gray-100 mt-3 cursor-pointer group transition-transform hover:scale-105 duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-[1rem] overflow-hidden">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA.step1.image}
                  alt="Vehicle Sourcing"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-primary text-secondary px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                Immediate
              </div>
            </div>

            <div className="relative w-[3px] flex-grow min-h-28 mt-4">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-bottom absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
          </div>
          <div className="hidden md:block order-3"></div>
        </div>

        {/* ROW 2: Collaborative Design */}
        <div className="timeline-row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-6 gap-x-0 md:gap-x-12 mb-0">
          <div className="hidden md:block order-1"></div>
          <div className="flex flex-col items-center order-1 md:order-2 relative h-full min-h-[350px]">
            <div className="relative w-[3px] h-28">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-top absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
            <div className="connector-dot relative z-20 w-5 h-5 rounded-full border-[2px] border-gray-200 bg-white flex items-center justify-center transition-colors duration-300 my-[-3px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>

            <div
              onClick={() => setActiveModal("step2")}
              className="fade-content relative z-10 p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_30px_-6px_rgba(26,31,46,0.15)] border border-gray-100 mt-3 cursor-pointer group transition-transform hover:scale-105 duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-[1rem] overflow-hidden">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA.step2.image}
                  alt="Design Phase"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-primary text-secondary border border-[#1a1f2e] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                1 Month
              </div>
            </div>

            <div className="relative w-[3px] flex-grow min-h-28 mt-4">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-bottom absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
          </div>

          <div className="fade-content flex flex-col justify-center md:text-left order-2 md:order-3 py-8">
            <Heading3 text={"Collaborative Design"} className="mb-2"/>
            
            <RichParagraph className="mb-2">{"Define needs via Zoom, visualize with 3D renderings, and refine until your vision is perfect."}</RichParagraph>
            
            <button
              onClick={() => setActiveModal("step2")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1a1f2e] md:self-start hover:opacity-60 transition-opacity"
            >
              See Process <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ROW 3: Engineering */}
        <div className="timeline-row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-6 gap-x-0 md:gap-x-12 mb-0">
          {/* MODIFIED: Changed alignment from md:text-right to md:text-left and md:self-end to md:self-start */}
          <div className="fade-content flex flex-col justify-center md:text-left order-2 md:order-1 py-8">
            <Heading3 text={"Engineering & Planning"} className="mb-2"/>
            
            <RichParagraph className="mb-2">{"Optimize safety and functionality with engineers, then approve final blueprints and premium materials."}</RichParagraph>
            
            <button
              onClick={() => setActiveModal("step3")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1a1f2e] md:self-start hover:opacity-60 transition-opacity"
            >
              View Specs <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex flex-col items-center order-1 md:order-2 relative h-full min-h-[350px]">
            <div className="relative w-[3px] h-28">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-top absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
            <div className="connector-dot relative z-20 w-5 h-5 rounded-full border-[2px] border-gray-200 bg-white flex items-center justify-center transition-colors duration-300 my-[-3px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>

            <div
              onClick={() => setActiveModal("step3")}
              className="fade-content relative z-10 p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_30px_-6px_rgba(26,31,46,0.15)] border border-gray-100 mt-3 cursor-pointer group transition-transform hover:scale-105 duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-[1rem] overflow-hidden">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA.step3.image}
                  alt="Engineering"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#001F3D] text-secondary border border-[#1a1f2e] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                2 Months
              </div>
            </div>

            <div className="relative w-[3px] flex-grow min-h-28 mt-4">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-bottom absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
          </div>
          <div className="hidden md:block order-3"></div>
        </div>

        {/* ROW 4: Build & Assembly */}
        <div className="timeline-row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-6 gap-x-0 md:gap-x-12 mb-0">
          <div className="fade-content flex flex-col justify-center md:text-right order-3 md:order-1 py-8">
            <div className="relative p-6 bg-gray-50 rounded-xl border-l-3 border-[#1a1f2e]">
              <Heading4 text={"Every step is designed to tailor the van to your lifestyle"} className="!text-base mb-2"/>
              
              <RichParagraph>{"We work hand in hand with our clients to ensure that we are producing something that is according to the requirements and expectations of our clients. Our aim is to bring your imagination into reality using our expert craftsmanship, years of experience, and state-of-the-art technology."}</RichParagraph>
              
            </div>
          </div>

          <div className="flex flex-col items-center order-1 md:order-2 relative h-full min-h-[350px]">
            <div className="relative w-[3px] h-28">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-top absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
            <div className="connector-dot relative z-20 w-5 h-5 rounded-full border-[2px] border-gray-200 bg-white flex items-center justify-center transition-colors duration-300 my-[-3px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>

            <div
              onClick={() => setActiveModal("step4")}
              className="fade-content relative z-10 p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_30px_-6px_rgba(26,31,46,0.15)] border border-gray-100 mt-3 cursor-pointer group transition-transform hover:scale-105 duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-[1rem] overflow-hidden">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA.step4.image}
                  alt="Build Assembly"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#001F3D] text-secondary border border-[#1a1f2e] px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap shadow-md">
                3-4 Months
              </div>
            </div>

            <div className="relative w-[3px] flex-grow min-h-28 mt-4">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-bottom absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
          </div>

          <div className="fade-content flex flex-col justify-center md:text-left order-2 md:order-3 py-8">
            <Heading3 text={" Build & Assembly"} className="mb-2"/>
           
            <RichParagraph className="mb-2">{"Craft interiors (2 months), upgrade exteriors (1 month), with weekly progress updates."}</RichParagraph>
            
            <button
              onClick={() => setActiveModal("step4")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1a1f2e] md:self-start hover:opacity-60 transition-opacity"
            >
              Construction Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* ROW 5: Delivery */}
        <div className="timeline-row grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-y-6 gap-x-0 md:gap-x-12">
          <div className="hidden md:block order-1"></div>
          <div className="flex flex-col items-center order-1 md:order-2 relative h-full">
            <div className="relative w-[3px] h-28">
              <div className="absolute inset-0 bg-gray-100 w-full h-full"></div>
              <div className="line-fill-top absolute top-0 left-0 w-full bg-hover h-0"></div>
            </div>
            <div className="connector-dot relative z-20 w-5 h-5 rounded-full border-[2px] border-gray-200 bg-white flex items-center justify-center transition-colors duration-300 my-[-3px]">
              <div className="w-1 h-1 bg-white rounded-full"></div>
            </div>

            <div
              onClick={() => setActiveModal("step5")}
              className="fade-content relative z-10 p-1.5 bg-white rounded-[1.5rem] shadow-[0_15px_30px_-6px_rgba(26,31,46,0.15)] border border-gray-100 mt-3 cursor-pointer group transition-transform hover:scale-105 duration-300"
            >
              <div className="w-[120px] h-[120px] rounded-[1rem] overflow-hidden">
                <ImageWithSkeleton
                  click={true}
                  src={STEP_DATA.step5.image}
                  alt="Delivery"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="w-[3px] h-32 bg-gradient-to-b from-[#1a1f2e] to-transparent mt-4 opacity-20"></div>
          </div>

          <div className="fade-content flex flex-col justify-center md:text-left order-2 md:order-3 py-8">
            <Heading3 text={" Delivery & Beyond"} className="mb-2"/>
            
            <RichParagraph className="mb-2">{"Master your van with a walkthrough and test drive, backed by comprehensive warranties and 24/7 support."}</RichParagraph>
            
            <button
              onClick={() => setActiveModal("step5")}
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#1a1f2e] md:self-start hover:opacity-60 transition-opacity"
            >
              Warranty Info <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* --- Pre-Build Vans Section (With Click Functionality) --- */}
      <div className="pre-build-section pt-6 pb-8 px-4 sm:px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col items-center border-t border-gray-100 pt-6">
          <Heading4 text={" Ready for Adventure"} className="text-hover! mb-2 !text-base"/>
          
          <Heading2 text={"  Our Pre-Build Vans"} className="mb-2"/>
          
          <div className="w-10 md:w-16 h-1 bg-gradient-to-r from-hover to-[#f4a261] mx-auto mb-4 md:mt-4 rounded-full"></div>
          <RichParagraph className="mb-8">{"Click the van below to request a spec sheet and reserve your adventure vehicle today."}</RichParagraph>
          

          <div
            onClick={() => setShowInquiry(true)}
            className="pre-build-anim w-full max-w-4xl relative group cursor-pointer"
          >
            <div className="absolute -inset-1 bg-[#1a1f2e] rounded-[1.5rem] blur-lg opacity-5 group-hover:opacity-10 transition-opacity duration-1000"></div>

            <div className="relative overflow-hidden rounded-[1rem] border border-gray-100 shadow-xl bg-white">
              <ImageWithSkeleton
                click={true}
                src="/sprinter/image 12.png"
                alt="Pre-built Vans"
                className="w-full max-h-[400px] object-cover transform group-hover:scale-[1.01] transition-transform duration-[1.2s] ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
