"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { CheckCircle2, Calendar, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import {
  Heading1,
  RichParagraph,
  ImageWithSkeleton,
  SecondaryButton,
} from "../../Common/Common";
import { scrollToConsultation } from "@/utils/scrollToConsultation";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    time: "Immediate",
    short: "Sourcing",
    title: "Start Your Journey: Vehicle Sourcing",
    imageSrc: "/Home/home-showroom-big-bear-vans.webp",
    altText: "Vans parked in a row",
    details: [
      {
        subtitle: "Bring Your Van",
        description:
          "Already own a Sprinter? We'll inspect it and plan your build.",
      },
      {
        subtitle: "We'll Source It For You",
        description:
          "Access a brand-new van directly from a Mercedes dealer at a great price. We secure preferential pricing in LA/San Diego and handle all paperwork.",
      },
    ],
  },
  {
    time: "1 Month",
    short: "Design",
    title: "Collaborative Design Phase",
    imageSrc: "/Home/home-google-meet-big-bear-vans.webp",
    altText: "Designers collaborating on a 3D model",
    details: [
      {
        subtitle: "Zoom Consultations",
        description:
          "Meet your Project Manager to discuss adventure trips, family size, and storage priorities.",
      },
      {
        subtitle: "3D Renderings & Refine",
        description:
          "Our designers create photorealistic visuals. Tweaks are unlimited until you're 100% satisfied.",
      },
    ],
  },
  {
    time: "2 Months",
    short: "Engineering",
    title: "Engineering & Precision Planning",
    imageSrc: "/Home/home-engineering-team-big-bear-vans.webp",
    altText: "3D rendering of a van interior",
    details: [
      {
        subtitle: "Systems Optimization",
        description:
          "Engineers ensure electrical, storage, and weight distribution are optimized for safety and functionality.",
      },
      {
        subtitle: "Client Involvement",
        description:
          "Approve final blueprints and material samples like countertop finishes and fabric swatches.",
      },
    ],
  },
  {
    time: "3-4 Months",
    short: "Build",
    title: "Build & Assembly",
    imageSrc: "/Home/home-build-and-assamble-big-bear-vans.webp",
    altText: "A camper van being built in a workshop",
    details: [
      {
        subtitle: "Interior & Exterior Build",
        description:
          "Cabinetry, electrical, plumbing, and roof racks or solar panels are installed by experts.",
      },
      {
        subtitle: "Quality Checks",
        description:
          "Weekly photo/video updates are sent to you so you can watch your van come to life.",
      },
    ],
  },
  {
    time: "Pickup",
    short: "Delivery",
    title: "Delivery & Beyond",
    imageSrc: "/Home/home-campervan-delivery-big-bear-van.webp",
    altText: "A converted camper van in a scenic location",
    details: [
      {
        subtitle: "Walkthrough & Test Drive",
        description:
          "Learn every feature with our team to ensure you're ready for the road.",
      },
      {
        subtitle: "Lifetime Support",
        description:
          "1-Year Warranty (3 years extended) and lifetime access to our California workshops.",
      },
    ],
  },
];

