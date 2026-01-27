"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { Heading2, RichParagraph,Heading3,ImageWithSkeleton, WhiteButton } from '../../Common/Common'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Data for the process steps
const processSteps = [
  {
    time: "Immediate",
    title: "Start Your Journey: Vehicle Sourcing",
    imageSrc: "/images/process1.webp",
    altText: "Vans parked in a row",
    details: [
      {
        subtitle: "Bring Your Van",
        description:
          "Already own a Sprinter? We’ll inspect it and plan your build.",
      },
      {
        subtitle: "We’ll Source It For You",
        description:
          "Access a brand-new van directly from a Mercedes dealer at a great price. We leverage our purchasing power in the LA/San Diego market to secure preferential pricing, handling all negotiations, paperwork, and delivery to our facility.",
      },
    ],
  },
  {
    time: "1 Month",
    title: "Collaborative Design Phase",
    imageSrc: "/images/process3.webp",
    altText: "Designers collaborating on a 3D model",
    details: [
      {
        subtitle: "Zoom Consultations",
        description:
          "Meet your Project Manager to discuss needs (adventure trips, family size, storage priorities).",
      },
      {
        subtitle: "3D Renderings",
        description:
          "Our designers create photorealistic visuals of your van’s layout, color schemes, and materials.",
      },
      {
        subtitle: "Refine & Approve",
        description: "Tweaks are unlimited until you’re 100% satisfied.",
      },
    ],
  },
  {
    time: "2 Months",
    title: "Engineering & Precision Planning",
    imageSrc: "/images/process4.webp",
    altText: "3D rendering of a van interior",
    details: [
      {
        subtitle: "What Happens",
        description:
          "Our engineers ensure every detail (electrical systems, storage dimensions, weight distribution) is optimized for safety and functionality.",
      },
      {
        subtitle: "Client Involvement",
        description:
          "Approve final blueprints and material samples (e.g., countertop finishes, fabric swatches).",
      },
    ],
  },
  {
    time: "3-4 Months",
    title: "Build & Assembly",
    imageSrc: "/images/process6.webp",
    altText: "A camper van being built in a workshop",
    details: [
      {
        subtitle: "Interior Build (2 Months)",
        description: "Cabinetry, electrical, plumbing, and insulation installed.",
      },
      {
        subtitle: "Exterior Upgrades (1 Month)",
        description:
          "Roof racks, solar panels, custom paint/wraps, or off-grid packages.",
      },
      {
        subtitle: "Quality Checks",
        description: "Weekly photo/video updates sent to you.",
      },
    ],
  },
  {
    time: "Pickup",
    title: "Delivery & Beyond",
    imageSrc: "/images/process5.webp",
    altText: "A converted camper van in a scenic location",
    details: [
      {
        subtitle: "Walkthrough & Test Drive",
        description: "Learn every feature with our team.",
      },
      {
        subtitle: "Lifetime Support",
        description: "1-Year Warranty (3 years extended) on craftsmanship.",
      },
      {
        subtitle: "Upgrades & Servicing",
        description:
          "Visit our California workshops for maintenance or new features.",
      },
    ],
  },
];

