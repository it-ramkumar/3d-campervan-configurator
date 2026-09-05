"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  CheckCircle2,
  Calendar,
} from "lucide-react";
import {
  Heading2,
  Heading3,
  Heading4,
  RichParagraph,
  ImageWithSkeleton,
  SecondaryButton,
} from "../../Common/Common";

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    time: "Immediate",
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".process-card").forEach((card) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#F8F8F6] py-20 antialiased font-sans overflow-hidden"
    >
      <div className="container relative z-10 mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
          <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3 flex justify-center">
            Our Methodology
          </p>
          <Heading2 text="Big Bear Vans Custom Build Process" />
          <div className="bbv-divider mb-6 mx-auto" />
          <RichParagraph className="!text-primary/70">
            Our transparent, collaborative process ensures your vision comes to life, from initial ideas to keys in your hand.
          </RichParagraph>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2 z-0" />

          <div className="space-y-20 lg:space-y-32">
            {processSteps.map((step, index) => {
              const isEven = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className="process-card relative grid grid-cols-1 lg:grid-cols-2 items-center gap-12 xl:gap-20"
                >
                  {/* Image Column (Equal 50% Width) */}
                  <div
                    className={`w-full ${
                      isEven ? "lg:order-last" : "lg:order-first"
                    }`}
                  >
                    <div className="relative group w-full aspect-square overflow-hidden rounded-xl shadow-xl border border-primary/10 transition-transform duration-500 hover:scale-[1.01]">
                      <ImageWithSkeleton
                        src={step.imageSrc}
                        alt={step.altText}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#020C18]/60 via-transparent to-transparent pointer-events-none" />

                      {/* Time Badge */}
                      <div
                        className="absolute top-4 left-4 px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-2"
                        style={{
                          background: "rgba(2, 12, 24, 0.85)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(237, 152, 95, 0.30)",
                        }}
                      >
                        <Calendar size={14} className="text-hover" />
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">
                          {step.time}
                        </span>
                      </div>
                      <div className="bbv-amber-line" />
                    </div>
                  </div>

                  {/* Content Column (Equal 50% Width) */}
                  <div
                    className={`w-full flex flex-col ${
                      isEven ? "lg:order-first" : "lg:order-last"
                    }`}
                  >
                    <div className="inline-flex items-center gap-2 mb-3">
                      <CheckCircle2 size={16} className="text-hover" />
                      <span className="font-bold uppercase text-xs text-hover tracking-widest">
                        Step 0{index + 1}
                      </span>
                    </div>

                    <Heading3 text={step.title} className="mb-6" />

                    <div className="space-y-6">
                      {step.details.map((detail, dIdx) => (
                        <div
                          key={dIdx}
                          className="relative pl-5 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-hover before:rounded-full"
                        >
                          <Heading4 text={detail.subtitle} className="mb-1" />
                          <RichParagraph className="!text-primary/70">
                            {detail.description}
                          </RichParagraph>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global CTA Banner with Background Image */}
        <div className="relative mt-28 min-h-[60vh] flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-primary/10">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{
              backgroundImage: `url('/Home/home-ctrb-big-bear-vans.webp')`,
            }}
          />

          {/* Dark Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#020C18]/90 via-[#020C18]/80 to-[#020C18]/90 backdrop-blur-[1px]" />

          {/* Content */}
          <div className="relative z-10 text-center p-8 md:p-14 max-w-2xl mx-auto flex flex-col items-center justify-center">
            <p className="text-hover text-xs uppercase tracking-widest font-bold mb-3">
              Take The Next Step
            </p>
            <Heading3
              text="Ready to start your build?"
              className="mb-6 text-secondary !text-3xl md:!text-4xl"
            />
            <SecondaryButton label="Get a Custom Quote" link="/contact" />
          </div>
        </div>
      </div>
    </section>
  );
}