export default function OurProcess() {
  const containerRef = useRef(null);
  const panelRef = useRef(null);
  const tabRefs = useRef([]);
  const touchStartX = useRef(null);
  const [active, setActive] = useState(0);

  const lastIndex = processSteps.length - 1;
  const goTo = (index) => setActive(Math.max(0, Math.min(lastIndex, index)));

  // One-time entrance animation for the whole stepper
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-stepper", {
        opacity: 0,
        y: 50,
        duration: 1,
        scrollTrigger: {
          trigger: ".process-stepper",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, containerRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  // Fade the new panel in and keep the active chip visible in the mobile step bar
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      );
    }
    const tab = tabRefs.current[active];
    const bar = tab?.parentElement;
    if (tab && bar && bar.scrollWidth > bar.clientWidth) {
      bar.scrollTo({
        left: tab.offsetLeft - (bar.clientWidth - tab.clientWidth) / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  const onTabKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? Math.min(lastIndex, active + 1) : Math.max(0, active - 1);
    goTo(next);
    tabRefs.current[next]?.focus();
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) goTo(active + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const progress = (active / lastIndex) * 100;

  return (
    <section
      ref={containerRef}
      className="relative bg-secondary py-20  overflow-hidden"
    >
      <div className="mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <RichParagraph
            variant="sub"
            textColor="!text-hover"
            className="uppercase font-bold"
          >
            Our Methodology
          </RichParagraph>

          <Heading1 as="h2" variant="section" textColor="text-primary">
            Big Bear Vans Custom Build Process
          </Heading1>

          <RichParagraph variant="body" className="mt-6">
            Our transparent, collaborative process ensures your vision comes to life, from initial ideas to keys in your hand.
          </RichParagraph>
        </div>

        <div className="process-stepper">
          {/* Step bar */}
          <div className="relative mb-8 md:mb-12">
            {/* Progress line (desktop): track + amber fill up to the active step */}
            <div className="hidden md:block absolute left-[10%] right-[10%] top-5 h-px bg-primary/10" />
            <div
              className="hidden md:block absolute left-[10%] top-5 h-[2px] -translate-y-[0.5px] bg-hover transition-all duration-500"
              style={{ width: `${progress * 0.8}%` }}
            />

            <div
              role="tablist"
              aria-label="Build process steps"
              onKeyDown={onTabKeyDown}
              className="relative flex md:grid md:grid-cols-5 gap-2 md:gap-0 overflow-x-auto md:overflow-visible no-scrollbar -mx-4 px-4 md:mx-0 md:px-0"
            >
              {processSteps.map((step, index) => {
                const isActive = index === active;
                const isDone = index < active;

                return (
                  <button
                    key={step.short}
                    ref={(el) => (tabRefs.current[index] = el)}
                    type="button"
                    role="tab"
                    id={`process-tab-${index}`}
                    aria-selected={isActive}
                    aria-controls={`process-panel-${index}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => goTo(index)}
                    className={`group shrink-0 flex md:flex-col items-center gap-2 md:gap-3 rounded-full md:rounded-none px-4 py-2 md:p-0 border md:border-0 transition-colors duration-300 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-hover/60 md:focus-visible:ring-0 ${
                      isActive
                        ? "bg-primary border-primary md:bg-transparent"
                        : "bg-white border-primary/10 md:bg-transparent"
                    }`}
                  >
                    {/* Node */}
                    <span
                      className={`flex items-center justify-center rounded-full font-bold transition-all duration-300 w-6 h-6 text-[11px] md:w-10 md:h-10 md:text-sm md:border-2 md:group-focus-visible:ring-2 md:group-focus-visible:ring-hover/60 ${
                        isActive
                          ? "bg-hover text-white md:border-hover md:scale-110 md:shadow-lg"
                          : isDone
                          ? "bg-primary text-secondary md:border-primary"
                          : "bg-primary/10 text-primary md:bg-secondary md:border-primary/20 md:group-hover:border-hover"
                      }`}
                    >
                      {isDone ? <CheckCircle2 size={14} /> : index + 1}
                    </span>

                    <span className="flex flex-col items-start md:items-center">
                      <span
                        className={`hidden md:block text-[11px] uppercase tracking-[0.2em] font-semibold ${
                          isActive ? "text-hover" : "text-primary/50"
                        }`}
                      >
                        {step.time}
                      </span>
                      <span
                        className={`text-sm font-semibold whitespace-nowrap ${
                          isActive ? "text-secondary md:text-primary" : "text-primary/70 group-hover:text-primary"
                        }`}
                      >
                        {step.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panels: every step stays in the HTML for SEO; only the active one is shown */}
          <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            {processSteps.map((step, index) => {
              const isActive = index === active;

              return (
                <div
                  key={step.short}
                  ref={isActive ? panelRef : null}
                  role="tabpanel"
                  id={`process-panel-${index}`}
                  aria-labelledby={`process-tab-${index}`}
                  className={`${
                    isActive ? "grid" : "hidden"
                  } grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14 bg-white rounded-2xl border border-primary/10 shadow-xl p-4 md:p-6 lg:p-8`}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl">
                    <ImageWithSkeleton
                      src={step.imageSrc}
                      alt={step.altText}
                      wrapperClassName="h-full"
                      className="h-full"
                      sizes="(min-width: 1024px) 600px, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020C18]/60 via-transparent to-transparent pointer-events-none" />

                    {/* Time Badge */}
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2 bg-[#020C18]/85 backdrop-blur-md border border-hover/30">
                      <Calendar size={14} className="text-hover" />
                      <RichParagraph
                        variant="sub"
                        className="font-bold text-secondary"
                      >
                        {step.time}
                      </RichParagraph>
                    </div>
                    <div className="bbv-amber-line" />
                  </div>

                  {/* Content */}
                  <div className="w-full flex flex-col">
                    <RichParagraph
                      variant="sub"
                      className="font-bold !text-hover uppercase mb-3"
                    >
                      Step {index + 1} of {processSteps.length} · {step.time}
                    </RichParagraph>

                    <Heading1 as="h3" variant="card" textColor="!text-primary" className="mb-6">
                      {step.title}
                    </Heading1>

                    <div className="space-y-6 md:max-w-lg">
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-hover before:rounded-full"
                        >
                          <Heading1
                            as="h4"
                            variant="sub"
                            textColor="!text-primary"
                            className="mb-1"
                          >
                            {detail.subtitle}
                          </Heading1>
                          <RichParagraph variant="card">
                            {detail.description}
                          </RichParagraph>
                        </div>
                      ))}
                    </div>

                    {/* Prev / Next */}
                    <div className="flex items-center gap-3 mt-8">
                      <button
                        type="button"
                        onClick={() => goTo(index - 1)}
                        disabled={index === 0}
                        aria-label="Previous step"
                        className="w-11 h-11 flex items-center justify-center rounded-full border border-primary/20 text-primary transition-colors hover:border-hover hover:text-hover disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      {index < lastIndex ? (
                        <button
                          type="button"
                          onClick={() => goTo(index + 1)}
                          className="h-11 px-5 flex items-center gap-2 rounded-full bg-primary text-secondary text-sm font-semibold transition-colors hover:bg-hover cursor-pointer"
                        >
                          Next: {processSteps[index + 1].short}
                          <ChevronRight size={18} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => goTo(0)}
                          className="h-11 px-5 flex items-center gap-2 rounded-full border border-primary/20 text-primary text-sm font-semibold transition-colors hover:border-hover hover:text-hover cursor-pointer"
                        >
                          <RotateCcw size={16} />
                          Start over
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/our-process"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:text-hover hover:underline"
            >
              See the full build process
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        {/* Global CTA Banner */}
        <div className="relative mt-28 min-h-[60vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('/Home/home-ctrb-big-bear-vans.webp')`,
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#020C18]/90 via-[#020C18]/80 to-[#020C18]/90 backdrop-blur-[1px]" />

          <div className="relative z-10 text-center p-8 md:p-14 max-w-2xl mx-auto flex flex-col items-center justify-center">
            <RichParagraph
              variant="sub"
              textColor="!text-hover"
              className="uppercase font-bold"
            >
              Take The Next Step
            </RichParagraph>

            <Heading1
              variant="section"
              className="mb-6 text-secondary"
            >
              Ready to start your build?
            </Heading1>
            <SecondaryButton label="Get a Custom Quote" link="/contact" onClick={scrollToConsultation} />
          </div>
        </div>
      </div>
    </section>
  );
}