export default function OurProcess() {


  const headerRef = useRef(null);
  const stepsRef = useRef([]);
  const buttonRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineFillRef = useRef(null);

  useEffect(() => {
    stepsRef.current = [];
  }, []);

  const addStepRef = (el) => {
    if (el && !stepsRef.current.includes(el)) {
      stepsRef.current.push(el);
    }
  };

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    // Timeline fill animation on scroll
    gsap.fromTo(
      timelineFillRef.current,
      { height: 0 },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // Enhanced scroll animation for each step
    stepsRef.current.forEach((step, index) => {
      const isEven = index % 2 === 0;
      const textContent = step.querySelector(".text-content");
      const imageContent = step.querySelector(".image-content");
      const timelineCircle = step.querySelector(".timeline-circle");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      if (timelineCircle) {
        tl.fromTo(
          timelineCircle,
          { scale: 0 },
          { scale: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
      }
      if (textContent) {
        tl.fromTo(
          textContent,
          { opacity: 0, x: isEven ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.3"
        );
      }
      if (imageContent) {
        tl.fromTo(
          imageContent,
          { opacity: 0, x: isEven ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
          "<"
        );
      }
    });

    // Button animation
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      }
    );
  }, []);

  return (
    <div className="bg-black/75 text-white  py-10 md:py-24 px-4 md:px-8 font-serif overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20" ref={headerRef}>
          <Heading2 text={"Big Bear Vans Custom Build Process"} className="text-white" />

          <RichParagraph white={true} className="max-w-2xl mx-auto"> Our transparent, collaborative process ensures your vision comes to
            life, from initial ideas to keys in your hand. Here's how it works.</RichParagraph>
        </div>

        {/* Process Steps Container with Timeline Line */}
        <div
          ref={timelineRef}
          className="group relative space-y-24
                     before:hidden before:lg:block before:absolute before:left-1/2 before:top-0
                     before:h-full before:w-0.5 before:bg-[#4a4a4a] before:-translate-x-1/2"
        >
          <div
            ref={timelineFillRef}
            className="hidden lg:block absolute left-1/2 top-0 h-full w-0.5 bg-white
                       -translate-x-1/2 transition-shadow duration-300 group-hover:shadow-glow"
          ></div>

          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;

            const textContent = (
              <div
                className="text-content relative lg:static border-l-4 border-[#4a4a4a] lg:border-none pl-8 lg:pl-0
                           transition-all duration-300 ease-in-out lg:hover:scale-105 lg:hover:shadow-glow"
              >
                <div
                  className="absolute lg:hidden -left-[10px] top-2 w-5 h-5 bg-white rounded-full
                             ring-2 ring-offset-2 ring-offset-black/75 ring-gray-500"
                ></div>
                <div className="flex flex-col justify-center">
                  <RichParagraph className="mt-4" white={true}>
                    {step.time}
                  </RichParagraph>
                  <Heading3 text={step.title} className="text-white" />


                  <div className="space-y-4">
                    {step.details.map((item, idx) => (
                      <div key={idx}>
                        <Heading3 text={item.subtitle} className="text-white" />
                        <RichParagraph white={true}>
                          {item.description}
                        </RichParagraph>

                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );

            const imageContent = (
              <div
                className="image-content w-full relative overflow-hidden rounded-lg shadow-2xl
                           transition-all duration-300 ease-in-out lg:hover:scale-105 lg:hover:shadow-glow"
              >
                <ImageWithSkeleton
                  src={step.imageSrc}
                  alt={step.altText}
                  className=" object-cover"
                />
              </div>
            );

            const timelineCircle = (
              <div className="timeline-circle hidden lg:flex items-center justify-center">
                <div
                  className="w-5 h-5 bg-white rounded-full z-10
                             ring-2 ring-offset-2 ring-offset-black/75 ring-gray-500
                             transition-all duration-300 ease-in-out hover:ring-white hover:shadow-glow"
                ></div>
              </div>
            );

            return (
              <div
                key={index}
                ref={addStepRef}
                className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-16 items-center"
              >
                {isEven ? (
                  <>
                    <div className="mb-8 lg:mb-0">{textContent}</div>
                    {timelineCircle}
                    <div>{imageContent}</div>
                  </>
                ) : (
                  <>
                    <div className="mb-8 lg:mb-0 lg:col-start-3">{textContent}</div>
                    <div className="lg:col-start-2 lg:row-start-1">{timelineCircle}</div>
                    <div className="lg:col-start-1 lg:row-start-1">{imageContent}</div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* Call to action button */}
        <div className="mt-20 text-center" ref={buttonRef}>
          <WhiteButton label={"Get a Quote"} link="/contact" />


        </div>
      </div>
    </div>
  );
}