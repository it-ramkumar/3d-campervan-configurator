"use client";
import React from "react";
import { motion } from "framer-motion";
import { Plane, Hammer, Tent, Sparkles, MapPin, ChevronRight, Truck } from "lucide-react";
import AirService from "../../AirService/AirService";
import { Heading2, RichParagraph, Heading3, Heading4,CustomLink } from '../../Common/Common';

// --- STAGGER ANIMATIONS ---
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeInUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "circOut" } },
};

// --- REUSABLE COMPONENTS ---
const InfoCard = ({ title, description, icon: Icon }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{ y: -8 }}
    className="bg-white p-8 rounded-lg border border-primary/5 shadow-sm flex flex-col items-center text-center h-full"
  >
    <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center mb-6 text-primary">
      <Icon size={28} strokeWidth={1.5} />
    </div>
    <Heading3 text={title} className=" mb-3" />
    <RichParagraph >
      {description}
    </RichParagraph>
  </motion.div>
);

const ProcessStep = ({ time, title, details, isLast = false }) => (
  <div className="grid grid-cols-[80px_auto_1fr] md:grid-cols-[120px_auto_1fr] gap-x-6 md:gap-x-12 relative group">
    {/* Left: Time Label */}
    <div className="pt-2 text-right">
      <RichParagraph className="uppercase !text-hover !text-sm tracking-wider font-bold group-hover:text-primary transition-colors">
        {time}
      </RichParagraph>
    </div>

    {/* Center: Engineering Line/Node */}
    <div className="flex flex-col items-center">
      <motion.div
        whileInView={{ scale: [0, 1.2, 1] }}
        className="w-4 h-4 rounded-lg border-4 border-primary bg-secondary z-10"
      />
      {!isLast && (
        <div className="w-[2px] h-full bg-gradient-to-b from-primary to-transparent opacity-20" />
      )}
    </div>

    {/* Right: Content Card */}
    <div className={`${!isLast ? "pb-20" : "pb-10"} pt-1`}>
      <Heading3 text={title} className=" mb-8" />
      <div className="grid md:grid-cols-2 gap-8">
        {details.map((item, index) => (
          <div key={index} className="space-y-3 bg-white/50 p-6 rounded-lg border border-transparent hover:border-primary/10 hover:bg-white transition-all">
            <Heading4 text={item.subtitle}  />
            <RichParagraph className=" italic">
              {item.description}
            </RichParagraph>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FlyInStep = ({ icon: Icon, text, isLast = false }) => (
  <div className="flex items-center gap-6 group">
    <div className="relative flex flex-col items-center shrink-0">
      {/* Icon Container */}
      <div className="w-12 h-12 bg-secondary text-primary rounded-lg flex items-center justify-center group-hover:bg-hover group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-lg">
        <Icon size={20} />
      </div>

      {/* Vertical Connector Line */}
      {!isLast && (
        <div className="absolute top-12 w-[2px] h-12 bg-secondary/20" />
      )}
    </div>

    {/* Text Content - Changed to text-secondary for visibility on dark bg */}
    <div className="flex-1">
      <RichParagraph className="text-secondary ">
        {text}
      </RichParagraph>
    </div>
  </div>
);
export default function ProcessPage() {
  const processData = [
    {
      time: "Immediate",
      title: "Vehicle Sourcing",
      details: [
        { subtitle: "Bring Your Van", description: (<span>Already own a Sprinter? We'll inspect it and plan your build. <CustomLink href="/van-layouts" text={"View Previous Work."}/>
       </span>) },
        { subtitle: "We Sourced For You", description: "Access brand-new vans directly from Mercedes dealers with our preferential pricing in LA/San Diego." },
      ],
    },
    {
      time: "1 Month",
      title: "Collaborative Design",
      details: [
        { subtitle: "Zoom Consults", description: "Deep dive into your adventure needs and storage priorities with your PM." },
        { subtitle: "3D Visuals", description: "Photorealistic renderings of layouts and materials—unlimited tweaks until perfect." },
      ],
    },
    {
      time: "2 Months",
      title: "Precision Engineering",
      details: [
        { subtitle: "Technical Optimization", description: "Finalizing electrical loads, weight distribution, and blueprints for safety." },
        { subtitle: "Material Selection", description: "Approving final fabric swatches, countertop finishes, and hardware." },
      ],
    },
    {
      time: "3-4 Months",
      title: "Build & Assembly",
      details: [
        { subtitle: "Craftsmanship", description: "Cabinetry, systems, and insulation. Weekly photo/video updates provided." },
        { subtitle: "BBV Extras", description: "Full quality checks plus a welcome kit (pillows, pots, and even a cake)." },
      ],
    },
    {
      time: "Pickup",
      title: "Delivery & Beyond",
      details: [
        { subtitle: "Handover", description: "Comprehensive walkthrough and test drive to master every feature." },
        { subtitle: "Lifetime Care", description: "1-Year Warranty (extended options available) and California workshop access." },
      ],
      isLast: true,
    },
  ];

  return (
    <section className="bg-secondary pt-24 pb-16 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">

        {/* --- Top Info Grid --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <InfoCard icon={Truck} title="Sourcing Advantage" description="Save up to $10,000 off MSRP through our premium dealership partners." />
          <InfoCard icon={Sparkles} title="5-Month Timeline" description="Transparent, staged process from the first sketch to the first campout." />
          <InfoCard icon={MapPin} title="3D Visualization" description="Every inch planned in lifelike detail before a single bolt is turned." />
        </motion.div>

        {/* --- Main Process Timeline --- */}
        <div className="max-w-5xl mx-auto mb-32">
          <div className="text-center mb-20">
             <Heading2 text="Custom Build Process" className="text-primary" />
             <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-lg" />
          </div>

          <div className="space-y-4">
            {processData.map((step, index) => (
              <ProcessStep key={index} {...step} />
            ))}
          </div>
        </div>

        <motion.div
          className="bg-primary rounded-lg p-8 md:p-16 text-secondary relative overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Decorative Background Icon */}
          <Tent className="absolute -bottom-10 -right-10 w-80 h-80 opacity-5 -rotate-12" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <Heading2 text="Fly in, Drive out" className="text-secondary" />
              <div className="space-y-12">
                <FlyInStep icon={Hammer} text="We precision-build your custom van." />
                <FlyInStep icon={Plane} text="You fly in for the official handover." />
                <FlyInStep icon={Tent} text="First 2 nights at Big Bear Campground on us." isLast />
              </div>
            </div>

            <div className="space-y-8">
              <RichParagraph  className=" text-secondary">
                Logistics shouldn't be your headache. We handle the complexity so you can focus on the destination.

              </RichParagraph>

              {/* Pro Tip Box */}
              <div className="bg-secondary/10 backdrop-blur-md border border-white/20 rounded-lg p-8 space-y-4">
                <div className="flex items-center gap-3 !text-hover">
                  <Sparkles size={20} />
                  <RichParagraph className="text-secondary uppercase !text-xs font-bold">Pro Tip</RichParagraph>
                </div>
                <RichParagraph white={true} className="italic text-secondary">
                  "Ship your personal gear (bikes, bedding, recovery kits) directly to our shop. We'll have everything loaded and ready for your maiden voyage."
                </RichParagraph>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-32">
           <AirService />
        </div>
      </div>
    </section>
  );
}