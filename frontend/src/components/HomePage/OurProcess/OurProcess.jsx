"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Truck,
  PencilRuler,
  Cpu,
  Hammer,
  KeyRound,
  CheckCircle2,
  Calendar
} from "lucide-react";
import { Heading2,Heading4, RichParagraph, Heading3, ImageWithSkeleton, SecondaryButton,CustomLink } from '../../Common/Common'

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    time: "Immediate",
    icon: <Truck size={24} />,
    title: "Start Your Journey: Vehicle Sourcing",
    imageSrc: "/images2/op4.webp",
    altText: "Vans parked in a row",
    details: [
      { subtitle: "Bring Your Van", description: "Already own a Sprinter? We’ll inspect it and plan your build." },
      { subtitle: "We’ll Source It For You", description: "Access a brand-new van directly from a Mercedes dealer at a great price. We secure preferential pricing in LA/San Diego and handle all paperwork." },
    ],
  },
  {
    time: "1 Month",
    icon: <PencilRuler size={24} />,
    title: "Collaborative Design Phase",
    imageSrc: "/images2/Client.webp",
    altText: "Designers collaborating on a 3D model",
    details: [
      { subtitle: "Zoom Consultations", description: "Meet your Project Manager to discuss adventure trips, family size, and storage priorities." },
      { subtitle: "3D Renderings & Refine", description: "Our designers create photorealistic visuals. Tweaks are unlimited until you’re 100% satisfied." },
    ],
  },
  {
    time: "2 Months",
    icon: <Cpu size={24} />,
    title: "Engineering & Precision Planning",
    imageSrc: "/images2/op3.webp",
    altText: "3D rendering of a van interior",
    details: [
      { subtitle: "Systems Optimization", description: "Engineers ensure electrical, storage, and weight distribution are optimized for safety and functionality." },
      { subtitle: "Client Involvement", description: "Approve final blueprints and material samples like countertop finishes and fabric swatches." },
    ],
  },
  {
    time: "3-4 Months",
    icon: <Hammer size={24} />,
    title: "Build & Assembly",
    imageSrc: "/images2/op5.webp",
    altText: "A camper van being built in a workshop",
    details: [
      { subtitle: "Interior & Exterior Build", description: "Cabinetry, electrical, plumbing, and roof racks or solar panels are installed by experts." },
      { subtitle: "Quality Checks", description: "Weekly photo/video updates are sent to you so you can watch your van come to life." },
    ],
  },
  {
    time: "Pickup",
    icon: <KeyRound size={24} />,
    title: "Delivery & Beyond",
    imageSrc: "/heroSlider/bloghero.webp",
    altText: "A converted camper van in a scenic location",
    details: [
      { subtitle: "Walkthrough & Test Drive", description: "Learn every feature with our team to ensure you're ready for the road." },
      { subtitle: "Lifetime Support", description: "1-Year Warranty (3 years extended) and lifetime access to our California workshops." },
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
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-secondary py-20 overflow-hidden antialiased font-sans">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <RichParagraph className="!!text-hover font-bold !text-sm tracking-wider uppercase mb-4 block">Our Methodology</RichParagraph>
          <Heading2 text={"Big Bear Vans Custom Build Process"} />
          <div className="w-20 h-1.5 bg-hover mx-auto rounded-lg my-8"></div>
          <RichParagraph>
            Our transparent, collaborative process ensures your vision comes to life, from initial ideas to keys in your hand.
          </RichParagraph>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-primary/10 -translate-x-1/2"></div>

          <div className="space-y-32">
            {processSteps.map((step, index) => (
              <div key={index} className={`process-card flex flex-col lg:flex-row items-center md:gap-[var(--gap-lg)] gap-0 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>

                {/* Image Side */}
                <div className="w-full lg:w-[45%]">
                  <div className="relative group aspect-[8/5]  overflow-hidden rounded-lg shadow-xl border-4 border-white transition-transform duration-700 hover:scale-[1.02]">
                    <ImageWithSkeleton
                      src={step.imageSrc}
                      alt={step.altText}
                      className="object-center"
                    />
                    {/* Time Badge */}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-lg flex items-center gap-[var(--gap-sm)] border border-primary/5">
                      <Calendar size={14} className="!!text-hover" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">{step.time}</span>
                    </div>
                  </div>
                </div>

                {/* Center Icon */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-14 h-14 rounded-lg bg-white shadow-xl border-2 border-hover items-center justify-center z-10 transition-colors group-hover:bg-hover">
                  <div className="!!text-hover">{step.icon}</div>
                </div>

                {/* Content Side */}
                <div className={`w-full lg:w-[45%] ${index % 2 !== 0 ? 'lg:pr-20' : 'lg:pl-20'}`}>
                  <div className="inline-flex items-center gap-[var(--gap-sm)] mb-4">
                    <CheckCircle2 size={16} className="!text-hover" />
                    <RichParagraph className="font-bold uppercase !text-xs !text-hover">Step 0{index + 1}</RichParagraph>
                  </div>
                  <Heading3 text={step.title} className="mb-8" />

                  <div className="space-y-8">
                    {step.details.map((detail, dIdx) => (
                      <div key={dIdx} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-hover before:rounded-full">
                        <Heading4 text={detail.subtitle} className="mb-2"/>
                        <RichParagraph>{detail.description}</RichParagraph>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Global CTA */}
        <div className="mt-32 text-center bg-white p-12 md:p-20 rounded-lg shadow-sm border border-primary/5">
           <Heading3 text="Ready to start your build?" className="mb-8 text-primary" />
           <SecondaryButton label={"Get a Custom Quote"} link="/contact" />
        </div>

      </div>
    </section>
  );
}